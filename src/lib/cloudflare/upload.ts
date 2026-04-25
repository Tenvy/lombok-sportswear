import { PutObjectCommand, ListObjectsV2Command, DeleteObjectsCommand } from "@aws-sdk/client-s3"
import { r2 } from "./r2"

export interface UploadToR2Params {
  buffer: Buffer
  key: string
  contentType: string
}

export async function uploadToR2({ buffer, key, contentType }: UploadToR2Params): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  })

  await r2.send(command)

  return `${process.env.R2_PUBLIC_BASE_URL}/${key}`
}

export interface UploadTempToR2Params {
  buffer: Buffer
  fileName: string
  contentType: string
}

export async function uploadTempToR2({ buffer, fileName, contentType }: UploadTempToR2Params): Promise<string> {
  return uploadToR2({
    buffer,
    key: `temp/${fileName}`,
    contentType,
  })
}

export interface DeleteFromR2Params {
  key: string
}

export async function deleteFromR2({ key }: DeleteFromR2Params): Promise<void> {
  const { DeleteObjectCommand } = await import("@aws-sdk/client-s3")
  const command = new DeleteObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
  })

  await r2.send(command)
}

export interface R2Object {
  key: string
  lastModified: Date
  size: number
}

export interface ListR2ObjectsParams {
  prefix?: string
}

export async function listR2Objects({ prefix }: ListR2ObjectsParams = {}): Promise<R2Object[]> {
  const command = new ListObjectsV2Command({
    Bucket: process.env.R2_BUCKET_NAME,
    Prefix: prefix,
  })

  const response = await r2.send(command)

  return (response.Contents || []).map(obj => ({
    key: obj.Key!,
    lastModified: obj.LastModified!,
    size: obj.Size!,
  }))
}

export interface DeleteMultipleR2Params {
  keys: string[]
}

export async function deleteMultipleFromR2({ keys }: DeleteMultipleR2Params): Promise<void> {
  if (keys.length === 0) return

  const command = new DeleteObjectsCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Delete: {
      Objects: keys.map(key => ({ Key: key })),
      Quiet: false,
    },
  })

  await r2.send(command)
}

export function extractR2KeyFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url)
    const baseUrl = process.env.R2_PUBLIC_BASE_URL
    if (baseUrl && urlObj.origin === new URL(baseUrl).origin) {
      return urlObj.pathname.slice(1) // Remove leading slash
    }
    return null
  } catch {
    return null
  }
}
