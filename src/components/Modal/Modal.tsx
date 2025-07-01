"use client"

import React, { useState } from "react";
import { ColaboradoresProps } from "@/type/Colaborador/colaboradorType";
import ModalLogin from "./ModalLogin";
import ModalCadastroColaborador from "./ModalCadastro";

type ModalProps = {
  validacao: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  colaboradores: ColaboradoresProps[];
};
export default function LoginModal({
  setModal,
  validacao,
  colaboradores,
}: ModalProps) {
  const [editaColab, setEditaColab] = useState(false);

  if (!validacao)
    return (
     <ModalLogin setModal={setModal} />
    );
  if (validacao)
    return (
  <ModalCadastroColaborador setEditaColab={setEditaColab} setModal={setModal} colaboradores={colaboradores}/>
    );


    
 
}
