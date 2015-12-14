import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

/* component styles */
import styles from './styles';

@reduxForm({
  form: 'login',
  fields: ['username', 'password'],
})
export class LoginForm extends Component {

  static propTypes = {
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
  }

  render() {
    const {
      fields: {username, password},
      handleSubmit,
    } = this.props;

    return (
      <form className={`${styles} pure-form`} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="用户名/邮箱"
          tabIndex="1"
          required
          {...username}
          />
        <input
          type="password"
          placeholder="密码"
          tabIndex="2"
          required
          {...password}
          />
        <button className="pure-button pure-button-primary" type="submit" tabIndex="3">
          登录
        </button>
      </form>
    );
  }
}
