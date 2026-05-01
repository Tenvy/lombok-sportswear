import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { Role } from "@/src/generated/prisma/enums";

/**
 * Helper to get the current server-side session
 */
export async function getServerAuthSession() {
  return await getServerSession(authOptions);
}

/**
 * Higher-Order Function (Wrapper) to protect API routes based on roles.
 * Use this to wrap your GET, POST, PATCH, DELETE handlers.
 */
export function withRole(allowedRoles: Role[], handler: (req: NextRequest, context: any, session: any) => Promise<NextResponse>) {
  return async (request: NextRequest, context: any) => {
    const session = await getServerAuthSession();

    // 1. Check if user is authenticated
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized: Please log in" }, { status: 401 });
    }

    const userRole = (session.user as any).role as Role;

    // 2. Check if user has one of the allowed roles
    if (!allowedRoles.includes(userRole)) {
      return NextResponse.json({ 
        error: `Forbidden: Role ${userRole} does not have access to this action` 
      }, { status: 403 });
    }

    // 3. Execute the original handler
    return handler(request, context, session);
  };
}

/**
 * Manual helper if you need to check authorization inside a function body.
 */
export async function authorize(allowedRoles?: Role[]) {
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    return {
      authorized: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  const userRole = (session.user as any).role as Role;

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return {
      authorized: false,
      response: NextResponse.json({ error: "Forbidden: Access denied" }, { status: 403 }),
    };
  }

  return { authorized: true, session };
}
