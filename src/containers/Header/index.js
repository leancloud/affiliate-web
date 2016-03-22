/* eslint react/prop-types:0 */
import React, { Component } from 'react';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import listensToClickOutside from 'react-onclickoutside/decorator';

import * as headerActionCreators from 'actions/header';

import { styles } from './styles.scss';

@connect(
  state => ({
    user: state.user,
    header: state.header,
  }),
  dispatch => bindActionCreators({ ...headerActionCreators }, dispatch)
)
export class Header extends Component {
  render() {
    const { user, header } = this.props;
    let userInfo;

    if (!user.isAuthenticated) {
      userInfo = (
        <nav>
          <Link to="/login" activeClassName="active">登录</Link>
          <Link to="/signup" activeClassName="active">注册</Link>
        </nav>
      );
    } else {
      userInfo = (
        <div className="item username" onClick={this.props.toggleMenu}>
          {user.username}
          <span className={classNames('toggle-arrow', { open: header.menuOnshow })}></span>
        </div>
      );
      if (header.menuOnshow) {
        userInfo = (
          <Dropdown onClickOutside={this.props.hideMenu}>
            <div className="userinfo">
              {userInfo}
              <nav>
                <Link to="/account">账户</Link>
                <Link to="/settings">设置</Link>
                <Link to="/logout">注销</Link>
              </nav>
            </div>
          </Dropdown>
        );
      }
    }

    return (
      <header className={`${styles}`}>
        <div className="container">
          <div className="logo font-logo">
            <Link to="/">
              <span className="primary">LeanCloud</span>{' '}
              <span className="secondery">Affiliate</span>
            </Link>
          </div>
          <div className="flex"></div>
          {userInfo}
        </div>
      </header>
    );
  }
}

@listensToClickOutside()
class Dropdown extends Component {
  handleClickOutside(event) {
    return this.props.onClickOutside(event);
  }
  render() {
    return this.props.children;
  }
}
