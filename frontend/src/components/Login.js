import React from 'react';
import { withRouter } from 'react-router-dom';
import * as auth from '../utils/auth.js';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      email: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
    
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.password || !this.state.email) {
      return;
    }
    auth.authorize(this.state.password, this.state.email)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);

        this.setState({email: '', password: ''}, () => {
          this.props.handleLogin();
          this.props.history.push('/');
        })
      }
    })
    .catch(() => {
      this.props.onFinal({ message: 'Что-то пошло не так! Попробуйте ещё раз.', isError: true });
    });
  }

  render() {
    return (
      <main className="auth">
        <form 
          className="auth__form"
          onSubmit={this.handleSubmit}
        >
          <h2 className="auth__header">Вход</h2>

          <input
            name="email"
            className="auth__input-email general-input-auth"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
          >

          </input>

          <input
            name="password"
            className="auth__input-password general-input-auth"
            placeholder="Пароль"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          >

          </input>

          <button className="auth__button-submit">Войти</button>
        </form>
      </main>
    )
  }
}
export default withRouter(Login);