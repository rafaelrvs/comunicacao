import jwt, { SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("A variável de ambiente JWT_SECRET não está definida");
}

export function gerarToken(payload: Record<string, unknown>): string {
  const options: SignOptions = { expiresIn: "7d" };
  return jwt.sign(payload, JWT_SECRET!, options);
}
