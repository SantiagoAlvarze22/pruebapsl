import axios from 'axios';
import React, { useEffect, useState, createContext, useContext } from 'react';
import Swal from 'sweetalert2';

const UserContext = createContext();

//estado inicial del usuario
const intialState = { login: false, token: '', name: '', id: '' };

//función del provider
export const UserProvider = (props) => {
  //crear estado del
  const [user, setUser] = useState(intialState);
  //estado que dice que está cargando el usuario, el spinner
  const [loading, setLoading] = useState(false);

  //useEffect para que se loggee automaticamente en el navegador sino ha cerrado sesion
  useEffect(() => {
    //si hay en el local storge  un usuario con la sesion iniciada
    const initial = JSON.parse(localStorage.getItem('user'));
    initial ? initial.login && setUser(initial) : setUser(intialState);
  }, []);

  //funcion para loggear al usuario, history para moverlo de ruta para que vea las notas
  //backend recibe los datos enviados por el frontEnd por el req.body
  const loginUser = async (user, history) => {
    try {
      setLoading(true);
      const { data } = await axios.post('/user/login', user);
      setLoading(false);
      if (data.ok) {
        const userLogin = {
          login: true,
          token: data.token,
          name: data.name,
          id: data._id,
        };
        //localstorage para dejar la sesion iniciado, guardando el objeto en el navegador
        localStorage.setItem('user', JSON.stringify(userLogin));

        setUser(userLogin);

        //mostrando mensaje de ingeso
        Swal.fire({
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        //moviendo al usuario de la ruta
        history.push('/notes');
      }
    } catch (error) {
      setLoading(false);

      if (!error.response.data.ok) {
        return Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log('error loginUser', error.message);
    }
  };

  //registrar usuario
  const registerUser = async (user, history) => {
    try {
      setLoading(true);
      const { data } = await axios.post('/user/register', user);
      setLoading(false);
      if (data.ok) {
        const userLogin = {
          login: true,
          token: data.token,
          name: data.name,
          id: data._id,
        };
        //localstorage para dejar la sesion iniciado, guardando el objeto en el navegador
        localStorage.setItem('user', JSON.stringify(userLogin));

        setUser(userLogin);

        //mostrando mensaje de ingeso
        Swal.fire({
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        //moviendo al usuario de la ruta
        history.push('/notes');
      }
    } catch (error) {
      setLoading(false);

      if (!error.response.data.ok) {
        return Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log('error loginUser', error.message);
    }
  };

  const exit = () => {
    setUser(intialState);
    localStorage.removeItem('user');
  };

  //lo que se va  a compartir globalmente
  const value = {
    user,
    loginUser,
    registerUser,
    exit,
    loading,
  };

  //retornar provider
  return <UserContext.Provider value={value} {...props} />;
};

//usando el context
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser Error');
  }
  return context;
}
