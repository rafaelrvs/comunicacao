"use server";
import { DeleteColaboradorResult } from "@/type/Colaborador/colaboradorType";
import prisma from "../../../prisma/prisma";



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

    return { error: false };
  } catch (e) {
    console.error("Erro ao deletar colaborador:", e);
    return { error: true, message: "Erro ao deletar colaborador." };
  }
}
