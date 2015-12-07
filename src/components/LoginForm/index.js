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
      <form className={styles} onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="用户名"
            {...username}
            />
          <input
            type="password"
            className="form-control"
            placeholder="密码"
            {...password}
            />
        </div>
        <div className="form-group">
          <button className="btn btn-default" onClick={handleSubmit}>
            登录
          </button>
        </div>
      </form>
    );
  }
}
