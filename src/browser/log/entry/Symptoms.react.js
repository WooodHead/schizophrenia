import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {
  Button,
  Fab,
  Icon,
  Input,
  List,
  ListHeader,
  ListItem,
  Page,
} from 'react-onsenui';
import Nominal from './Nominal.react';
import {route} from '../../routes';

const SYMPTOMS = [
  'Angry',
  'Hearing Voices',
  'Suicidal Thoughts',
];

export default class Symptoms extends Component {

  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(item) {
    const inputId = `input-${item}`;
    return (
      <ListItem
        key={item}
        modifier="longdivider"
        tappable
      >
        <label className="left">
          <Input
            inputId={inputId}
            type="checkbox"
          />
          {item}
          <Nominal
            value={0}
          />
        </label>
      </ListItem>
    );
  }

  renderHeader() {
    return (
      <ListHeader>
        <Input
          modifier="underbar"
          placeholder="Add a Symptom"
        />
      </ListHeader>
    );
  }

  render() {
    return (
      <Page
        className="symptoms"
      >
        <List
          dataSource={SYMPTOMS}
          renderRow={this.renderRow}
          renderHeader={this.renderHeader}
        />
      </Page>
    );
  }

}
