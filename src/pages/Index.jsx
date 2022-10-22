import React from 'react'
import {obtenerClientes} from '../data/clientes'
import {useLoaderData} from 'react-router-dom'
import Cliente from '../components/Cliente';


export function loader (){
    const clientes = obtenerClientes()
    return clientes
}

    function Index() {

    const clientes = useLoaderData(); 
    
    return (
        <>
            <h1 className="font-black text-4xl text-green-900 font-serif text-center">Clientes</h1>
            <p className="mt-3 font-serif text-center ">Administre sus clientes aquí:</p>

            {clientes.length ? (
                <table className="w-full bg-white shadow mt-5 table-auto ">
                    <thead className=" bg-green-800 text-white font-serif">
                        <tr>
                            <th className="p-2">Cliente</th>
                            <th className="p-2">Contacto</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                        <tbody>
                            {clientes.map(cliente =>(
                                <Cliente
                                    cliente={cliente}
                                    key={cliente.id}
                                />
                            ))}
                        </tbody>
                </table>
            ):(
                <p className="text-center mt-10 font-serif">No hay clientes aun, por favor agregue un nuevo cliente </p>
            )}
        </>
    )
}

export default Index