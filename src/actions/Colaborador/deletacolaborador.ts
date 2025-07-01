"use server";
import { DeleteColaboradorResult } from "@/type/Colaborador/colaboradorType";
import prisma from "../../../prisma/prisma";
import { revalidateTag } from "next/cache";
import path from "path";
import { promises as fs } from "fs";


export default async function deleteColaborador(
  uuid: string
): Promise<DeleteColaboradorResult> {
  try {

    const colaborador = await prisma.colaborador.findUnique({
      where: { uuid },
    });
    if (!colaborador) {
      return { error: true, message: "Colaborador não encontrado." };
    }
    
    await prisma.colaborador.delete({
      where: { uuid },
    });
     const relativeImgPath = colaborador.urlImg.replace(/^\.?\//, "");
    const imagePath = path.join(process.cwd(), "public", relativeImgPath);
    try {
      await fs.unlink(imagePath);
    } catch (err) {
      console.warn(`⚠️ Não foi possível deletar a imagem em ${imagePath}:`, err);
    }

  revalidateTag("cadastroColab")
    return { error: false };
  } catch (e) {
    console.error("Erro ao deletar colaborador:", e);
    return { error: true, message: "Erro ao deletar colaborador." };
  }
}
