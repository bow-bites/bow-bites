import React from 'react';
import { Container, Item, Button, Confirm } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Link, withRouter } from 'react-router-dom';
import { Vendors } from '../../api/vendor/Vendor';
import { Favorites } from '../../api/favorite/Favorite';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class VendorItem extends React.Component {

  state = { open: false };

  open = () => this.setState({ open: true })

  close = () => this.setState({ open: false })

  test = () => console.log('it CLicked')

  deleteVendor = () => {
    Vendors.collection.remove(this.props.vendor._id);
  }

  like(data) {
    const liked = [];
    const favorite = { 'favorite': data };
    liked.push(favorite);
    const user = Meteor.user().username;
    console.log('adding to favorites');
    if (Favorites.collection.find({ userId: user })) {
      console.log('User already has a collection');
      const userPro = Favorites.collection.find({ userId: user }).fetch()[0];
      const userProId = userPro._id;
      const newArr = [];
      userPro.liked.forEach(element => newArr.push(element.favorite));
      if (newArr.includes(data)) {
        console.log('it exists');
      } else {
        console.log('it does not exist updating collection');
        Favorites.collection.update({ _id: userProId }, { $push: { liked: favorite } });
      }
    } else {
      Favorites.collection.insert({ user, liked },
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
    const delVenTxt = `Delete   ${this.props.vendor.name}`;

    return (
      <div className="middle-background">
        <Container>
          <Item.Group divided>
            <Item>
              <Item.Image size='medium' src={this.props.vendor.storeImage}/>
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
                  Link to {this.props.vendor.name}&apos;s Profile page.
                </Item.Extra>
                <Item.Extra>
                  <Button color='green' onClick={this.like(this.props.vendor._id)}> Favorite </Button>
                </Item.Extra>
                <Button as={Link} to={`/edit/${this.props.vendor._id}`} > Edit </Button>
                <Button color='red' id="listVendor-Delete" onClick={this.open}>{delVenTxt}</Button>
                <Confirm
                  open={this.state.open}
                  onCancel={this.close}
                  onConfirm={this.deleteVendor}
                />
              </Item.Content>
            </Item>
          </Item.Group>
        </Container>
      </div>
    );
  }
}

// Require a document to be passed to this component.
VendorItem.propTypes = {
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
export default withRouter(VendorItem);
