"use client"
import { Lock, Search, User } from "lucide-react";
import { Form } from "../Form";
import React, { SetStateAction, useEffect } from "react";
import { loginUser } from "@/actions/usuario/login";
import { toast } from "react-toastify";


type PropsLogin ={
    setModal:React.Dispatch<SetStateAction<boolean>>
}
export default function ModalLogin({setModal}:PropsLogin){
  const [state, formData, isPending] = React.useActionState(loginUser, {
    errors: [],
    msg_success: "",
    success: false,
  });

    useEffect(() => {
      const { errors, msg_success } = state;
  
      if (Array.isArray(errors) && errors.length > 0) {
        errors.forEach((err) => toast.error(err));
        return;
      }
  
      if (msg_success) {
        toast.success(msg_success);
      }
    }, [state.errors, state.msg_success]);
    return(

           <div className="flex w-full justify-center bg-black/70 h-full fixed items-center top-0 left-0 ">
        <Form.Root
          action={formData}
          className=" bg-white p-5 shadow shado-md rounded-[15px]  text-gray-700"
        >
          <div className="flex justify-between text-gray-700 dark:text-gray-700">
            <h1 className="pt-2 pb-2 text-gray-700 ">
              <strong className=" flex  gap-2 justify-center items-center">
                {" "}
                <User />
                Login
              </strong>
            </h1>

            <div
              className="size-7 text-white flex items-center justify-center bg-red-500 rounded-full cursor-pointer active:scale-101"
              onClick={() => {
                setModal(false);
              }}
            >
              X
            </div>
          </div>
          <Form.PrimaryInput
            icon={Search}
            label="Email"
            name="Email"
            id="Email"
            placeholder="Digite seu email"
            required
            type="email"
          />
          <Form.PrimaryInput
            icon={Lock}
            name="Senha"
            label="Senha"
            id="Senha"
            placeholder="Digite seu email"
            required
            className="text-gray-700"
          />
          <Form.PrimaryButton
            disabled={isPending}
            className="w-full p-2 bg-purple-600 text-white mt-5 rounded-[15px] "
            type="submit"
            text={"Entrar"}
          />
        </Form.Root>
      </div>
    )
}