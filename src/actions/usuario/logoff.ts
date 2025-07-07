'use server';
import { cookies } from 'next/headers';

export async function logOff(): Promise<void> {

  const cookieStore = await cookies();

  
  cookieStore.delete('token');
}
