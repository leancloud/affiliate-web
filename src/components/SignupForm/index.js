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
      <form className={styles} onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            required
            className="form-control"
            placeholder="邮箱"
            tabIndex="1"
            {...email}
            />
          <input
            type="text"
            required
            className="form-control"
            placeholder="用户名"
            tabIndex="2"
            {...username}
            />
          <input
            type="password"
            required
            className="form-control"
            placeholder="密码"
            tabIndex="3"
            {...password}
            />
        </div>
        <div className="form-group">
          <button className="btn btn-default" type="submit" tabIndex="4">
            注册
          </button>
        </div>
      </form>
    );
  }
}
