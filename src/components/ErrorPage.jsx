import {useRouteError} from 'react-router-dom'
import Logo from '../img/logo'

export default function ErrorPage(){
    const error = useRouteError()
    console.log(error.message)

    return (
        <div className='space-y-8 shadow flex-auto'>
            <h1 className='text-center text-5xl font font-extrabold mt-20 text-regal-blue'>CRM - Clientes </h1>
            <Logo/>
                
                <p className='text-center'>Ha ocurrido el siguiente error :</p>
                <p className='text-center'>{error.statusText || error.message}</p>
            </div>
        
    )
}