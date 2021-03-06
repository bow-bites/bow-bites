import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Item, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Vendors } from '../../api/vendor/Vendor';
import AdminVendorItem from '../components/AdminVendorItem';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class AdminListVendor extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container id="admin-list-vendor-page" className="middle-background">
        <Header as="h2" textAlign="center" >Admin Vendor Page</Header>
        <Item.Group divided>
          {this.props.vendors.map((vendor, index) => <AdminVendorItem
            key={index} vendor={vendor}/>)}
          <hr></hr>
        </Item.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
AdminListVendor.propTypes = {
  vendors: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Vendors.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const vendors = Vendors.collection.find({}).fetch();
  return {
    vendors,
    ready,
  };
})(AdminListVendor);
