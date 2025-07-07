"use client"
import { ColaboradoresProps } from "@/type/Colaborador/colaboradorType";
import { Pencil, Trash2 } from "lucide-react";
import React, { SetStateAction, useState } from "react";
import EditaColaborador from "../EditaColaborador/EditaColaborador";
import deleteColaborador from "@/actions/Colaborador/deletacolaborador";
import { toast } from "react-toastify";
import Image from "next/image";

type PropsModalLista = {
  colaboradores: ColaboradoresProps[];
  setEditaColab: React.Dispatch<SetStateAction<boolean>>;
};
export default function ModalListaColaborador({
  colaboradores,
}: PropsModalLista) {
  const [editandoUuid, setEditandoUuid] = useState<string | null>(null);
  const [statusDeleta, setStatusDeleta] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const colaboradoresFiltrados = colaboradores.filter((colaborador) =>
    colaborador.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [formEdit, setFormEdit] = useState({
    uuid: "",
    nome: "",
    data: "",
    src: "",
  });

  async function deletarColaborador(uuid: string) {
    const response = await deleteColaborador(uuid);

    if (response.error) {
      toast.error("erro ao deletar");
    }
    if (!response.error) {
      toast.success("Colaborador deletado com sucesso");
    }
  }

  return (
    <div className=" overflow-y-auto h-80 overflow-x-hidden ">
      <input
        type="text"
        placeholder="Pesquisar por nome"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg text-black-50  focus:border-white focus:outline-none"
      />

      {colaboradoresFiltrados.map((colaborador) => (
        <div
          className="flex  bg-white mt-2 shadow shadow-2xl  w-3xl rounded-[15px] overflow-hidden gap-2 relative hover:"
          key={colaborador.uuid}
        >
          <div className="flex" key={colaborador.uuid}>
            <div className="relative  size-32 p-10 overflow-hidden flex items-start mr-2  ">
              {colaborador.urlImg ? (
                <Image
                width={"150"}
                   height={"100"}
                   quality={100} 
                  src={colaborador.urlImg}
                  alt={colaborador.nome}
                  className="rounded-[15px] object-cover"
                />
              ) : (
                <p className=" justify-center flex items-center size-full ">
                  {" "}
                  <strong>{colaborador.nome.slice(0, 2)}</strong>
                </p>
              )}
            </div>

            {editandoUuid === colaborador.uuid ? (
              <EditaColaborador
              setStatusDeleta={setStatusDeleta}
                formEdit={formEdit}
                setEditandoUuid={setEditandoUuid}
                setFormEdit={setFormEdit}
              />
            ) : (
              <div className="flex flex-col">
                <h1>{colaborador.nome}</h1>
                <p>
                  {`${String(colaborador.dataNascimento.getDate()).padStart(
                    2,
                    "0"
                  )}/${String(
                    colaborador.dataNascimento.getMonth() + 1
                  ).padStart(
                    2,
                    "0"
                  )}/${colaborador.dataNascimento.getFullYear()}`}
                </p>
              </div>
            )}
          </div>


    <div className="absolute top-4 right-2 space-y-2">
      { statusDeleta === colaborador.uuid  ? (
      <div className="flex  gap-2 ">
               <button
                 className="p-2 w-24 bg-purple-600 text-white rounded-md active:scale-102"
                 onClick={() => {
                   setEditandoUuid(null);
                   setEditandoUuid(colaborador.uuid);
                   deletarColaborador(colaborador.uuid);
                 }}
               >
                 Remover
               </button>
               <button
                  type="submit"
                 className="p-2 w-24 bg-red-600 text-white rounded-md active:scale-102"
                 onClick={() => {setEditandoUuid(null); 
                  setStatusDeleta(null);
                }}
               >
                 Cancelar
               </button>
             </div>
      ) : (
    
       
        <div className="flex  gap-2">
          <div
            className="p-2 bg-purple-600 text-white rounded-md cursor-pointer active:scale-102"
            onClick={() => {
              setStatusDeleta(null);
              setEditandoUuid(colaborador.uuid);
              setFormEdit({
                uuid: colaborador.uuid,
                nome: colaborador.nome,
                data: colaborador.dataNascimento.toISOString().split("T")[0],
                src: colaborador.urlImg || "",
              });
            }}
          >
            <Pencil />
          </div>
          <button
             
            className="p-2 bg-red-600 text-white rounded-md active:scale-102"
            onClick={() =>{setEditandoUuid(null); setStatusDeleta(colaborador.uuid);}}
          >
            <Trash2 />
          </button>
        </div>
      )}
    </div>
  </div>
))}
    </div>
  );
}
