import React from 'react'
import{obtenerCliente, actualizarCliente } from '../data/clientes'
import {Form, redirect, useActionData, useLoaderData, useNavigate}  from 'react-router-dom'
import Formulario from '../components/Formulario'
import Error from '../components/Error'

export async function loader({params}){
    const cliente = await obtenerCliente(params.clienteId)
    if(Object.values(cliente).length === 0){
        throw new Response('',{
            status: 404,
            statusText:'No existe el cliente que busca '
        })
    }
    return cliente
}

export async function action ( {request, params}){

    const formData = await request.formData()
    const datos = Object.fromEntries(formData)
    const email = formData.get('email')


    // Validación  
    const errores =[]

    if(Object.values(datos).includes('')){
        errores.push('Todos los campos son obligatorios')
    }

    let regex = new RegExp("([!#-'*+/-9=?AZ^-~-]+(\.[!#-'*+/-9=?AZ^-~-]+) *|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=? AZ^-~-]+(\.[!#-'*+/-9=?AZ^-~-]+)*|\[[\t -Z^-~]*])");
    if(!regex.test(email)){
        errores.push('El email no es válido')
    }

    // Retornar datos si hay errores 
    if(Object.keys(errores).length){
        return errores
    }

    // Actualizar cliente 
    await actualizarCliente(params.clienteId, datos)

    return redirect ('/')
}

function EditarCliente() {
    const navigate = useNavigate()
    const cliente = useLoaderData()
    const errores = useActionData()

    return (
        <>
            <h1 className="font-black text-4xl text-green-900 font-serif text-center">Editar Cliente</h1>
            <p className="mt-3 font-serif text-center ">Modifique los datos de un cliente </p>
            <br />
            <div className= "flex justify-end">
                <button 
                className="bg-viole text-white px-3 py-1 font-bold uppercase rounded-md"
                onClick={() => navigate (-1)}>
                    Volver
                </button>
            </div>

            <div className="bg-white shadow rounded-lg md:w-3/4 mx-auto px-5 py-10 mt-10">
                
                {errores?.length && errores.map( (error, i) => <Error key={i}>{error}</Error>)}

                <Form
                method='POST'
                noValidate
                >
                    <Formulario
                    cliente={cliente}/>
                <input
                    type="submit"
                    className="mt-5 w-full bg-viole p-3 uppercase font-bold text-white text-lg rounded-lg"
                    value="Guardar Cambios"
                />
                </Form>
            </div>
        </>
    )
}

export default EditarCliente