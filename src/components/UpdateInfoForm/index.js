import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

/* component styles */
import { styles } from './styles.scss';

@reduxForm({
  form: 'update-info',
  fields: ['realName', 'IDNumber'],
})
export class UpdateInfoForm extends Component {

  static propTypes = {
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    user: React.PropTypes.object,
  };

  render() {
    const {
      fields: { realName, IDNumber },
      handleSubmit,
      user,
    } = this.props;

    return (
      <form className={`${styles} pure-form`} onSubmit={handleSubmit}>
        <label htmlFor="real-name">姓名</label>
        <input
          id="real-name"
          type="text"
          placeholder={user.maskedRealName}
          tabIndex="4"
          {...realName}
        />
      <label htmlFor="ID-Number">身份证号码</label>
        <input
          id="ID-Number"
          type="text"
          placeholder={user.maskedIDNumber}
          pattern="(^\d{15}$)|(^\d{17}([0-9]|X)$)"
          tabIndex="5"
          {...IDNumber}
        />
      <button className="pure-button button-primary" type="submit" tabIndex="6">
          更新
        </button>
      </form>
    );
  }
}
