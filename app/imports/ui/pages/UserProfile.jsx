import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Item, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Vendors } from '../../api/vendor/Vendor';
import VendorItemUserProfile from '../components/VendorItemUserProfile';
import Anything from '../components/Anything';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserProfile extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const userEmail = Meteor.users.findOne(Meteor.userId()).username;
    const userName = userEmail.split('@');
    const pageName = `${userName[0]}'s Page`;

    return (
      <Container id="list-vendor-page">
        <Header as="h2" textAlign="center" inverted>{pageName}</Header>
        <Item.Group divided>
          <Anything/>
          {this.props.vendors.map((vendor, index) => <VendorItemUserProfile
            key={index} vendor={vendor}/>)}
        </Item.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
UserProfile.propTypes = {
  vendors: PropTypes.array.isRequired,
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
})(UserProfile);
