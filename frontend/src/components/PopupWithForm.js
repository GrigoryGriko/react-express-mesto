function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <form 
        className="popup__container" 
        name={`form-${props.name}`} 
        onSubmit={props.onSubmit} 
        action="/" 
        method="post" 
        noValidate
      >
        <button className="popup__button-close" type="button" onClick={props.onClose}></button>

        <div className="popup__content">
          <h2 className="popup__header">{props.title}</h2>

          {props.children}
          
          <button className="popup__button-save" id="button-save-data" type="submit">{props.textSubmit}</button>
        </div>
      </form>
    </div>
  )
}

export default PopupWithForm;