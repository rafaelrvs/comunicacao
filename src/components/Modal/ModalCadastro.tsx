import { User } from "lucide-react";
import ModalListaColaborador from "./ModalListaColaborador";
import { Form } from "../Form";
import React, { SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import postColaborador from "@/actions/Colaborador/postcolaborador";
import { logOff } from "@/actions/usuario/logoff";
import { ColaboradoresProps } from "@/type/Colaborador/colaboradorType";


type PropsColaboradorCadastro = {
colaboradores:ColaboradoresProps[]
setModal:React.Dispatch<SetStateAction<boolean>>
setEditaColab:React.Dispatch<SetStateAction<boolean>>

}
export default function ModalCadastroColaborador({colaboradores,setEditaColab}:PropsColaboradorCadastro){



  const [stateCadastro, formDataCadastro, isPendingCadastro] =
    React.useActionState(postColaborador, {
      errors: [],
      msg_success: "",
      success: false,
    });
  
    const { errors, msg_success } = stateCadastro;
     useEffect(() => {
    
        if (Array.isArray(errors) && errors.length > 0) {
          errors.forEach((err) => toast.error(err));
          return;
        }
    
        if (msg_success) {
          toast.success(msg_success);
        }
      }, [errors, msg_success]);
    

      return (
    <div className="flex w-full justify-around bg-black/70 h-full fixed items-center top-0 left-0 ">
        
      <Form.Root
        
        action={formDataCadastro}
        className="bg-white p-5 shadow shado-md rounded-[15px]  text-gray-700 gap-2 flex flex-col
      "
      >
        <div className="flex justify-between items-center">
          <h1 className="pt-2 pb-2 text-gray-700 flex text-2xl">
            <strong className=" flex  gap-2 justify-center items-center text ">
              {" "}
              <User className="" />
             Cadastrar colaborador
            </strong>
          </h1>

          <p onClick={(e)=>{ e.preventDefault(); logOff()}} className="bg-red-400 text-white p-2 rounded-[15px] cursor-pointer">Voltar</p>
          
        </div>
        <Form.PrimaryInput name="nome" placeholder="Nome do colaborador" required />
        <Form.PrimaryInput
          name="dataNasc"
          placeholder="Data de Anivesario"
          type="date"
          required
        />
        <Form.PrimaryInput name="src" type="File" />
        <Form.PrimaryButton
          disabled={isPendingCadastro}
          className="w-full p-2 bg-purple-600 text-white mt-5 rounded-[15px] "
          type="submit"
          text={"Cadastrar"}
        />
      </Form.Root>

      <div className="h-80  overflow-hidden  bg-white  p-5  rounded-[15px] ">
    <ModalListaColaborador setEditaColab={setEditaColab} colaboradores={colaboradores}/>
    
      </div>
    </div>
  );
}