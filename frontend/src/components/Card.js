import React from 'react';

export default class Card extends React.Component {

  handleClick = () => {
    this.props.onCardClick(this.props.card);
  }

  handleLikeClick = () => {
    this.props.onCardLike(this.props.card);
  }

  handleCardDelete = () => {
    this.props.onCardDelete(this.props.card);
  }
  
  render() {
    this.isOwn = this.props.card.owner._id === this.props.currentUser._id;
    this.cardDeleteButtonClassName = (
      `elements-grid__delete ${this.isOwn ? '' : 'elements-grid__delete_hidden'}`
    );

    this.isLiked = this.props.card.likes.some(i => i._id === this.props.currentUser._id);

    this.cardLikeButtonClassName = (
      `elements-grid__like ${this.isLiked ? 'elements-grid__like_active' : ''}`
    );

    return (
      <li className="elements-grid__item">
        <img className="elements-grid__image" src={this.props.card.link} alt={this.props.card.name} 
          onClick={this.handleClick}/>
        <button className={this.cardDeleteButtonClassName} onClick={this.handleCardDelete} type="button"></button>
        <div className="elements-grid__text-like-wrapper">
          <h2 className="elements-grid__place-name">{this.props.card.name}</h2>
          <div className="elements-grid__like-container">
            <button className={this.cardLikeButtonClassName} onClick={this.handleLikeClick} type="button"></button>
            <span className="elements-grid__like-counter">{this.props.card.likes.length}</span>
          </div>
        </div>
      </li>
    );
  }
}