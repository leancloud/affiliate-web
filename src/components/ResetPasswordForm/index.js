import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

/* component styles */
import { styles } from './styles.scss';

@reduxForm({
  form: 'reset-password',
  fields: ['email'],
})
export class ResetPasswordForm extends Component {

  static propTypes = {
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
  };

  render() {
    const {
      fields: { email },
      handleSubmit,
    } = this.props;

    return (
      <form className={`${styles} pure-form`} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="邮箱"
          tabIndex="1"
          required
          {...email}
        />
        <button className="pure-button button-primary" type="submit" tabIndex="2">
          发送密码重设邮件
        </button>
      </form>
    );
  }
}
