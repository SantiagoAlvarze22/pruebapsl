import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useUser } from '../context/UserContext';
import { Loading } from './Loading';

export const Register = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { loading, registerUser } = useUser();

  const register = (e) => {
    e.preventDefault();
    registerUser(userData, history);
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
                <h3 className='card-title'>Sign In</h3>
                <div className='card-body'>
                  <form onSubmit={register}>
                    <div className='mb-3'>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Name'
                        required
                        autoFocus
                        onChange={(e) =>
                          setUserData({ ...userData, name: e.target.value })
                        }
                        value={userData.name}
                      />
                    </div>
                    <div className='mb-3'>
                      <input
                        type='email'
                        className='form-control'
                        placeholder='Email'
                        required
                        onChange={(e) =>
                          setUserData({ ...userData, email: e.target.value })
                        }
                        value={userData.email}
                      />
                    </div>
                    <div className='mb-3'>
                      <input
                        type='password'
                        className='form-control'
                        placeholder='Password'
                        required
                        autoFocus
                        onChange={(e) =>
                          setUserData({ ...userData, password: e.target.value })
                        }
                        value={userData.password}
                      />
                    </div>
                    <div className='mb-3'>
                      <button
                        className='btn btn-primary form-control'
                        type='submit'
                      >
                        Save / Register
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
