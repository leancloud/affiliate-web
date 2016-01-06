import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClipboardButton from 'react-clipboard.js';

import { Section } from 'components/Section';
/* component styles */
import { styles } from './styles.scss';

@connect(
  status => ({
    user: status.user,
    account: status.account,
  }),
)
export class PromoteLink extends Component {
  constructor () {
    super();
    this.state = {};
  }
  render () {
    const {
      user,
      account,
    } = this.props;
    let buttonState;
    let buttonText;
    switch (this.state.copied) {
      case 0:
        buttonState = 'success';
        buttonText = '✓ 已复制'
        break;
      case 1:
        buttonState = 'secondary';
        buttonText = /Mac/i.test(navigator.userAgent)
          ? '按 ⌘-C 复制'
          : '按 Ctrl-C 复制'
        break;
      default:
        buttonState = 'secondary';
        buttonText = '复制';
    }
    const link = `https://leancloud.cn/?source=${user.promoteCode}`;
    return (
      <Section title="推荐链接">
        <form className={`${styles} pure-form clearfix`}>
          您的推荐链接是：
          <input type="url"
                 readOnly
                 value={link}
                 id='link'
                 ref={ref => this.linkInput = ref}
                 onMouseOver={this.select}/>
          <ClipboardButton data-clipboard-text={link}
                     onSuccess={this.onCopySuccess}
                     onError={this.onCopyError}
                     className={`button-${buttonState} pure-button`}>
            {buttonText}
          </ClipboardButton>
        </form>
      </Section>
    );
  }

  select = () => {
    this.linkInput.select();
  }

  onCopySuccess = (e) => {
    clearTimeout(this.timeout);
    this.setState({
      copied: 0
    });
    this.timeout = setTimeout(() => {
      this.setState({
        copied: undefined
      });
    }, 5000);
  }

  onCopyError = (e) => {
    this.select();
    this.setState({
      copied: 1
    });
  }

};
