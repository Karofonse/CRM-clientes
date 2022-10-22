import React from 'react'
import {useNavigate, Form, redirect} from 'react-router-dom'
import {eliminarCliente} from '../data/clientes'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export async function action({params}){
    await eliminarCliente(params.clienteId)
    return redirect('/')
}

function Cliente({cliente}) {

    const navigate = useNavigate()

    const {nombre, empresa, email, telefono, id} = cliente

return (
    <tr className="border-b text-center">
        <td className="p-6 space-y-2">
            <p className="text-2xl text-gray-800">{nombre}</p>
            <p>{empresa}</p>
        </td>
        <td className="p-6">
            <p className="text-gray-600"><span className="text-gray-800 uppercase font-bold">Email: </span>{email}</p>
            <p className="text-gray-600"><span className="text-gray-800 uppercase font-bold">Tel:</span>{telefono}</p>
        </td>

        <td className="p-6 flex gap-3 text-center">
            <button
            type="button"
            className="text-vert hover:text-fonn font-bold text-xs text-center"
            onClick={() => navigate (`/clientes/${id}/editar`)}
            > Editar </button>

            <Form
            method='post'
            action={`/clientes/${id}/eliminar`}
            onSubmit={(e)=> {
                if(!confirm('¿Deseas eliminar este registro?')) {
                    e.preventDefault()
                }
            }}
            >
            <button
            type="submit"
            className="text-red-600 hover:text-red-700 font-bold text-xs text-center"
            > Eliminar </button>
            </Form>
        </td>
    </tr>
    )
}

export default Cliente