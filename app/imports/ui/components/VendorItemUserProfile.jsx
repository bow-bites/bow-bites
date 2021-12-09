import React from 'react';
import { Container, Item, Button } from 'semantic-ui-react';
import PropTypes, { } from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Link, withRouter } from 'react-router-dom';
import { Favorites } from '../../api/favorite/Favorite';
import OperatingTime from './OperatingTime';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class VendorItemUserProfile extends React.Component {

  isValid = (frag) => frag.favorite === this.props.vendor._id;

  deleteFavorite = () => {
    const user = Meteor.user().username;
    const curFav = Favorites.collection.find({ userId: user }).fetch()[0];
    const allFav = Favorites.collection.find({ userId: user }).fetch()[0];
    const favList = [];
    allFav.liked.forEach(frag => favList.push(frag));
    const favIndex = curFav.liked.findIndex(this.isValid);
    if (favIndex > -1) {
      favList.splice(favIndex, 1);
      if (favList[0]) {
        Favorites.collection.update({ _id: curFav._id }, { $set: { liked: favList } });
      } else {
        Favorites.collection.remove(curFav._id);
      }
    }
  }

  render() {
    const vendorImage = { height: '100px' };
    const removeVenTxt = `Remove ${this.props.vendor.name} from Favorites`;
    const itemPadding = { padding: '50px' };
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
      <div className="middle-background">
        <Container>
          <Item.Group divided style = {itemPadding}>
            <Item>
              <Item.Image label={{
                color: tagColor,
                content: `${this.props.vendor.foodType} Food`,
                icon: 'food',
                ribbon: true,
              }} style = {vendorImage} src={this.props.vendor.storeImage}/>
              <Item.Content verticalAlign="middle">
                <Item.Header as="h1" id='userProfile-Name'>{this.props.vendor.name}</Item.Header>
                <Item.Meta>{this.props.vendor.location}</Item.Meta>
                <Item.Description>
                  {this.props.vendor.description}
                </Item.Description>
                <Item.Description>
                  <OperatingTime openTime ={this.props.vendor.open} openAP ={this.props.vendor.openAmOrPm} closeTime ={this.props.vendor.close} closeAP={this.props.vendor.closeAmOrPm}/>
                </Item.Description>
                <Item.Extra>
                  <Button as={Link} color='orange' to={`/VendorProfile/${this.props.vendor._id}`}>{this.props.vendor.name} menu.</Button>
                </Item.Extra>
                <Item.Extra>
                  <Button color='red' id="userProfile-Delete" onClick={this.deleteFavorite}>{removeVenTxt}</Button>
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        </Container>
      </div>
    );
  }
}

// Require a document to be passed to this component.
VendorItemUserProfile.propTypes = {
  vendor: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.string,
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
export default withRouter(VendorItemUserProfile);
