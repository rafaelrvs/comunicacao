
"use client"
import { toast } from "react-toastify";
import { Form } from "../Form";
import React, { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import putColaborador from "@/actions/Colaborador/putcolaborador";
import { PostColaboradorResult } from "@/type/Colaborador/colaboradorType";

// 1) Interface do estado do form
export interface FormEdit {
  uuid:string;
  nome: string;
  data: string;
  src: string;
}

type PropsEditColaborador = {
  formEdit: FormEdit;
  setFormEdit: Dispatch<SetStateAction<FormEdit>>;
  setEditandoUuid: Dispatch<SetStateAction<string | null>>;
  setStatusDeleta: Dispatch<SetStateAction<string | null>>;
};

export default function EditaColaborador({
  formEdit,
  setFormEdit,
  setEditandoUuid,

}: PropsEditColaborador) {
  const actionAdapter = async (
    _prev: PostColaboradorResult,
    formData: FormData
  ): Promise<PostColaboradorResult> => {
    return putColaborador(formData);
  };
  const [stateEdita, formAction] = useActionState(actionAdapter, {
    errors: [],
    msg_success: "",
    success: false,
  });

  const handleChangeEdit: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormEdit((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(()=>{
    if (stateEdita.success) {
      toast.success(stateEdita.msg_success)
    }
    if (!stateEdita.success) {
      toast.error(stateEdita.errors)
    }
    
      
  },[stateEdita])

  return (
    <Form.Root
      action={formAction}
      className="flex flex-col flex-1 gap-2 p-5"
    >
      {/* precisa do uuid para identificar quem editar */}
      <input type="hidden" name="uuid" value={formEdit.uuid} />

      <Form.PrimaryInput
        name="nome"
        value={formEdit.nome}
        onChange={handleChangeEdit}
      />

      <Form.PrimaryInput
        name="dataNasc"
        type="date"
        value={formEdit.data}
        onChange={handleChangeEdit}
        className="flex"
      />


      <input name="src" type="file" accept="image/*" className="border p-2 rounded-[15px] border-gray-400" />

     <div className="flex  gap-2">
               <button
                 type="submit"
                 className="p-2 w-24 bg-purple-600 text-white rounded-md active:scale-102"
               >
                 Confirmar
               </button>
               <button
                  type="button"
                 className="p-2 w-24 bg-red-600 text-white rounded-md active:scale-102"
                 onClick={() => {setEditandoUuid(null)}}
               >
                 Cancelar
               </button>
             </div>
    </Form.Root>
  );
}