export type CardProps =React.ComponentProps<"div"> & {
numero:number|string
title:string
text:string
styleH2:string


};

export default function Card({title,numero,text,className,styleH2}: CardProps) {
  return (
    <div className={className} >
      <h1 className="text-[1.3rem]" ><strong>{title}</strong></h1>
      <h2 className={styleH2}> <strong>
        {text}{numero}
        </strong></h2>
    </div>
  );
}