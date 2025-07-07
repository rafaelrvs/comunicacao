import { ColaboradoresProps } from "@/type/Colaborador/colaboradorType";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { useEffect } from "react";

export type ContainerCardProps = React.ComponentProps<"div"> & {
  colaborador: ColaboradoresProps;
  initials: string;
  aniversario: Date;
};

export default function ContainerCard({
  aniversario,
  initials,
  colaborador,

  ...props
}: ContainerCardProps) {
  console.log(colaborador.urlImg);

  const path = usePathname();
  useEffect(() => {
    console.log(path);
  }, [path]);
  return (
    <div
      className="bg-white rounded-lg shadow overflow-hidden hover:scale-101 duration-500 ease-in-out w-100"
      {...props}
    >
      {colaborador.urlImg ? (
        <div className=" relative size-100 overflow-hidden flex items-start ">
          <Image
            width={"100"}
            height={"100"}
            quality={100}
            src={colaborador.urlImg}
            alt={colaborador.nome}
            className="object-cover w-full"
          />
        </div>
      ) : (
        <div className=" bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center size-100">
          <span className="text-white text-3xl font-bold ">{initials}</span>
        </div>
      )}
      <div className="p-4 ">
        <h1 className="text-2xl font-semibold text-gray-800 ">
          {colaborador.nome}
        </h1>
        <p className="text-2xl text-gray-600 ">
          <span className="mr-1">🎂 Dia</span>
          {aniversario.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
          })}
        </p>
      </div>
    </div>
  );
}
