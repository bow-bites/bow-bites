import React from 'react';
import { Item, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Link, withRouter } from 'react-router-dom';
import { Favorites } from '../../api/favorite/Favorite';
import OperatingTime from './OperatingTime';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class VendorItem extends React.Component {
  like = () => {
    const data = this.props.vendor._id;
    const liked = [];
    const favorite = { favorite: data };
    liked.push(favorite);
    const user = Meteor.user().username;
    console.log('adding to favorites');
    if (Favorites.collection.find({ userId: user }).fetch()[0]) {
      console.log('User already has a collection');
      const userPro = Favorites.collection.find({ userId: user }).fetch()[0];
      if (userPro) {
        const userProId = userPro._id;
        const newArr = [];
        userPro.liked.forEach(element => newArr.push(element.favorite));
        if (newArr.includes(data)) {
          console.log('Vendor already exists in favorites');
        } else {
          console.log('it does not exist updating collection');
          Favorites.collection.update({ _id: userProId }, { $push: { liked: favorite } });
        }
      }
    } else {
      const userId = user;
      Favorites.collection.insert({ userId, liked },
        (error) => {
          if (error) {
            console.log('Error', error.message, 'error');
          } else {
            console.log('Success', 'Vendor added successfully', 'success');
          }
        });
    }
  }

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
    let favVenTxt = `Favorite ${this.props.vendor.name}`;
    let favAdded = 'green';

    // Checks if the vendor has already been liked
    const dataCheck = this.props.vendor._id;
    const likedCheck = [];
    const favoriteCheck = { favorite: dataCheck };
    likedCheck.push(favoriteCheck);
    const userCheck = Meteor.user().username;
    if (Favorites.collection.find({ userId: userCheck }).fetch()[0]) {
      const userProCheck = Favorites.collection.find({ userId: userCheck }).fetch()[0];
      if (userProCheck) {
        const newArrCheck = [];
        userProCheck.liked.forEach(element => newArrCheck.push(element.favorite));
        if (newArrCheck.includes(dataCheck)) {
          console.log('Vendor already exists in favorites');
          favAdded = 'grey';
          favVenTxt = 'Added to Favorites';
        }
      }
    }

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
            <OperatingTime openTime ={this.props.vendor.open} openAP ={this.props.vendor.openAmOrPm} closeTime ={this.props.vendor.close} closeAP={this.props.vendor.closeAmOrPm}/>
          </Item.Description>
          <Item.Extra>
            <Button color={favAdded} id="listVendor-Favorite" onClick={this.like}> {favVenTxt} </Button>
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
VendorItem.propTypes = {
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
export default withRouter(VendorItem);
