import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap-webpack';
import AV from 'avoscloud-sdk';

/* global styles for app */
import 'style!./styles/app.scss';

/* application components */
import { Notifs } from 're-notif';
import { Header } from '../Header';
import { Footer } from 'components/Footer';

@connect()
export class App extends Component {
  static propTypes = {
    children: React.PropTypes.any,
  }

  componentWillMount() {
    let user = AV.User.current();
    if (user) {
      this.props.dispatch({
        type: 'LOGIN_FULFILLED',
        payload: user
      });
    }
  }

  render() {
    return (
      <section>
        <Header />
        {this.props.children}
        <Footer />
        <Notifs />
      </section>
    );
  }
}
