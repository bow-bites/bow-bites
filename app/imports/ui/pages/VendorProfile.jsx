import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Item, Header, Loader, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Vendors } from '../../api/vendor/Vendor';
// import VendorItem from '../components/VendorItem'; // Need to come back to add Vendors

/** Represents a vendor's profile page */
class VendorProfile extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <div className="VendorProfile">
        <div className="ui image" id='vendor-picture' >
          <img src='https://pbs.twimg.com/media/FDy0rCzVQAk4DIe?format=jpg&name=medium' alt='Image of Paradise Palms' width='500px' height='500px'/>
        </div>
        <Grid container stackable centered columns={2} verticalAlign="middle" id="VendorProfileGrid">
          <Grid.Column>
            <Item.Group>
              <Item>
                <Item.Header as='h2'>
                  Hours of Operation
                </Item.Header>
                <Item.Description>
                  M-F: 9AM-3PM
                </Item.Description>
              </Item>
              <Item>
                <Item.Header as='h2'>
                  Location
                </Item.Header>
                <Item.Description>
                  Paradise Palms
                </Item.Description>
              </Item>
              <Item>
                <Item.Header as='h2'>
                  Cuisine
                </Item.Header>
                <Item.Description>
                  Salad Bar
                </Item.Description>
              </Item>
            </Item.Group>
          </Grid.Column>
          <Grid.Column>
            <Header as='h1' inverted>
                  Salad Vendor
            </Header>
            <p>
              Salad Vendor provides the best leafy salads UH has to offer. Located inside the convenient Paradise Palms,
              open during convenient hours, and serving a wide variety of foods (and not just our award winning leafy greens),
              stop by Salad Vendor today!
            </p>
            <Item.Group id="VendorProfileMenu">
              <Item>
                <Item.Header as='h3'>
                  Caesar&apos;s Glory
                </Item.Header>
                <Item.Image size="tiny" src="https://natashaskitchen.com/wp-content/uploads/2019/01/Caesar-Salad-Recipe-3.jpg"/>
                <Item.Description>
                  A favorite on the campus, refresh your lunch with the best caesar salad around!
                </Item.Description>
              </Item>
            </Item.Group>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

// Require a vendor ID to be passed in
VendorProfile.propTypes = {
  vendor: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Vendors.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const vendors = Vendors.collection.find({}).fetch();
  return {
    vendors,
    ready,
  };
})(VendorProfile);
