import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Item, Header, Loader, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Vendors } from '../../api/vendor/Vendor';

/** Represents a vendor's profile page */
class VendorProfile extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    console.log('Hello World!');
    console.log(this.props.vendor);
    console.log(this.props.vendor._id);
    return (
      <div className="VendorProfile" id="vendor-profile">
        <div className="ui image" id='vendor-profile-picture' >
          <img src='https://pbs.twimg.com/media/FDy0rCzVQAk4DIe?format=jpg&name=medium' alt='Image of Paradise Palms' width='500px' height='500px'/>
        </div>
        <Grid container stackable centered columns={2} verticalAlign="middle" id="VendorProfileGrid" >
          <Grid.Column style={{ color: 'white' }} id='vendor-profile-left-col'>
            <Item.Group >
              <Header as='h1' style={{ color: 'white' }}>
                Information
              </Header>
              <Item>
                <Item.Header as='h3'>
                  Hours of Operation
                </Item.Header>
                <Item.Meta>
                  <span>M-F: 9AM-3PM</span>
                </Item.Meta>
              </Item>
              <Item>
                <Item.Header as='h3'>
                  Location
                </Item.Header>
                <Item.Meta>
                  Paradise Palms
                </Item.Meta>
              </Item>
              <Item>
                <Item.Header as='h3'>
                  Cuisine
                </Item.Header>
                <Item.Meta>
                  Salad Bar
                </Item.Meta>
              </Item>
            </Item.Group>
          </Grid.Column>
          <Grid.Column style={{ color: 'white' }}>
            <Header as='h1' style={{ color: 'white' }}>
                  Salad Vendor
            </Header>
            <p>
              Salad Vendor provides the best leafy salads UH has to offer. Located inside the convenient Paradise Palms,
              open during convenient hours, and serving a wide variety of foods (and not just our award winning leafy greens),
              stop by Salad Vendor today!
            </p>
            <Item.Group id="VendorProfileMenu">
              <Item>
                <Item.Content>
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
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

// Require a vendor ID to be passed in

/*
VendorProfile.propTypes = {
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
  ready: PropTypes.bool.isRequired,
}; */

VendorProfile.propTypes = {
  vendor: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  const vendorId = match.params._id;
  console.log('This is vendorId');
  console.log(match);
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Vendors.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  // const vendorArray = Vendors.collection.find({}).fetch();
  // const vendor = vendorArray[0];
  // const vendor = Vendors.collection.findOne(vendorId).fetch();
  const vendorArray = Vendors.collection.find({ _id: vendorId }).fetch();
  const vendor = vendorArray[0];
  // const vendor = Vendors.collection.find({}).fetch();
  // const vendor = vendorArray[0];
  // const vendor = Vendors.collection.findOne(vendorId);
  return {
    vendor,
    ready,
  };
})(VendorProfile);
