import { useState, useEffect } from "react"
import { useParams, Link} from 'react-router-dom'
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const NuevoPassword = () => {
  const [tokenValido, setTokenValido] = useState(false); 
  const [passwordModificado, setPasswordModificado ] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState('');
  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
           await clienteAxios(`/veterinarios/olvide-password/${token}`)
           setAlerta({
             msj: 'coloca tu nueva contraseña'
           })
           setTokenValido(true);
      } catch (error) {
         setAlerta({
            msj: 'hubo un error con el enlace',
            error: true
         })
      }
    }
   comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
      e.preventDefault();

      if (password.length < 6 ) {
         setAlerta({
            msj: 'El Password debe ser mínimo de 6 caracteres',
            error: true
         })
         return;
      }
      
      try {
         const url = `/veterinarios/olvide-password/${token}`;
         const {data} = await clienteAxios.post(url, { password } )

         setAlerta({
            msj: data.msj
         })
         setPasswordModificado(true);

      } catch (error) {
         setAlerta({
            msj: error.response.data.msj,
            error: true
         })
      }
  }

  const { msj } = alerta;

  return (
      <>
            <div>
               <h1 className="text-indigo-600 font-black text-6xl pl-7">
                  Reestablece tu contraseña y no Pierdas Accesso a 
                  <span className="text-black"> tus Pacientes </span>
               </h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

                { msj && <Alerta
                    alerta={alerta} 
                /> }
               {tokenValido && (
               <>
                 <form onSubmit={handleSubmit}>
                    <div className="py-4"> 
                            <label className="uppercase text-gray-600 block text-xl font-bold">
                               Nueva Contraseña
                            </label>
                            <input 
                                type="password"
                                placeholder="Tu nueva contraseña"
                                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                value={password}
                                onChange={ e => setPassword(e.target.value) }
                             />
                     </div> 
  
                     <input 
                       type="submit"
                       value="Guardar nueva contraseña"
                       className="bg-indigo-700 w-full 
                       py-3 px-10 rounded-xl text-white uppercase 
                       font-bold mt-5 hover:cursor-pointer
                       hover:bg-indigo-800 md:w-auto"  
                     />
                 </form>

               </>
             )} 
             
               {passwordModificado && 
                  <Link
                    className="block text-center my-5 text-gray-500"
                    to="/"> Iniciar sesión</Link>
               }
          </div> 

      </> 
  )
};

export default NuevoPassword;
                  


