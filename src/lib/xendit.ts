import axios, { AxiosError } from "axios";

const XENDIT_BASE_URL = "https://api.xendit.co";

function getAuthHeader(): string {
  const key = process.env.XENDIT_SECRET_KEY;
  if (!key) throw new PaymentProviderError("Xendit secret key not configured");
  return "Basic " + Buffer.from(key + ":").toString("base64");
}

export class PaymentProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PaymentProviderError";
  }
}

export interface CreateVirtualAccountParams {
  external_id: string;
  bank_code: string;
  name: string;
  is_closed: boolean;
  expected_amount: number;
  is_single_use: boolean;
  expiration_date: string;
}

export interface CreateVirtualAccountResponse {
  id: string;
  external_id: string;
  owner_id: string;
  merchant_code: string;
  account_number: string;
  bank_code: string;
  name: string;
  is_closed: boolean;
  expected_amount: number;
  expiration_date: string;
  is_single_use: boolean;
  status: string;
}

export async function createVirtualAccount(
  params: CreateVirtualAccountParams
): Promise<CreateVirtualAccountResponse> {
  try {
    const res = await axios.post<CreateVirtualAccountResponse>(
      `${XENDIT_BASE_URL}/callback_virtual_accounts`,
      params,
      {
        headers: {
          Authorization: getAuthHeader(),
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );
    return res.data;
  } catch (err) {
    const axiosErr = err as AxiosError;
    console.error("Xendit VA error:", {
      status: axiosErr.response?.status,
      statusText: axiosErr.response?.statusText,
      data: axiosErr.response?.data,
      url: axiosErr.config?.url,
    });
    throw new PaymentProviderError(
      axiosErr.response?.statusText || "Failed to create virtual account"
    );
  }
}

export interface CreateQrisParams {
  external_id: string;
  type: "DYNAMIC";
  callback_url: string;
  amount: number;
}

export interface CreateQrisResponse {
  id: string;
  external_id: string;
  amount: number;
  status: string;
  qr_string: string;
  callback_url: string;
  type: string;
}

export async function createQris(
  params: CreateQrisParams
): Promise<CreateQrisResponse> {
  try {
    const res = await axios.post<CreateQrisResponse>(
      `${XENDIT_BASE_URL}/qr_codes`,
      params,
      {
        headers: {
          Authorization: getAuthHeader(),
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );
    return res.data;
  } catch (err) {
    const axiosErr = err as AxiosError;
    console.error("Xendit QRIS error:", {
      status: axiosErr.response?.status,
      statusText: axiosErr.response?.statusText,
      data: axiosErr.response?.data,
      url: axiosErr.config?.url,
    });
    throw new PaymentProviderError(
      axiosErr.response?.statusText || "Failed to create QRIS"
    );
  }
}

export async function simulateVirtualAccountPayment(
  externalId: string,
  amount: number
) {
  try {
    const res = await axios.post(
      `${XENDIT_BASE_URL}/callback_virtual_accounts/external_id=${externalId}/simulate_payment`,
      { amount },
      {
        headers: {
          Authorization: getAuthHeader(),
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );
    return res.data;
  } catch (err) {
    const axiosErr = err as AxiosError;
    console.error("Xendit VA simulate error:", {
      status: axiosErr.response?.status,
      statusText: axiosErr.response?.statusText,
      data: axiosErr.response?.data,
      url: axiosErr.config?.url,
    });
    throw new PaymentProviderError(
      axiosErr.response?.statusText || "Failed to simulate VA payment"
    );
  }
}

export async function simulateQrisPayment(externalId: string, amount: number) {
  try {
    const res = await axios.post(
      `${XENDIT_BASE_URL}/qr_codes/${externalId}/payments/simulate`,
      { amount },
      {
        headers: {
          Authorization: getAuthHeader(),
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );
    return res.data;
  } catch (err) {
    const axiosErr = err as AxiosError;
    console.error("Xendit QRIS simulate error:", {
      status: axiosErr.response?.status,
      statusText: axiosErr.response?.statusText,
      data: axiosErr.response?.data,
      url: axiosErr.config?.url,
    });
    throw new PaymentProviderError(
      axiosErr.response?.statusText || "Failed to simulate QRIS payment"
    );
  }
}
