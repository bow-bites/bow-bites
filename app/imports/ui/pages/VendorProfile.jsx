import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Item, Header, Loader, Grid, Container } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Favorites } from '../../api/favorite/Favorite';
import { Vendors } from '../../api/vendor/Vendor';
import OperatingTime from '../components/OperatingTime';
import LikeBtn from '../components/LikeBtn';

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
            <img src={this.props.vendor.storeImage} alt='Picture of this vendor' width='700px' height='700px'/>
          </div>
          <Grid container stackable centered columns={2} verticalAlign="top" id="VendorProfileGrid" >
            <Grid.Column id='vendor-profile-left-col'>
              <Item.Group divided>
                <Grid container stackable columns={2} id ="venPInfo">
                  <Grid.Column>
                    <Item.Header as='h1'>
                      Information
                    </Item.Header>
                  </Grid.Column>
                  <Grid.Column>
                    <Item.Meta>
                      <LikeBtn vendor = {this.props.vendor}/>
                    </Item.Meta>
                  </Grid.Column>
                </Grid>
                <Item>
                  <Grid container stackable columns={2}>
                    <Grid.Column>
                      <Item.Header as='h3'>
                    Hours of Operation
                      </Item.Header>
                    </Grid.Column>
                    <Grid.Column>
                      <Item.Meta>
                        <span><OperatingTime vendor = {this.props.vendor}/></span>
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
                        {this.props.vendor.location}
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
                        <Item.Header as="h2">{menuItem.name}</Item.Header>
                        <Item.Image size='small' src={menuItem.image}/>
                        <Item.Description>{menuItem.description}</Item.Description>
                        <Item.Description>Price: ${menuItem.price}</Item.Description>
                        <hr></hr>
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
  vendor: PropTypes.object,
  ready: PropTypes.bool.isRequired,
  vamos: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  const vendorId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Vendors.userPublicationName);
  const subscription2 = Meteor.subscribe(Favorites.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  const vamos = subscription2.ready();
  const vendor = Vendors.collection.findOne({ _id: vendorId });
  const favorites = Favorites.collection.find({}).fetch();
  return {
    vendor,
    favorites,
    ready,
    vamos,
  };
})(VendorProfile);
