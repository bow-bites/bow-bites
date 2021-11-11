import React from 'react';
import { Meteor } from 'meteor/meteor';
// import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { Container, Header, Item } from 'semantic-ui-react';
// import { withTracker } from 'meteor/react-meteor-data';
// import PropTypes from 'prop-types';

/** Lists the top 5 most popular foods */
class AvailableNow extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    // return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
    return this.renderPage();
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">Foods Available Right Now</Header>
        <Item.Group>
          <Item>
            <Item.Image size='small' src='https://littlesunnykitchen.com/wp-content/uploads/Caesar-Salad-10.jpg'/>

            <Item.Content>
              <Item.Header as='a'>Caesar Salad</Item.Header>
              <Item.Meta>Description</Item.Meta>
              <Item.Description>
                                This delicious cesar salad is sure to refresh you during lunch!
              </Item.Description>
              <Item.Extra>
                                Link to Salad Vendor&apos;s Profile page.
                                Salad Vendor open from: 11AM-2PM
              </Item.Extra>
            </Item.Content>
          </Item>
          <Item>
            {/* eslint-disable-next-line max-len */}
            <Item.Image size='small' src='https://www.simplyrecipes.com/thmb/aUdpdn-AvknbtCb6PIjPXwNCpLo=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2017__02__2017-02-07-ChickenPho-15-830b0600befc47999171d6eeb9bcb520.jpg'/>

            <Item.Content>
              <Item.Header as='a'>Chicken Pho Soup</Item.Header>
              <Item.Meta>Description</Item.Meta>
              <Item.Description>
                                A perfect dinner for studying, try Vietnamese Vendor's classic Chicken Pho!
              </Item.Description>
              <Item.Extra>
                                Link to Vietnamese Vendor&apos;s Profile page.
                                Open from: 10AM-8PM
              </Item.Extra>
            </Item.Content>
          </Item>
          <Item>
            <Item.Image size='small' src='https://media-cldnry.s-nbcnews.com/image/upload/t_fit-2000w,f_auto,q_auto:best/newscms/2021_32/1761456/grilled-steak-te-main-210813.jpg'/>

            <Item.Content>
              <Item.Header as='a'>Steak</Item.Header>
              <Item.Meta>Description</Item.Meta>
              <Item.Description>
                                A favorite among beef enthusiasts, try out Steak Vendor&apos;s new steak today!
              </Item.Description>
              <Item.Extra>
                                Link to Steak Vendor&apos;s Profile page.
                                Open from: 10AM-3PM
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Container>
    );
  }
}

// Need to reactivate when actually loading foods from the Food Component

/* Require an array of Stuff documents in the props.
TopPicks.propTypes = {
  contacts: PropTypes.array.isRequired,
  notes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
}; */

// Need to reactivate when actually loading foods from the Food Component

/*
export default withTracker(() => {
  const subscription = Meteor.subscribe(Contacts.userPublicationName);
  const subscription2 = Meteor.subscribe(Notes.userPublicationName);
  return {
    contacts: Contacts.collection.find({}).fetch(),
    notes: Notes.collection.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(TopPicks);
*/

export default AvailableNow;
