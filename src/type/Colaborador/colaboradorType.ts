export type ColaboradoresProps ={
     uuid: string;
    nome: string;
    dataNascimento: Date;
    urlImg: string;
}

export type PostColaboradorResult = {
  errors: string[];
  msg_success: string;
  success: boolean;
};
export type DeleteColaboradorResult = {
  error: boolean;
  message?: string;
};