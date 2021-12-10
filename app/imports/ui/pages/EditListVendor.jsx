import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Item, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Vendors } from '../../api/vendor/Vendor';
import { Favorites } from '../../api/favorite/Favorite';
import EditVendorItem from '../components/EditVendorItem';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class EditListVendor extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const myVendorList = (this.props.vendors.filter(
      function (vendor) {
        return Meteor.user().username === vendor.owner;
      },
    ));
    console.log(myVendorList.length);
    // eslint-disable-next-line no-return-assign
    if (myVendorList.length > 0) {
      return (
        <Container id="edit-list-vendor-page" className="middle-background">
          <Header as="h2" textAlign="center" >My Vendors</Header>
          <Item.Group divided>
            {(myVendorList).map((vendor, index) => <EditVendorItem
              key={index} vendor={vendor}/>)}
            <hr></hr>
          </Item.Group>
        </Container>
      );
    }
    return (
      <Container id="edit-list-vendor-page" className="middle-background">
        <Item.Group divided>
          <Header textAlign="center" as='h3'>You do not currently have any vendors.</Header>
          <Header textAlign="center" as='h3'>If you would like to add one contact us using the information below</Header>
          <hr></hr>
        </Item.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
EditListVendor.propTypes = {
  vendors: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Vendors.userPublicationName);
  const subscription2 = Meteor.subscribe(Favorites.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  const vamos = subscription2.ready();
  // Get the Stuff documents
  const vendors = Vendors.collection.find({}).fetch();
  const favorites = Favorites.collection.find({}).fetch();
  return {
    vendors,
    favorites,
    ready,
    vamos,
  };
})(EditListVendor);
