import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Item, Header, Loader, Grid, Container } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Vendors } from '../../api/vendor/Vendor';
import OperatingTime from '../components/OperatingTime';

/** Represents a vendor's profile page */
class VendorProfile extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container className="middle-background">
        <div className="VendorProfile" id="vendor-profile">
          <div className="ui image" id='vendor-profile-picture' >
            <img src='https://pbs.twimg.com/media/FDy0rCzVQAk4DIe?format=jpg&name=medium' alt='Image of Paradise Palms' width='500px' height='500px'/>
          </div>
          <Grid container stackable centered columns={2} verticalAlign="middle" id="VendorProfileGrid" >
            <Grid.Column id='vendor-profile-left-col'>
              <Item.Group divided>
                <Header as='h1'>
                  Information
                </Header>
                <Item>
                  <Grid container stackable columns={2}>
                    <Grid.Column>
                      <Item.Header as='h3'>
                    Hours of Operation
                      </Item.Header>
                    </Grid.Column>
                    <Grid.Column>
                      <Item.Meta>
                        <span><OperatingTime openTime ={this.props.vendor.open} openAP ={this.props.vendor.openAmOrPm} closeTime ={this.props.vendor.close} closeAP={this.props.vendor.closeAmOrPm}/></span>
                      </Item.Meta>
                    </Grid.Column>
                  </Grid>
                </Item>
                <Item>
                  <Grid container stackable columns={2}>
                    <Grid.Column>
                      <Item.Header as='h3'>
                    Location
                      </Item.Header>
                    </Grid.Column>
                    <Grid.Column>
                      <Item.Meta>
                    Paradise Palms
                      </Item.Meta>
                    </Grid.Column>
                  </Grid>
                </Item>
                <Item>
                  <Grid container stackable columns={2}>
                    <Grid.Column>
                      <Item.Header as='h3'>
                    Cuisine
                      </Item.Header>
                    </Grid.Column>
                    <Grid.Column>
                      <Item.Meta>
                        {this.props.vendor.foodType}
                      </Item.Meta>
                    </Grid.Column>
                  </Grid>
                </Item>
              </Item.Group>
            </Grid.Column>
            <Grid.Column>
              <Header as='h1'>
                {this.props.vendor.name}
              </Header>
              <p>
                {this.props.vendor.description}
              </p>
              <Item.Group divided id="VendorProfileMenu">
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
      </Container>
    );
  }
}
VendorProfile.propTypes = {
  vendor: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  const vendorId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Vendors.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  const vendor = Vendors.collection.findOne({ _id: vendorId });
  return {
    vendor,
    ready,
  };
})(VendorProfile);
