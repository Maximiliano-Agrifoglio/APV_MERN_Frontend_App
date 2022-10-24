import { Link, useNavigate } from "react-router-dom"
import { useState} from "react"
import useAuth from "../hooks/useAuth"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"

const Login = () => {
  
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  
  const [alerta, setAlerta] = useState({});  
  
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const { msj } = alerta;

  const handleSumit = async (e) => {
    e.preventDefault();
    
    if ([email, password].includes('')) {
        setAlerta({
            msj: 'todos los campos son obligatorios',
            error: true
        })

        return;
    }
    
    try {
     const {data} = await clienteAxios.post('/veterinarios/login', {email, password} ); 
     localStorage.setItem('token', data.token ); 
     setAuth(data);
     navigate('/admin');
    } catch (error) {
        setAlerta({
            msj: error.response.data.msj,
            error: true
        })
    }
  }

  return (
   <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl pl-7">
                Inicia Sesión y Administra tus 
                <span className="text-black"> pacientes </span>
            </h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

               {msj && <Alerta
                   alerta={alerta}
               />}
            <form onSubmit={handleSumit}>
                <div className="py-4"> 
                  <label className="uppercase text-gray-600 block text-xl font-bold">
                     Email
                  </label>
                  <input 
                      type="email"
                      placeholder="Email de registro"
                      className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                      value={email}
                      onChange={ e => setEmail(e.target.value) }
                   />
                </div>
  
                <div className="py-4"> 
                  <label className="uppercase text-gray-600 block text-xl font-bold">
                     Password
                  </label>
                  <input 
                      type="Password"
                      placeholder="tu password"
                      className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                      value={password}
                      onChange={ e => setPassword(e.target.value) }
                   />
                </div>
                
                <input 
                   type="submit"
                   value="iniciar sesión"
                   className="bg-indigo-700 w-full 
                   py-3 px-10 rounded-xl text-white uppercase 
                   font-bold mt-5 hover:cursor-pointer
                   hover:bg-indigo-800 md:w-auto"  
                />
                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link
                        className="block text-center my-5 text-gray-500"
                        to="/registrar">No tienes una cuenta? Registrate</Link>
                    <Link
                        className="block text-center my-5 text-gray-500 mr-20" 
                        to="/olvide-password">Olvide mi password</Link>
                </nav>
            </form>
        </div>
    </>
  )
}

export default Login

        