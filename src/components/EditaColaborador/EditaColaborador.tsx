import { toast } from "react-toastify";
import { Form } from "../Form";
import React, { Dispatch, SetStateAction } from "react";

// 1) Interface do estado do form
export interface FormEdit {
  nome: string;
  data: string;    
  src: string;
}


type PropsEditColaborador = {
  formEdit: FormEdit;
  setFormEdit: Dispatch<SetStateAction<FormEdit>>;
  setEditandoUuid: Dispatch<SetStateAction<string | null>>;
};

export default function EditaColaborador({
  formEdit,
  setFormEdit,
  setEditandoUuid,
}: PropsEditColaborador) {

  const handleChangeEdit: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormEdit((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col flex-1 gap-2">
      <Form.PrimaryInput
        name="nome"
        value={formEdit.nome}
        onChange={handleChangeEdit}
      />
      <Form.PrimaryInput
        name="data"
        type="date"
        value={formEdit.data}
        onChange={handleChangeEdit}
      />

      <div className="flex gap-2 mt-2">
        <button
          className="bg-green-500 text-white p-1 rounded"
          onClick={() => {
            toast.success("Alterações salvas");
            setEditandoUuid(null);
          }}
        >
          Salvar
        </button>
        <button
          className="bg-gray-400 text-white p-2 rounded"
          onClick={() => setEditandoUuid(null)}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
