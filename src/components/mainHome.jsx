import React from 'react';

export default function MainHome(){
    const rows = Array(15).fill({});
    return(
        <div className='h-fit w-full'>
        <div> 
            <h1 className="text-center text-xl font-bold mb-4">Carrinho</h1>
                <div className="text-3xl bg-green-300 text-black p-2">
                Comprador: <span className="font-semibold">{}</span>
            </div>
        </div>
        <div className="border border-gray-darkest">
      {rows.map((_, index) => (
        <div
          key={index}
          className={`p-4 border-b border-gray-darkest ${
            index % 2 === 0 ? "bg-gray-200" : "bg-gray-300"
          }`}
        >
        </div>
      ))}
    </div>
    <div className="flex justify-between items-center bg-blue-300 text-black p-2">
        <span className='text-3xl'>Quantidade:{}</span>
        <span className='text-3xl pr-20'>Total:{}</span>
    </div>
      </div>
    )
}