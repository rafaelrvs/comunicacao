"use client";
import React, { useMemo, useState } from "react";
import { meses } from "./uilitsDados/utilitsdados";
import { ColaboradoresProps } from "@/type/Colaborador/colaboradorType";
import ContainerCard from "../ContainerCard/ContainerCard";
import Card from "../Card/Card";
import Modal from "../Modal/Modal";
import Apresentar from "../Apresentar/Apresentar";



type ApresentacaoProps = {
  colaboradores: ColaboradoresProps[];
  validacao:boolean;
};
export default function Apresentacao({
  validacao,
  colaboradores,
}: ApresentacaoProps) {
  const [mesSelecionado, setMesSelecionado] = useState<string>(
    meses[new Date().getMonth()]
  );
const [ativaSlide, setAtivaSlide] = useState<boolean>(false)
   const [modal,setModal]=useState<boolean>(false)
  const monthIndex = meses.indexOf(mesSelecionado);

  const aniversariantes = useMemo(
    () =>
      colaboradores.filter(
        (c) => new Date(c.dataNascimento).getMonth() === monthIndex
      ),
    [colaboradores, monthIndex]
  );

  const totalColaboradores = colaboradores.length;
  const calcularDiasPara = (isoDate: string) => {
    const hoje = new Date();
    const niver = new Date(isoDate);

    const prox = new Date(
      hoje.getFullYear(),
      niver.getMonth(),
      niver.getDate()
    );

    if (prox < hoje) prox.setFullYear(prox.getFullYear() + 1);
    return Math.ceil((prox.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
  };

  const proximo = useMemo(() => {
    return colaboradores
      .map((c) => ({
        ...c,
        daysUntil: calcularDiasPara(String(c.dataNascimento)),
      }))
      .filter((x) => x.daysUntil > 0)
      .sort((a, b) => a.daysUntil - b.daysUntil)[0];
  }, [colaboradores]);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMesSelecionado(e.target.value)
  }
  
  return (
    <section className="relative">
      <header
        className="shadow-md text-white h-[10dvh]"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 1.5rem",
          background: "linear-gradient(90deg, #3a5bdc 0%, #4366e0 100%)",
        }}
      >
        <div>
        <h1 style={{ margin: 0, color: "#fff", fontSize: "1.5rem" }}>
          Aniversariantes do Mês
        </h1>
            {mesSelecionado && (
              <p style={{ margin: '0.25rem 0 0', color: '#e0e0e0', fontSize: '0.875rem' }}>
            {mesSelecionado}
          </p>
        )}
        </div>
        <div className="flex gap-5">

        <select
          className="text-black bg-slate-200"
          value={mesSelecionado}
          onChange={handleChange}
          style={{
            padding: '0.5rem 0.75rem',
            borderRadius: 4,
            border: 'none',
            fontSize: '0.875rem',
          }}
        >
          {meses.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <button className="cursor-pointer active:scale-101 border p-2 rounded-[15px]" onClick={()=>{setAtivaSlide(!ativaSlide)}}>{ativaSlide?"Parar":"Apresentar"}</button>
        <button className="cursor-pointer active:scale-101 border p-2 rounded-[15px]" onClick={()=>{setModal(!modal)}}>Login</button>
          </div>
      </header>
{ativaSlide?


<Apresentar aniversariantes={aniversariantes}/>


:
      <main>
        <div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col sm:flex-row gap-4">
            <Card
              className="flex-1 bg-blue-50 p-4 rounded relative hover:scale-101 duration-75 ease-in  text-blue-600"
              title={" Aniversariantes este mês"}
              text={""}
              styleH2={"text-purple-900 text-[1.7rem]"}
              numero={aniversariantes.length}
            />

            <Card
              className="flex-1 bg-purple-50 p-4 rounded relative hover:scale-101 duration-75 ease-in  text-purple-600"
              title={" Total de colaboradores"}
              text={""}
              numero={totalColaboradores}
              styleH2={"text-purple-900 text-[1.7rem]"}
            />
            <Card
              className="flex-1 bg-green-50 p-4 rounded relative hover:scale-101 duration-75 ease-in  text-green-600"
              title={" Próximo aniversariante"}
              text={proximo?.nome}
              styleH2={"text-green-900 text-[1.3rem]"}
              numero={
                proximo?.daysUntil > 1
                  ? `(em ${proximo?.daysUntil} dias)`
                  : `(em ${proximo?.daysUntil} dia)`
              }
            />
          </div>


          
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {aniversariantes.map((colaborador) => {
              const aniversario = new Date(colaborador.dataNascimento);
              const initials = colaborador.nome
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase();

              return (
              
                <ContainerCard aniversario={aniversario} key={colaborador.uuid} initials={initials} colaborador={colaborador} />
                  
              );
            })}
          </div>
        </div>
      </main>
      }
      {
      modal&&
        <Modal setModal={setModal} validacao={validacao} colaboradores={colaboradores}/>


      }
    </section>
  );
}
