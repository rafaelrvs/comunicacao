// app/actions/registerUser.ts
"use server";

import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import prisma from "../../../prisma/prisma";

type RegisterResult = {
  errors: string[];
  msg_success: string;
  success: boolean;
};

export async function registerUser(
  formData: FormData
): Promise<RegisterResult> {
  const email = formData.get("email")?.toString().trim();
  const senha = formData.get("senha")?.toString().trim();

  if (!email || !senha) {
    return {
      errors: ["Preencha todos os campos obrigatórios."],
      msg_success: "",
      success: false,
    };
  }
  try {
    const existing = await prisma.usuario.findFirst({
      where: { email },
    });
    if (existing) {
      return {
        errors: ["Este e-mail já está cadastrado."],
        msg_success: "",
        success: false,
      };
    }
    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(senha, saltRounds);
    await prisma.usuario.create({
      data: {
        uuid: uuidv4(),
        email,
        senha: senhaHash,
      },
    });
    return {
      errors: [],
      msg_success: "Usuário cadastrado com sucesso!",
      success: true,
    };
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    return {
      errors: ["Erro interno, tente novamente mais tarde."],
      msg_success: "",
      success: false,
    };
  }
}
