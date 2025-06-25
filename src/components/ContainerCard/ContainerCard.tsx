import { ColaboradoresProps } from "@/type/Colaborador/colaboradorType";
import { ReactNode } from "react";

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
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden" {...props}>
      {colaborador.urlImg ? (
        <div className="h-100 overflow-hidden flex items-start p-2">

        <img
          src={colaborador.urlImg}
          alt={colaborador.nome}
          className="w-full object-cover rounded-2xl"
          />
          </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <span className="text-white text-3xl font-bold">{initials}</span>
        </div>
      )}
      <div className="p-4">
        <h1 className="text-lg font-semibold text-gray-800">
          {colaborador.nome}
        </h1>
        <p className="text-sm text-gray-600">
          <span className="mr-1">🎂 Dia</span>  
          { aniversario.toLocaleDateString("pt-BR", {
            day: "2-digit", 
            month: "long",
          })}
        </p>
      </div>
    </div>
  );
}
