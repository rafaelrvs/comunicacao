"use server";

import bcrypt from "bcryptjs";                      // 1. importe o bcryptjs
import { gerarToken } from "@/lib/jwt";
import prisma from "../../../prisma/prisma";
import { Usuario } from "@prisma/client";
import { cookies } from "next/headers";


export async function loginUser(
  state:
    | { errors: string[]; msg_success: string; success: boolean }
    | undefined,
  formData: FormData
): Promise<{ errors: string[]; msg_success: string; success: boolean }> {
  const email = formData.get("email")?.toString();
  const senha = formData.get("senha")?.toString();

  if (!email || !senha) {
    return {
      errors: ["Preencha todos os campos obrigatórios."],
      msg_success: "",
      success: false,
    };
  }

  try {
    const usuario = await prisma.usuario.findFirst({
      where: { email },
    });

    if (!usuario) {
      return {
        errors: ["Email não cadastrado."],
        msg_success: "",
        success: false,
      };
    }
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return {
        errors: ["Senha incorreta."],
        msg_success: "",
        success: false,
      };
    }


    const token = gerarToken({ uuid: usuario.uuid, email: usuario.email });
    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7, 
    });

    return {
      errors: [],
      msg_success: "Login realizado com sucesso!",
      success: true,
    };
  } catch (error) {
    console.error("Erro ao validar login:", error);
    return {
      errors: ["Erro interno, tente novamente."],
      msg_success: "",
      success: false,
    };
  }
}
