import React from 'react';
import Header from '@/components/header';
import MainHome from '@/components/mainHome';
import Testes from '@/components/testes';

export default function Home() {
  return (
    <div className='w-screen min-h-screen flex flex-col justify-between items-center'>
      <div className='container flex justify-center items-center w-full h-full'>
        <MainHome/>
      </div>
      <Testes/>
    </div>
  );
}
