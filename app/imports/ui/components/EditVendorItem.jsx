import React from 'react';
import { Item, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import OperatingTime from './OperatingTime';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class EditVendorItem extends React.Component {
  render() {
    const itemPadding = { padding: '50px' };
    const vendorImage = { height: '100px' };
    const colorOptions = [
      {
        key: 'Vegetarian',
        text: 'Vegetarian',
        value: 'Vegetarian',
        color: 'green',
      },
      {
        key: 'Italian',
        text: 'Italian',
        value: 'Italian',
        color: 'teal',
      },
      {
        key: 'French',
        text: 'French',
        value: 'French',
        color: 'black',
      },
      {
        key: 'Chinese',
        text: 'Chinese',
        value: 'Chinese',
        color: 'purple',
      },
      {
        key: 'Japanese',
        text: 'Japanese',
        value: 'Japanese',
        color: 'orange',
      },
      {
        key: 'Vietnamese',
        text: 'Vietnamese',
        value: 'Vietnamese',
      },
      {
        key: 'Fast',
        text: 'Fast',
        value: 'Fast',
        color: 'yellow',
      },
      {
        key: 'Mexican',
        text: 'Mexican',
        value: 'Mexican',
        color: 'pink',
      },
      {
        key: 'American',
        text: 'American',
        value: 'American',
        color: 'brown',
      },
      {
        key: 'Indian',
        text: 'Indian',
        value: 'Indian',
        color: 'red',
      },
      {
        key: 'Korean',
        text: 'Korean',
        value: 'Korean',
        color: 'blue',
      },
      {
        key: 'Hawaiian',
        text: 'Hawaiian',
        value: 'Hawaiian',
        color: 'olive',
      },
      {
        key: 'Filipino',
        text: 'Filipino',
        value: 'Filipino',
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
      <Item style = {itemPadding}>
        <Item.Image label={{
          color: tagColor,
          content: `${this.props.vendor.foodType} Food`,
          icon: 'food',
          ribbon: true,
        }} style = {vendorImage} src={this.props.vendor.storeImage}/>
        <Item.Content verticalAlign="middle">
          <Item.Header as="h1" id='listVendor-Name'>{this.props.vendor.name}</Item.Header>
          <Item.Meta>{this.props.vendor.location}</Item.Meta>
          <Item.Description>
            {this.props.vendor.description}
          </Item.Description>
          <Item.Description>
            <OperatingTime vendor = {this.props.vendor}/>
          </Item.Description>
          <Item.Extra>
            <Button as={Link} to={`/edit/${this.props.vendor._id}`} > Edit My Vendor </Button>
          </Item.Extra>
          <Button as={Link} to={`/VendorProfile/${this.props.vendor._id}`} primary floated='right'>
                    View menu
            <Icon name='right arrow' />
          </Button>
        </Item.Content>
      </Item>
    );
  }
}

// Require a document to be passed to this component.
EditVendorItem.propTypes = {
  vendor: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
    description: PropTypes.string,
    storeImage: PropTypes.string,
    foodType: PropTypes.string,
    open: PropTypes.number,
    close: PropTypes.number,
    openAmOrPm: PropTypes.string,
    closeAmOrPm: PropTypes.string,
    menuItem: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
    })),
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(EditVendorItem);
