import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Header = () => {
    const {cerrarSesion} = useAuth()
  return (
        <header className="py-10 bg-indigo-600">
             <div className="container text-center flex-col lg:flex-row mx-auto flex justify-between items-center">
                <h1 className="font-bold text-2xl text-indigo-200 pl-3">Administrador de pacientes de {''} 
                      <span className="text-white font-black">Veterinaria</span>
                </h1>

                <nav className="flex flex-col lg:flex-row items-center gap-4 mt-5 lg:mt-0">
                    <Link to="/admin" className="text-white text-sm uppercase font-bold">Pacientes</Link>          
                    <Link to="/admin/perfil" className="text-white text-sm uppercase font-bold">Perfil</Link>
                    
                    <button
                        type="button"
                        className="text-white text-sm pr-6 uppercase font-bold"
                        onClick={cerrarSesion}
                     >Cerrar Sesión</button>          
                </nav>
             </div>   
              
        </header> 
  )
}

export default Header
                      
