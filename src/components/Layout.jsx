import {Outlet, Link,useLocation} from 'react-router-dom'
import React from 'react'

    function Layout ()  {
        const location = useLocation()

    return (
        <div className="md:flex md:min-h-screen">
            <aside className="md:w-1/4 bg-gradient-to-r from-regal-blue to-viole px-5 py-10 rounded-r-lg">
                <h2 className="text-4xl font-black text-center text-white font-serif">CRM- Clientes</h2>
                <nav className="mt-10 font-serif">
                <Link className={`${location.pathname === '/' ? 'text-vert' : 'text-white'} text-2xl block mt-2 hover:text-vert`} to="/">Clientes</Link>
                <Link className={`${location.pathname === '/clientes/nuevo' ? 'text-vert' : 'text-white'} text-2xl block mt-2 hover:text-vert`} to="/clientes/nuevo">Nuevo Cliente</Link>
                </nav>
            </aside>
            <main className="md:w-3/4 p-10 md:h-screen overflow-scroll font-serif">
            <Outlet/>
            </main>
        </div>
    )
}

export default Layout