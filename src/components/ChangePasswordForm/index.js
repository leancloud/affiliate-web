import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

/* component styles */
import { styles } from './styles.scss';

@reduxForm({
  form: 'change-password',
  fields: ['newPassword', 'password'],
})
export class ChangePasswordForm extends Component {

  static propTypes = {
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
  };

  render() {
    const {
      fields: { password, newPassword },
      handleSubmit,
    } = this.props;

    return (
      <form className={`${styles} pure-form`} onSubmit={handleSubmit}>
        <input
          type="password"
          required
          placeholder="当前密码"
          tabIndex="1"
          {...password}
        />
        <input
          type="password"
          required
          placeholder="新密码"
          tabIndex="2"
          {...newPassword}
        />
      <button className="pure-button button-primary" type="submit" tabIndex="3">
          修改
        </button>
      </form>
    );
  }
}
