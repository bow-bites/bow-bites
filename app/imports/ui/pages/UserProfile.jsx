import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Item, Header, Loader, Grid, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Vendors } from '../../api/vendor/Vendor';
import { Favorites } from '../../api/favorite/Favorite';
import VendorItemUserProfile from '../components/VendorItemUserProfile';
import Anything from '../components/Anything';
import TypeFilter from '../components/TypeFilter';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = { newFilteredArr: [] };
  }

  filterVendor = (newArr, userPro, data) => {
    // Type filter
    const newFilteredArr = [];
    const sampleArr = [];
    if (data.filtered) {
      data.filtered.forEach(fType => sampleArr.push(fType));
    }
    sampleArr.forEach(typeObj => {
      const filterUser = newArr.filter(type => type.foodType === typeObj);
      if (sampleArr) {
        filterUser.forEach(element => newFilteredArr.push(element));
      }
    });
    return newFilteredArr;
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const userEmail = Meteor.users.findOne(Meteor.userId()).username;
    const userName = userEmail.split('@');
    const pageName = `${userName[0]}'s Page`;
    const user = Meteor.user().username;

    // connect the liked profile to the user
    const userPro = Favorites.collection.find({ userId: user }).fetch()[0];
    const newArr = [];
    const nullArr = Vendors.collection.find({}).fetch();
    if (userPro) {
      userPro.liked.forEach(function (element) {
        if (Vendors.collection.find({ _id: element.favorite }).fetch()[0]) {
          newArr.push(Vendors.collection.find({ _id: element.favorite }).fetch()[0]);
        }
      });
    } else {
      // console.log('userPro empty');
    }
    console.log(newArr);
    let newFilteredArr = this.filterVendor(newArr, userPro, []);

    const eventhandler = data => {
      newFilteredArr = [];
      this.filterVendor(newArr, userPro, data).forEach(foodType => newFilteredArr.push(foodType));
      this.setState({ newFilteredArr: newFilteredArr });
    };

    if (newArr.length > 0) {
      return (
        <Container id="user-profile-page">
          <Header as="h2" textAlign="center" inverted>{pageName}</Header>
          <Grid divided='vertically'>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Item.Group divided>
                  <Anything newArr={newArr}/>
                  {newArr.map((vendor, index) => <VendorItemUserProfile
                    key={index} vendor={vendor} onUpdate={eventhandler}/>)}
                </Item.Group>
              </Grid.Column>
              <Grid.Column>
                <TypeFilter onChange={eventhandler}/>
                {this.state.newFilteredArr.map((vendor, index) => <VendorItemUserProfile
                  key={index} vendor={vendor}/>)}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      );
    }
    return (
      <Container id="user-profile-page">
        <Header as="h2" textAlign="center" inverted>{pageName}</Header>
        <Container id="user-profile-pageEmpty">
          <Header textAlign='center'> Start customizing your profile by liking some places</Header>
          <Button fluid as={Link} color='orange' to={'/listVendor'}>Check out Some of Our Options.</Button>
          <Header textAlign='center'> Or Jump right in</Header>
          <Anything newArr={nullArr}/>
        </Container>

      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
UserProfile.propTypes = {
  // vendors: PropTypes.array.isRequired,
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
})(UserProfile);
