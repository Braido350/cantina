import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

type TokenPayload = {
  id: string;
  iat: number;
  exp: number;
};

export async function AuthMiddlwares(req: NextRequest) {
  const cookieStore = await cookies();
  const cookieToken = cookieStore.get("token")?.value;

  if (!cookieToken) {
    return NextResponse.json({ error: "Token não informado" }, { status: 401 });
  }

  try {
    const decoded = verify(cookieToken, process.env.HASH);
    const { id } = decoded as TokenPayload;
    req.headers.set("userId", id);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}
