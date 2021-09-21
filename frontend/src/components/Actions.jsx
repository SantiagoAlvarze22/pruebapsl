import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
// import DatePicker from 'react-datepicker';
import DateTimePicker from 'react-datetime-picker';
import { useParams, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useUser } from '../context/UserContext';

const now = moment().hour(12).minute(0).second(0);
// const dateValue: Date = new Date();

export const Actions = () => {
  const { user } = useUser();
  const { idnote } = useParams();
  const history = useHistory();
  const options = { headers: { authorization: 'Bearer ' + user.token } };
  const initialState = {
    title: '',
    description: '',
    priority: 'Low',
    date: now.toDate(),
    user: user.id,
  };

  const [noteState, setNoteState] = useState({ initialState });
  const optionsPriority = ['Low', 'Medium', 'High'];

  //verificar si el id de a nota del usuario llegó
  useEffect(() => {
    const getNoteById = async () => {
      try {
        const { data } = await axios.get('/note/' + idnote, options);
        setNoteState({ ...data.note, date: new Date(data.note.date) });
      } catch (error) {
        if (!error.response.data.ok) {
          return Swal.fire({
            icon: 'error',
            title: error.response.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
        console.log('Error getNoteByID', error.message);
      }
    };
    idnote ? getNoteById() : setNoteState(initialState);
    // eslint-disable-next-line
  }, [idnote]);

  const saveNote = async (newNote) => {
    try {
      const { data } = await axios.post('/note/addNote', newNote, options);
      Swal.fire({
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      history.push('/notes');
    } catch (error) {
      if (!error.response.data.ok) {
        return Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log('Error saveNote', error.message);
    }
  };

  //funcion se ejecuta cuando el formulario se ejecuta
  const actions = (e) => {
    e.preventDefault();
    idnote ? updateNote(noteState) : saveNote(noteState);
  };

  const updateNote = async (newNote) => {
    try {
      const { data } = await axios.put(
        '/note/update/' + idnote,
        newNote,
        options
      );
      history.push('/notes');
    } catch (error) {
      if (!error.response.data.ok) {
        return Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log('Error updateNote', error.message);
    }
  };

  const onChangeDate = (date) => {
    setNoteState({ ...noteState, date });
  };

  return (
    <div className='row mt-5'>
      <div className='col-md-8 mx-auto'>
        <div className='card'>
          {idnote ? (
            <div className='card-header'>
              <h4 className='card-title'>Edit Note</h4>
            </div>
          ) : (
            <div className='card-header'>
              <div className='card-title'>Add Note</div>
            </div>
          )}
          <div className='card-body'>
            <form onSubmit={actions}>
              <div className='mb-3'>
                <input
                  anme='title'
                  type='text'
                  className='form-control'
                  placeholder='Title'
                  required
                  autoFocus
                  onChange={(e) =>
                    setNoteState({ ...noteState, title: e.target.value })
                  }
                  value={noteState.title}
                />
              </div>
              <div className='mb-3'>
                <textarea
                  name='description'
                  className='form-control'
                  placeholder='Description'
                  required
                  onChange={(e) =>
                    setNoteState({ ...noteState, description: e.target.value })
                  }
                  value={noteState.description}
                ></textarea>
              </div>
              <div className='mb-3'>
                <select
                  name='optionsPriority'
                  className='form-control'
                  onChange={(e) =>
                    setNoteState({ ...noteState, priority: e.target.value })
                  }
                  value={noteState.priority}
                >
                  {optionsPriority.map((priority) => {
                    return <option key={priority}>{priority}</option>;
                  })}
                </select>
              </div>
              <div className='mb-3'>
                <DateTimePicker
                  className='form-control'
                  value={noteState.date}
                  onChange={onChangeDate}
                />
              </div>
              {idnote ? (
                <div className='mb-3'>
                  <button
                    type='submit'
                    className='btn btn-warning form-control'
                  >
                    Edit
                  </button>
                </div>
              ) : (
                <button type='submit' className='btn btn-primary form-control'>
                  Save
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
