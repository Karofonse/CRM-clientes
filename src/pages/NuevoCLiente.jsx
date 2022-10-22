import React from 'react'
import {useNavigate, useActionData, Form, redirect}  from 'react-router-dom'
import Formulario from '../components/Formulario'
import Error from '../components/Error'
import {agregarCliente} from '../data/clientes'

export async function action ( {request}) {
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

    await agregarCliente(datos)

    return redirect ('/')
}

function NuevoCLiente() {

    const errores = useActionData()
    const navigate = useNavigate()

    return (
        <>
        <h1 className="font-black text-4xl text-green-900 font-serif text-center">Nuevo Cliente</h1>
        <p className="mt-3 font-serif text-center ">Llene todos los campos para registrar un nuevo cliente </p>
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
                <Formulario/>
            <input
                type="submit"
                className="mt-5 w-full bg-viole p-3 uppercase font-bold text-white text-lg rounded-lg"
                value="Registrar Cliente"
            />
            </Form>
        </div>
        </>
    )
}

export default NuevoCLiente