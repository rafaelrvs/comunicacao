import Image from "next/image";

export type AniversariantesProps = 
{
urlImagem:string;
nameImage:string
};

export default function Aniversariantes({urlImagem,nameImage}: AniversariantesProps) {
  return (
    <div >
        <div className="h-10">
         <Image
    src={urlImagem}
    alt={nameImage}
    fill
    style={{ objectFit: "cover" }}
  />
        </div>
      <h1>Aniversariantes</h1>
      <p>Setor</p>
      <p>dia</p>
    </div>
  );
}