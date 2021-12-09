import React from 'react';
import { Image, Card, Button } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { Vendors } from '../../api/vendor/Vendor';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class AnythingContent extends React.Component {
  randomVendor = () => {
    const venTotal = Vendors.collection.find().count();
    const randVendNum = Math.floor(Math.random() * (venTotal));
    const allVendors = Vendors.collection.find({}).fetch();
    const randVendId = allVendors[randVendNum]._id;
    const randVendor = Vendors.collection.find({ _id: randVendId }).fetch();
    return (randVendor[0]);
  }

  randomItem = (theVendor) => {
    const itemTotal = theVendor.menuItem.length;
    return Math.floor(Math.random() * (itemTotal));
  }

  render() {
    const theVendor = this.randomVendor();
    const theItem = this.randomItem(theVendor);
    const randItem = theVendor.menuItem[theItem];
    return (
      <Card>
        <Image src={randItem.image} />
        <Card.Content>
          <Card.Header>{theVendor.name} </Card.Header>
          <Card.Header>{randItem.name} {randItem.price}$</Card.Header>
          {randItem.description}
          <Button as={Link} color='orange' to={`/VendorProfile/${theVendor._id}`}>{theVendor.name} menu.</Button>
        </Card.Content>
      </Card>
    );
  }
}

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(AnythingContent);
