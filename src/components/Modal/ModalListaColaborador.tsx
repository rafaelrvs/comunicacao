import { ColaboradoresProps } from "@/type/Colaborador/colaboradorType";
import { Pencil, Trash2 } from "lucide-react";
import React, { SetStateAction, useState } from "react";
import EditaColaborador from "../EditaColaborador/EditaColaborador";
import deleteColaborador from "@/actions/Colaborador/deletacolaborador";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
type PropsModalLista = {
  colaboradores: ColaboradoresProps[];
  setEditaColab: React.Dispatch<SetStateAction<boolean>>;
};
export default function ModalListaColaborador({
  colaboradores,
  setEditaColab,
}: PropsModalLista) {
  const [editandoUuid, setEditandoUuid] = useState<string | null>(null);
  const [statusDeleta, setStatusDeleta] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");

  const colaboradoresFiltrados = colaboradores.filter((colaborador) =>
    colaborador.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [formEdit, setFormEdit] = useState({ nome: "", data: "", src: "" });

  function handleEditaColab(colaborador: ColaboradoresProps) {
    setEditaColab(true);
  }

  function handleChangeEdit(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormEdit((prev) => ({ ...prev, [name]: value }));
  }

  async function deletarColaborador(uuid: string) {
    const response = await deleteColaborador(uuid);

    console.log(response.error);

    if (response.error) {
      toast.error("erro ao deletar");
    }
    if (!response.error) {
      toast.success("Colaborador deletado com sucesso");
    }
  }

  return (
    <div className=" overflow-y-auto h-80 overflow-x-hidden">
      <input
        type="text"
        placeholder="Pesquisar por nome"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg text-blue-50  focus:border-white focus:outline-none"
      />
      
      {colaboradoresFiltrados.map((colaborador) => (
        <div
          className="flex  bg-white mt-2 w-3xl rounded-[15px] overflow-hidden gap-2 relative  hover:"
          key={colaborador.uuid}
        >
          <div className="flex" key={colaborador.uuid}>
            <div className="size-15 items-center flex m-1">
               {
                colaborador.urlImg?
              <img
              src={colaborador.urlImg}
              alt={colaborador.nome}
              className="rounded-[15px]"
              />:
                <p className=" justify-center flex items-center size-full "> <strong>{colaborador.nome.slice(0,2)}</strong></p>
            }
            </div>

            {editandoUuid === colaborador.uuid ? (
              <EditaColaborador
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
          {statusDeleta ? (
            <div className="flex gap-2 mt-2">
              <button
                className="bg-green-500 text-white p-2 rounded"
                onClick={() => {
                  setEditandoUuid(null);
                  deletarColaborador(colaborador.uuid);
                }}
              >
                Confirmar
              </button>
              <button
                className="bg-gray-400 text-white p-2 rounded"
                onClick={() => setStatusDeleta(false)}
              >
                Cancelar
              </button>
            </div>
          ) : (
            ""
          )}
          <div>
            <div
              className="p-2 bg-purple-600 text-white rounded-md cursor-pointer active:scale-102 absolute right-15 top-4"
              onClick={() => {
                setEditandoUuid(colaborador.uuid);
                setFormEdit({
                  nome: colaborador.nome,
                  data: colaborador.dataNascimento.toISOString().split("T")[0],
                  src: colaborador.urlImg || "",
                });
              }}
            >
              <Pencil />
            </div>
            <button
              className="absolute p-2  right-1 top-4 bg-red-600 text-white rounded-md active:scale-102"
              onClick={() => setStatusDeleta(true)}
            >
              <Trash2 />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
