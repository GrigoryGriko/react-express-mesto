import PopupWithForm from './PopupWithForm.js';
import React from 'react';


function EditAvatarPopup(props) {
  const refImageUrl = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: refImageUrl.current.value,
    });
  } 

  React.useEffect(() => {
    if (props.isOpen) {
      refImageUrl.current.value = '';
    }
  }, [props.isOpen]);

  return (
    <PopupWithForm 
      title="Обновить аватар" 
      name="update_avatar" 
      isOpen={props.isOpen} 
      textSubmit="Сохранить" 
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children={
        <label className="popup__field">
          <input
            ref={refImageUrl} 
            className="popup__name-input input-general-properties" 
            id="linkAvatarInput" 
            name="avatar-link" 
            placeholder="Ссылка на аватар" 
            type="url" 
            defaultValue="" 
            required 
          />

          <span className="popup__input-error linkAvatarInput-error">
            Ошибка валидации ссылки на аватар
          </span>
        </label>
      }
    />
  )
}

export default EditAvatarPopup;