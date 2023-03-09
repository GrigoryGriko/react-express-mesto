function ImagePopup(props) {
  return (
    <div className={`popup popup_background_black popup_show_image ${(Object.keys(props.card).length !== 0) ? 'popup_opened' : ''}`}>
      <div className="popup__wrapper">
        <img className="popup__full-image" src={`${props.card  ? props.card.link : ''}`} alt={`${props.card ? props.card.name : ''}`}/>
        <button className="popup__button-close" type="button" onClick={props.onClose}></button>

        <blockquote className="popup__caption">{`${props.card  ? props.card.name : ''}`}</blockquote>
      </div>
    </div>
  )
}


export default ImagePopup;