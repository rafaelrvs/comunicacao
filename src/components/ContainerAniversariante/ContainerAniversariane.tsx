export type AniversariantesProps = 
{
urlImagem:string;
nameImage:string
};

export default function Aniversariantes({urlImagem,nameImage}: AniversariantesProps) {
  return (
    <div >
        <div>
        <img src={urlImagem} alt={nameImage}/>
        </div>
      <h1>Aniversariantes</h1>
      <p>Setor</p>
      <p>dia</p>
    </div>
  );
}