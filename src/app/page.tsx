import getColaboradores from "@/actions/Colaborador/getcolaborador";
import Apresentacao from "@/components/Apresentacao/Apresentacao";
import { ColaboradoresProps } from "@/type/Colaborador/colaboradorType";

export default async function Home() {

  const  {colaboradores} = await getColaboradores();
  return (
    <main className="min-h-screen bg-gray-50">
      <Apresentacao colaboradores={colaboradores} />
    </main>
  );
}