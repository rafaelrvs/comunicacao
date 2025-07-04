import getColaboradores from "@/actions/Colaborador/getcolaborador";
// import { verificaAuth } from "@/actions/usuario/auth";
import Apresentacao from "@/components/Apresentacao/Apresentacao";


export default async function Home() {

  const  {colaboradores} = await getColaboradores();
  //  const validacao  = await verificaAuth()
   const validacao  = true
  return (
    <main className="min-h-screen bg-gray-50">
      <Apresentacao colaboradores={colaboradores} validacao={validacao} />
    </main>
  );
}