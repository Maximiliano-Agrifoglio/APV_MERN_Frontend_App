import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";
const Authcontext = createContext();

const AuthProvider = ({children}) => {
    
    const [ auth, setAuth ] = useState({})
    
    useEffect(() => {
        const autenticarUsuario = async () => {
               const token = localStorage.getItem('token');
               if (!token) {
                
                return;
               }
               
              const config = {
                  headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                  }
              } 

             try {
                const {data} = await clienteAxios('/veterinarios/perfil', config);
                setAuth(data)
                
             } catch (error) {
                console.log(error.response.data.msj)
                setAuth({})
             } 
            
        }
        autenticarUsuario();
    }, []);
   
    const cerrarSesion = () => {
        localStorage.removeItem('token')
        setAuth({})
    }

    const actualizarPerfil = async (datos) => {
        const token = localStorage.getItem('token');
        if (!token) {
         
         return;
        }
        
       const config = {
           headers:{
             "Content-Type": "application/json",
             Authorization: `Bearer ${token}`
           }
       }
       
       try {
             const url = `/veterinarios/perfil/${datos._id}`
             const {data} = await clienteAxios.put(url, datos, config)
             return{
                msj: 'Almacenado Correctamente'
             }  
             
       } catch (error) {
           return {
              msj: error.response.data.msj,
              error: true 
           }
       }
    }

    const guardarPassword = async (datos) => {
        const token = localStorage.getItem('token');
        if (!token) {
         
         return;
        }
        
       const config = {
           headers:{
             "Content-Type": "application/json",
             Authorization: `Bearer ${token}`
           }
       }

       try {
           const url = '/veterinarios/actualizar-password'
           const {data} = await clienteAxios.put(url, datos, config)
           return {
               msj: data.msj
           }
       } catch (error) {
           return {
               msj: error.response.data.msj,
               error: true
           }
       }
    }

    return(

        <Authcontext.Provider
            value={{
                auth,
                setAuth,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}
        >
              {children}
        </Authcontext.Provider>
    )
}

export {
    AuthProvider
}

export default Authcontext;
                


        
            


