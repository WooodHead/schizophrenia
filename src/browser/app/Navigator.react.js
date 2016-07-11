import './App.scss';

import React, {Component, PropTypes} from 'react';
import {ui as uiActions} from '../../common/ui/actions';
import {connect} from 'react-redux';
import {
  Navigator as OnsNav,
  Splitter,
  SplitterContent,
  SplitterSide
} from 'react-onsenui';
import {route} from '../routes';
import NotFound from '../notfound/Page.react';
import Menu from './Menu.react';

export class Navigator extends Component {

  static propTypes = {
    closeDrawer: PropTypes.func.isRequired,
    setRoute: PropTypes.func.isRequired,
    setDrawerEnabled: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onMenuItemClick = this.onMenuItemClick.bind(this);
    this.onDrawerOpen = this.onDrawerOpen.bind(this);
    this.onDrawerClose = this.onDrawerClose.bind(this);
    this.renderPage = this.renderPage.bind(this);
    this.onNavChange = this.onNavChange.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  componentDidMount() {
    document.addEventListener(
      'backbutton',
      this.handleBackButton,
      false
    );
  }

  componentWillUnmount() {
    document.removeEventListener(
      'backbutton',
      this.handleBackButton,
      false
    );
  }

  // TODO Get this handling back button events
  handleBackButton(e) {
    e.preventDefault();
    e.stopPropagation();
    const {navigator} = this.state;
    if (navigator.pages.length > 1) {
      navigator.popPage();
    }
  }

  renderPage(route, navigator) {
    this.setState({navigator});
    // Fallback to the not found page just in case
    const RouteComponent = route.component || NotFound;
    return (
      <RouteComponent
        navigator={navigator}
        {...route}
      />
    );
  }

  onMenuItemClick(route) {
    const {
      closeDrawer,
      setRoute,
    } = this.props;
    const {navigator} = this.state;

    closeDrawer();
    setRoute(route.key);
    if (!route || !route.component) {
      navigator.pushPage(route);
    }
    else {
      navigator.resetPage(route);
    }
  }

  onDrawerOpen() {
    this.props.onDrawerChange(true);
  }

  onDrawerClose() {
    this.props.onDrawerChange(false);
  }

  onNavChange(route) {
    debugger
    const {setDrawerEnabled} = this.props;
    setDrawerEnabled(!route.disableDrawer);
  }

  render() {
    const {
      drawerEnabled,
      drawerOpen,
      currentRoute,
    } = this.props;

    return(
      <Splitter>
        <SplitterSide
          collapse
          isOpen={drawerOpen && drawerEnabled}
          isSwipeable={drawerEnabled}
          onClose={this.onDrawerClose}
          onOpen={this.onDrawerOpen}
          side="left"
          width={350}
        >
          <Menu
            currentRoute={currentRoute}
            onMenuItemClick={this.onMenuItemClick}
          />
        </SplitterSide>

        <SplitterContent>
          <OnsNav
            initialRoute={route(currentRoute)}
            onPostPop={this.onNavChange}
            onPostPush={this.onNavChange}
            renderPage={this.renderPage}
          />
        </SplitterContent>
      </Splitter>
    );
  }
}

Navigator = connect(state => ({
  currentRoute: state.ui.currentRoute,
  drawerEnabled: state.ui.drawerEnabled,
  drawerOpen: state.ui.drawerOpen
}), uiActions)(Navigator);

export default Navigator;