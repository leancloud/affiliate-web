import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

/* component styles */
import styles from './styles';

@reduxForm({
  form: 'signup',
  fields: ['username', 'password', 'email'],
})
export class SignupForm extends Component {

  static propTypes = {
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
  }

  render() {
    const {
      fields: {username, password, email},
      handleSubmit,
    } = this.props;

    return (
      <form className={`${styles} pure-form`} onSubmit={handleSubmit}>
        <input
          type="email"
          required
          placeholder="邮箱"
          tabIndex="1"
          {...email}
          />
        <input
          type="text"
          required
          placeholder="用户名"
          tabIndex="2"
          {...username}
          />
        <input
          type="password"
          required
          placeholder="密码"
          tabIndex="3"
          {...password}
          />
        <button className="pure-button button-primary" type="submit" tabIndex="4">
          注册
        </button>
      </form>
    );
  }
}
