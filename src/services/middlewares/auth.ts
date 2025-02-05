import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

type TokenPayload = {
  id: string;
  iat: number;
  exp: number;
};

export function AuthMiddlwares(req: NextRequest) {
  const authorization = req.headers.get("authorization");
  if (!authorization) {
    return NextResponse.json({ error: "Token não informado" }, { status: 401 });
  }

  try {
    const token = authorization.split(" ")[1];
    const decoded = verify(token, process.env.HASH);
    const { id } = decoded as TokenPayload;

    req.headers.set("userId", id);

    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}
