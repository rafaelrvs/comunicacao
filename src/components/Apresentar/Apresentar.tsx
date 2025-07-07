'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { ColaboradoresProps } from '@/type/Colaborador/colaboradorType';
import ContainerCard from '../ContainerCard/ContainerCard';
import { AnimatePresence,motion } from 'motion/react';
import Card from '../Card/Card';


type PropsApresentacao = {
  aniversariantes: ColaboradoresProps[];
};

export default function Apresentar({ aniversariantes }: PropsApresentacao) {
  const [startIndex, setStartIndex] = useState(0);
const [animacao,setAnimacao] = useState(false)
  useEffect(() => {
    //animacao balao
    if (aniversariantes.length <= 4) return;
    
    const interval = setInterval(() => {
      setStartIndex(prev => (prev + 4) % aniversariantes.length);
      
      setAnimacao(!animacao)
    }, 5000); // troca a cada 5 segundos

    return () => clearInterval(interval);
  }, [aniversariantes]);

  // Seleciona sempre 4 colaboradores, com wrap-around
  const exibidos = Array.from({ length: Math.min(4, aniversariantes.length) }).map((_, i) => {
    const idx = (startIndex + i) % aniversariantes.length;
    return aniversariantes[idx];
  });

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
      return aniversariantes
        .map((c) => ({
          ...c,
          daysUntil: calcularDiasPara(String(c.dataNascimento)),
        }))
        .filter((x) => x.daysUntil > 0)
        .sort((a, b) => a.daysUntil - b.daysUntil)[0];
    }, [aniversariantes]);

  return (
    <AnimatePresence mode='popLayout'>
        <div className='h-[90dvh]'>

        <div className="bg-slate-200 rounded-lg shadow p-6 flex flex-col sm:flex-row gap-4 justify-center  mb-20 relative" >
       
        <Card
            className="flex-1 bg-blue-50 p-4 rounded relative hover:scale-101 duration-75 ease-in  text-blue-600"
            title={" Aniversariantes este mês"}
            text={""}
            styleH2={"text-purple-900 text-[1.7rem]"}
            numero={aniversariantes.length}
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
        <motion.div
            key='container'
            initial={{opacity:0,y:20}}
            animate={{opacity:1, y:0}}
            
            className="flex flex-wrap gap-4 justify-center items-center overflow-hidden">

        {exibidos.map(colaborador => {
            const aniversario = new Date(colaborador.dataNascimento);
            const initials = colaborador.nome
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase();
            return (
                <motion.div
                    key={colaborador.uuid}
                    initial={{opacity:0, x:-20}}
                    animate={{opacity:1, x:0}}
                    exit={{opacity:0, x:-20}}
                    transition={{duration: 0.4}}
                    >
                    <ContainerCard
                    key={colaborador.uuid}
                    colaborador={colaborador}
                    aniversario={aniversario}
                    initials={initials}
                    className="bg-white rounded-lg shadow-md hover:scale-105 transition-transform ease-in-out "
                />
                </motion.div>
                );
            })}
        </motion.div>
        </div>

        </AnimatePresence>
  );
}
