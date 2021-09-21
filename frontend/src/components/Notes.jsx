import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import { useUser } from '../context/UserContext';
import { Loading } from './Loading';
import moment from 'moment';
import { Link } from 'react-router-dom';

export const Notes = () => {
  const { user } = useUser();
  const options = { headers: { Authorization: 'Bearer ' + user.token } };
  const [notes, setNotes] = useState([]);
  const history = useHistory();
  const [hashNotes, setHasNotes] = useState(false);
  const [loading, setLoading] = useState(false);

  const getUserNotes = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/note/user', options);
      setLoading(false);
      //viene del note.controller
      if (data.userNotes.length > 0) {
        setNotes(data.userNotes);
        setHasNotes(false);
      } else {
        setNotes([]);
        setHasNotes(true);
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
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getUserNotes();
  }, [getUserNotes]);

  const deleteNote = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete('/note/delete/' + id, options);
      setLoading(false);
      getUserNotes();
      Swal.fire({
        icon: 'Success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
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
      console.log('error deleteNote', error.message);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : hashNotes ? (
        <div className='container mt-5 text-center'>
          <Link className='btn btn-primary' to='/actions'>
            You don't have notes, Create a note
          </Link>
        </div>
      ) : (
        <div className='container mt-5'>
          <div className='row '>
            {notes.map((note) => {
              return (
                <div className='col-md-4 mt-5' key={note._id}>
                  <div className='card'>
                    <div className='card-header'>
                      <strong>{note.title}</strong>
                    </div>
                    <div className='card-body'>
                      <strong>Description</strong>
                      <p className='lead'>{note.description}</p>
                      <strong>Priority</strong>
                      <p>{note.priority}</p>
                      <strong>Date</strong>
                      <p>{moment(note.date, 'YYYYMMDD').fromNow()}</p>
                      <p>{moment(note.date).format('MMMM Do YYYY h:mm a')}</p>
                    </div>
                    <div className='card-footer d-flex justify-content-around'>
                      <i
                        className='btn btn-danger fa fa-trash'
                        onClick={() => deleteNote(note._id)}
                      ></i>
                      <i
                        className='btn btn-warning fa fa-edit'
                        onClick={() => history.push('/actions/' + note._id)}
                      ></i>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
