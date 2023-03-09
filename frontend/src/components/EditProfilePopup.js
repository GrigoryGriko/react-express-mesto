import PopupWithForm from './PopupWithForm.js';
import React, { useState } from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  React.useEffect(() => {
    if (currentUser.name && currentUser.about) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser], [props.isOpen]);

  
  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateUser({
      name,
      about: description,
    });
  } 

  return (
    <PopupWithForm 
      title="Редактировать профиль" 
      name="edit_data" 
      isOpen={props.isOpen} 
      textSubmit="Сохранить" 
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      
        <>
          <label className="popup__field">
            <input 
              className="popup__name-input input-general-properties" 
              id="nameInput" 
              value={name} 
              onChange={handleChangeName} 
              name="your-name" 
              placeholder="Ваше имя" 
              type="text" 
              minLength="2" 
              maxLength="40" 
              required 
            />

            <span className="popup__input-error nameInput-error">
              Ошибка валидации имени
            </span>
          </label>

          <label className="popup__field">
            <input 
              className="popup__job-input input-general-properties" 
              id="jobInput" 
              value={description} 
              onChange={handleChangeDescription} 
              name="your-job" 
              placeholder="Ваш род деятельности" 
              type="text" 
              minLength="2" 
              maxLength="200" 
              required 
            />

            <span className="popup__input-error jobInput-error">
              Ошибка валидации рода деятельности
            </span>
          </label>
        </>

    </PopupWithForm>
  )
}

export default EditProfilePopup;