import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import clienteAxios from '../config/axios'
import Alerta from '../components/Alerta'

const ConfirmarCuenta = () => {
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [alerta, setAlerta] = useState({});
    
    const params = useParams();
    const { id } = params;
    
    useEffect(() => {
      const confirmarCuenta = async () => {
          try {
              const url = `/veterinarios/confirmar/${id}`
              const { data } = await clienteAxios(url)
              setCuentaConfirmada(true);
              setAlerta({
                msj: data.msj,
                
              })
          } catch (error) {
            setAlerta({
              msj: error.response.data.msj,
              error: true
            })
          } 
        setCargando(false);       
      }
      confirmarCuenta();
    }, []);
      
    return (
      <>
         <div>
             <h1 className="text-indigo-600 font-black text-6xl pl-7">
                  Confirma tu cuenta y comienza Administrar tus 
                 <span className="text-black"> pacientes </span>
             </h1>
         </div>

          <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
               {!cargando &&
                 <Alerta
                   alerta={alerta}
               />}
               
               {cuentaConfirmada && (
                  <Link
                  className="block text-center my-5 text-gray-500"
                  to="/">inicia sesión</Link>
               )}
          </div>
      </>
    )
  }
  
  export default ConfirmarCuenta
                
      
  
