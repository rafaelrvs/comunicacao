'use server';
import { cookies } from 'next/headers';

export async function logOff(): Promise<void> {
  // 1) Aguarda a Promise para obter o cookie store
  const cookieStore = await cookies();

  
  cookieStore.delete('token');
}
