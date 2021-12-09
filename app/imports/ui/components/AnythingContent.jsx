import React from 'react';
import { Image, Card, Button } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class AnythingContent extends React.Component {

  randomVendor = () => {
    const venTotal = this.props.newArr.newArr.length;
    const randVendNum = Math.floor(Math.random() * (venTotal));
    const randVendId = this.props.newArr.newArr[randVendNum]._id;

    const randVendor = this.props.newArr.newArr.find((vendor) => vendor._id === randVendId);
    return (randVendor);
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
          <Card.Header>{randItem.name} ${randItem.price}</Card.Header>
          <Card.Content>{randItem.description}</Card.Content>
          <Button as={Link} color='orange' to={`/VendorProfile/${theVendor._id}`}>{theVendor.name} menu.</Button>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
AnythingContent.propTypes = {
  newArr: PropTypes.shape({
    newArr: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      length: PropTypes.number,
      find: PropTypes.func,
      location: PropTypes.string,
      _id: PropTypes.string,
      description: PropTypes.string,
      storeImage: PropTypes.string,
      foodType: PropTypes.string,
      open: PropTypes.number,
      close: PropTypes.number,
      openAmOrPm: PropTypes.string,
      closeAmOrPm: PropTypes.string,
      menuItem: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string,
      })),
    })).isRequired,
  }),
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(AnythingContent);
