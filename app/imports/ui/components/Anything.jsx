import React from 'react';
import { Container, Item, Button, Popup, Accordion, Image, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Vendors } from '../../api/vendor/Vendor';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Anything extends React.Component {
  randomVendor = () => {
    const venTotal = Vendors.collection.find().count();
    console.log(Vendors.collection);
    return (Math.floor(Math.random() * (venTotal)));
  }

  render() {
    return (
      <Popup
        trigger={
          <Button color='green' icon='quidditch' id="listVendor-Delete" content="Anything" onClick={this.randomVendor}/>
        }
        content={<Card>
          <Image src='https://react.semantic-ui.com/images/movies/totoro-horizontal.jpg' />
          <Card.Content>
            <Card.Header>${Vendors.collection[this.randomVendor]}</Card.Header>
            <Card.Description>
          Two sisters move to the country with their father in order to be
          closer to their hospitalized mother, and discover the surrounding
          trees are inhabited by magical spirits.
            </Card.Description>
          </Card.Content>
        </Card>}
        on='click'
        position='top right'
      />
    );
  }
}

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Anything);
