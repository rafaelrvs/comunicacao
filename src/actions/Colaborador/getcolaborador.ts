"use server"
import prisma from "../../../prisma/prisma";
export default async function getColaboradores() {

  try {
    const lista = await prisma.colaborador.findMany()
    console.log(lista);
    
    return { error: false, colaboradores: lista }
  } catch (error) {
    console.log(error);
    
    return { error: true, colaboradores: [] }
  }
}
