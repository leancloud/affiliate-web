import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import 'bootstrap-webpack';
import AV from 'avoscloud-sdk';

/* global styles for app */
import 'style!./styles/app.scss';

/* application components */
import { Notifs } from 're-notif';
import { Header } from '../Header';
import { Footer } from 'components/Footer';
import * as userActionCreators from 'actions/user';

@connect(
  null,
  dispatch => bindActionCreators({...userActionCreators}, dispatch)
)
export class App extends Component {
  static propTypes = {
    children: React.PropTypes.any,
  }

  componentWillMount() {
    this.props.updateUser();
  }

  render() {
    return (
      <section className='wrapper'>
        <Header />
        <div className="main">
          {this.props.children}
        </div>
        <Footer />
        <Notifs />
      </section>
    );
  }
}
