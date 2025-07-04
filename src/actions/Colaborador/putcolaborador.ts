"use server";
import { PostColaboradorResult } from "@/type/Colaborador/colaboradorType";
import { Prisma } from "@prisma/client";
import prisma from "../../../prisma/prisma";
import path from "path";
import { promises as fs } from "fs";
import { revalidatePath } from "next/cache";

type PutColaboradorResult = PostColaboradorResult;

export default async function putColaborador(
  formData: FormData
): Promise<PutColaboradorResult> {



  
  try {
    const uuidRaw = formData.get("uuid")?.toString().trim();
    const nome = formData.get("nome")?.toString().trim();
    const dataNascimentoRaw = formData.get("dataNasc")?.toString().trim();
    const arquivo = formData.get("src") as File | null;

    if (!uuidRaw) {
      return {
        errors: ["UUID é obrigatório."],
        msg_success: "",
        success: false,
      };
    }
    if (!nome || !dataNascimentoRaw) {
      return {
        errors: ["Por favor, preencha todos os campos e anexe uma imagem."],
        msg_success: "",
        success: false,
      };
    }

    const dataNascimento = new Date(dataNascimentoRaw + "T12:00:00");
    if (Number.isNaN(dataNascimento.getTime())) {
      return {
        errors: ["Data de nascimento inválida."],
        msg_success: "",
        success: false,
      };
    }

    const colaboradorExistente = await prisma.colaborador.findUnique({
      where: { uuid: uuidRaw },
    });
    if (!colaboradorExistente) {
      return {
        errors: ["Colaborador não encontrado para o UUID informado."],
        msg_success: "",
        success: false,
      };
    }

    const relativeImgPath = colaboradorExistente.urlImg.replace(/^\.?\//, "");
    const imagePathAniga = path.join(process.cwd(), "public", relativeImgPath);
    try {
      await fs.unlink(imagePathAniga);
    } catch (err) {
      console.warn(
        `⚠️ Não foi possível deletar a imagem em ${imagePathAniga}:`,
        err
      );
    }

 let urlImg =""
    if (arquivo) {
       if (arquivo.name !=="undefined" && arquivo.size > 0) {
        
         
         const timestamp = Date.now();
      
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
         urlImg = `/image/${fileName}`;
        }
        
      }
      
    const updateData: Prisma.ColaboradorUpdateInput = {
      nome,
      dataNascimento,
      urlImg,
    };

    await prisma.colaborador.update({
      where: { uuid: uuidRaw },
      data: updateData,
    });

    revalidatePath("colaborador");
    return {
      errors: [],
      msg_success: "Alteração realizada com sucesso!",
      success: true,
    };
  } catch (err: unknown) {
    console.error("Erro ao alterar colaborador:", err);
    return {
      errors: ["Ocorreu um erro ao alterar. Tente novamente mais tarde."],
      msg_success: "",
      success: false,
    };
  }
}
