import Image from "next/image";

export type AniversariantesProps = {
  urlImagem: string;
  nameImage: string;
};

export default function Aniversariantes({
  urlImagem,
  nameImage,
}: AniversariantesProps) {
  return (
    <div>
      <div className="h-10">
        <Image
          width={"150"}
          height={"100"}
          quality={100}
          src={urlImagem}
          alt={nameImage}
          style={{ objectFit: "cover" }}
        />
      </div>
      <h1>Aniversariantes</h1>
      <p>Setor</p>
      <p>dia</p>
    </div>
  );
}
