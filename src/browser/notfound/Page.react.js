import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Page} from 'react-onsenui';
import Header from '../app/Header.react';

class NotFound extends Component {

  static propTypes = {
    msg: PropTypes.object,
    navigator: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.renderToolbar = this.renderToolbar.bind(this);
  }

  renderToolbar() {
    return  (
      <Header
        back
        modifier="tertiary"
        navigator={this.props.navigator}
        title="Not Found"
      />
    );
  }

  render() {
    const {msg} = this.props;

    return (
      <Page
        className="notfound-page"
        renderToolbar={this.renderToolbar}
      >
        <Helmet title={msg.title} />
        <h1>{msg.header}</h1>
        <p>{msg.message}</p>
      </Page>
    );
  }

}

export default connect(state => ({
  msg: state.intl.msg.notFound
}))(NotFound);
