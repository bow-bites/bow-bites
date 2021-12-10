import React from 'react';
import { Item } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ImageTagColor extends React.Component {
  render() {
    const vendorImage = { height: '100px' };
    const colorOptions = [
      {
        key: 'Vegetarian',
        color: 'green',
      },
      {
        key: 'Italian',
        color: 'teal',
      },
      {
        key: 'French',
        color: 'black',
      },
      {
        key: 'Chinese',
        color: 'purple',
      },
      {
        key: 'Japanese',
        color: 'orange',
      },
      {
        key: 'Vietnamese',
        value: 'Vietnamese',
      },
      {
        key: 'Fast',
        color: 'yellow',
      },
      {
        key: 'Mexican',
        color: 'pink',
      },
      {
        key: 'American',
        color: 'brown',
      },
      {
        key: 'Indian',
        color: 'red',
      },
      {
        key: 'Korean',
        color: 'blue',
      },
      {
        key: 'Hawaiian',
        color: 'olive',
      },
      {
        key: 'Filipino',
        color: 'violet',
      },
    ];
    const vendorFoodType = this.props.vendor.foodType;
    const tagColor = colorOptions.find(
      function (type) {
        return type.key === vendorFoodType;
      },
    ).color;
    return (
      <Item.Image label={{
        color: tagColor,
        content: `${this.props.vendor.foodType} Food`,
        icon: 'food',
        ribbon: true,
      }} style = {vendorImage} src={this.props.vendor.storeImage}/>
    );
  }
}

// Require a document to be passed to this component.
ImageTagColor.propTypes = {
  vendor: PropTypes.shape({
    storeImage: PropTypes.string,
    foodType: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ImageTagColor);
