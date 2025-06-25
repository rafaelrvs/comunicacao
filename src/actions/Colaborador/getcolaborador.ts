"use server"

import prisma from "../../../prisma/prisma";
export default async function getColaboradores() {
  try {
    const lista = await prisma.colaborador.findMany()
    return { error: false, colaboradores: lista }
  } catch (e) {
    return { error: true, colaboradores: [] }
  }
}
