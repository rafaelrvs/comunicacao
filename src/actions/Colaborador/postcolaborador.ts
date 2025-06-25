"use server";

import { promises as fs } from "fs";
import path from "path";
import prisma from "../../../prisma/prisma";
import { Prisma } from "@prisma/client";
import { PostColaboradorResult } from "@/type/Colaborador/colaboradorType";



export default async function postColaborador(
  formData: FormData
): Promise<PostColaboradorResult> {
  try {
   
    const nome = formData.get("nome")?.toString().trim();
    const dataNascimentoRaw = formData.get("dataNasc")?.toString().trim();

    const arquivo = formData.get("src") as File | null;

    if (!nome || !dataNascimentoRaw || !arquivo || !(arquivo instanceof File)) {
      return {
        errors: ["Por favor, preencha todos os campos e anexe uma imagem."],
        msg_success: "",
        success: false,
      };
    }


    const dataNascimento = new Date(dataNascimentoRaw+"T12:00:00");
    if (Number.isNaN(dataNascimento.getTime())) {
      return {
        errors: ["Data de nascimento inválida."],
        msg_success: "",
        success: false,
      };
    }

    const timestamp = Date.now();
    const originalExt = path.extname(arquivo.name);                
    const safeName = arquivo.name
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9\-.]/g, "")
      .toLowerCase();                                              
    const fileName = `${timestamp}-${safeName}`;

 
    const imageDir = path.join(process.cwd(), "public", "image");
    const imagePath = path.join(imageDir, fileName);

    await fs.mkdir(imageDir, { recursive: true });

    const arrayBuffer = await arquivo.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(imagePath, buffer);
    const urlImg = `./image/${fileName}`;


    const colaboradorData: Prisma.ColaboradorCreateInput = {
      nome,
      dataNascimento,
      urlImg,
    };
    await prisma.colaborador.create({ data: colaboradorData });

    return {
      errors: [],
      msg_success: "Cadastro realizado com sucesso!",
      success: true,
    };
  } catch (err: unknown) {
    console.error("Erro ao cadastrar colaborador:", err);
    return {
      errors: ["Ocorreu um erro ao cadastrar. Tente novamente mais tarde."],
      msg_success: "",
      success: false,
    };
  }
}
