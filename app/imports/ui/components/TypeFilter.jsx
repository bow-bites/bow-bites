import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const tagOptionsOld = [
  {
    key: 'Vegetarian',
    text: 'Vegetarian',
    value: 'Vegetarian',
    label: { color: 'red', empty: true, circular: true },
  },
  {
    key: 'Italian',
    text: 'Italian',
    value: 'Italian',
    label: { color: 'teal', empty: true, circular: true },
  },
  {
    key: 'French',
    text: 'French',
    value: 'French',
    label: { color: 'black', empty: true, circular: true },
  },
  {
    key: 'Chinese',
    text: 'Chinese',
    value: 'Chinese',
    label: { color: 'purple', empty: true, circular: true },
  },
  {
    key: 'Japanese',
    text: 'Japanese',
    value: 'Japanese',
    label: { color: 'orange', empty: true, circular: true },
  },
  {
    key: 'Vietnamese',
    text: 'Vietnamese',
    value: 'Vietnamese',
    label: { empty: true, circular: true },
  },
  {
    key: 'Fast',
    text: 'Fast',
    value: 'Fast',
    label: { color: 'yellow', empty: true, circular: true },
  },
  {
    key: 'Mexican',
    text: 'Mexican',
    value: 'Mexican',
    label: { color: 'pink', empty: true, circular: true },
  },
  {
    key: 'American',
    text: 'American',
    value: 'American',
    label: { color: 'brown', empty: true, circular: true },
  },
  {
    key: 'Indian',
    text: 'Indian',
    value: 'Indian',
    label: { color: 'green', empty: true, circular: true },
  },
  {
    key: 'Korean',
    text: 'Korean',
    value: 'Korean',
    label: { color: 'blue', empty: true, circular: true },
  },
  {
    key: 'Hawaiian',
    text: 'Hawaiian',
    value: 'Hawaiian',
    label: { color: 'olive', empty: true, circular: true },
  },
  {
    key: 'Filipino',
    text: 'Filipino',
    value: 'Filipino',
    label: { color: 'violet', empty: true, circular: true },
  },
];

const tagOptions = [
  { key: 'Vegetarian', text: 'Vegetarian', value: 'Vegetarian' },
  { key: 'Italian', text: 'Italian', value: 'Italian' },
  { key: 'French', text: 'French', value: 'French' },
  { key: 'Chinese', text: 'Chinese', value: 'Chinese' },
  { key: 'Japanese', text: 'Japanese', value: 'Japanese' },
  { key: 'Vietnamese', text: 'Vietnamese', value: 'Vietnamese' },
  { key: 'Fast', text: 'Fast', value: 'Fast' },
  { key: 'Mexican', text: 'Mexican', value: 'Mexican' },
  { key: 'American', text: 'American', value: 'American' },
  { key: 'Indian', text: 'Indian', value: 'Indian' },
  { key: 'Korean', text: 'Korean', value: 'Korean' },
  { key: 'Hawaiian', text: 'Hawaiian', value: 'Hawaiian' },
  { key: 'Filipino', text: 'Filipino', value: 'Filipino' },
];

export class TypeFilter extends React.Component {

  constructor() {
    super();

    this.state = {
      filtered: [],
    };
  }

  birdUp = (event, { value }) => {
    // console.log(value);
    const fType = value;
    // const bird_name = event.target.textContent;
    // console.log(bird_name);
    // console.log('It got called');
    this.setState({
      filtered: fType }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    });
  }

  renderLabel = (label) => ({
    color: label.label.color,
    content: `${label.text}`,
    icon: 'check',
  })

  render() {
    return (
      <Dropdown
        placeholder='Types'
        fluid multiple selection options={tagOptionsOld}
        renderLabel={this.renderLabel}
        onChange={this.birdUp}
      />
    );
  }
}

TypeFilter.propTypes = {
  sendData: PropTypes.array,
  onChange: PropTypes.func,
};

export default withRouter(TypeFilter);
