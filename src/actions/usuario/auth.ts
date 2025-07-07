"use server"
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import prisma from "../../../prisma/prisma";

type TokenType = {
  uuid: string;
  email: string;
  iat: number;
  exp: number;
};
export async function verificaAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return false;
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET não definida no env");
  }

  try {
    const payload = verify(token, secret) as TokenType;
    await prisma.usuario.findUnique({
      where: { uuid: payload.uuid },
      select: { uuid: true },
    });

    return true;
  } catch (err) {
    console.log(err);
    
    return false;
  }
}
