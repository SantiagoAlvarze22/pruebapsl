import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Loading } from './Loading';

export const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('santi@gmail.com');
  const [password, setPassword] = useState('123');
  const { loading, loginUser } = useUser();

  const login = (e) => {
    e.preventDefault();
    const user = { email, password };
    loginUser(user, history);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className='row mt-5'>
          <div className='col-lg-6 col-md-8 mx-auto'>
            <div className='card'>
              <div className='container text-center'>
                <i className='fa fa-user fa-5x'></i>
              </div>
              <div className='card-header text-center'>
                <h3 className='card-title'>Login</h3>
                <div className='card-body'>
                  <form onSubmit={login}>
                    <div className='mb-3'>
                      <input
                        type='email'
                        className='form-control'
                        placeholder='Email'
                        required
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </div>
                    <div className='mb-3'>
                      <input
                        type='password'
                        className='form-control'
                        placeholder='Password'
                        required
                        autoFocus
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </div>
                    <div className='mb-3'>
                      <button
                        className='btn btn-primary form-control'
                        type='submit'
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
