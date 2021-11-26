import React from 'react';
import { Container, Item, Button } from 'semantic-ui-react';
import PropTypes, { element } from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';
import { Favorites } from '../../api/favorite/Favorite';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class VendorItemUserProfile extends React.Component {

  isValid = (element) => element.favorite === this.props.vendor._id;

  deleteFavorite = () => {
    const user = Meteor.user().username;
    const curFav = Favorites.collection.find({ userId: user }).fetch()[0];
    const allFav = Favorites.collection.find({ userId: user }).fetch()[0];
    const favList = [];
    allFav.liked.forEach(element => favList.push(element));
    const favIndex = curFav.liked.findIndex(this.isValid);
    if (favIndex > -1) {
      favList.splice(favIndex, 1);
      if (favList[0]) {
        Favorites.collection.update({ _id: curFav._id }, { $set: { 'liked': favList } });
      } else {
        Favorites.collection.remove(curFav._id);
      }
    }
  }

  render() {

    return (
      <div className="middle-background">
        <Container>
          <Item.Group divided>
            <Item>
              <Item.Image size='small' src={this.props.vendor.storeImage}/>
              <Item.Content verticalAlign="middle">
                <Item.Header as="h1" id='listVendor-Name'>{this.props.vendor.name}</Item.Header>
                <Item.Extra>
                  {this.props.vendor.name} sells {this.props.vendor.foodType} food
                </Item.Extra>
                <Item.Description>
                  {this.props.vendor.description}
                </Item.Description>
                <Item.Description>
                  Open from {this.props.vendor.open} am to {this.props.vendor.close} pm.
                </Item.Description>
                <Item.Extra>
                  <Button>Link to {this.props.vendor.name}&apos;s Profile page.</Button>
                </Item.Extra>
                <Item.Extra>
                  <Button color='red' onClick={this.deleteFavorite}>Remove from Favorites</Button>
                </Item.Extra>
                <Item.Description>
                  Menu Items total {this.props.vendor.menuItem.length}
                </Item.Description>
                {this.props.vendor.menuItem.map((menuItem) => (
                  <div key={menuItem.name}>
                    <Item.Description>{menuItem.name}</Item.Description>
                    <Item.Image size='small' src={menuItem.image}/>
                    <Item.Description>{menuItem.description}</Item.Description>
                    <Item.Description>Price: {menuItem.price}$</Item.Description>
                  </div>
                ))}
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
    _id: PropTypes.string,
    description: PropTypes.string,
    storeImage: PropTypes.string,
    foodType: PropTypes.string,
    open: PropTypes.number,
    close: PropTypes.number,
    menuItem: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
    })),
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(VendorItemUserProfile);
