import React from 'react';
import { Item, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import OperatingTime from './OperatingTime';
import ImageTagColor from './ImageTagColor';
import LikeBtn from './LikeBtn';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class VendorItem extends React.Component {

  render() {
    const itemPadding = { padding: '50px' };

    return (
      <Item style = {itemPadding}>
        <ImageTagColor vendor={this.props.vendor}/>
        <Item.Content verticalAlign="middle">
          <Item.Header as="h1" id='listVendor-Name'>{this.props.vendor.name}</Item.Header>
          <Item.Meta>{this.props.vendor.location}</Item.Meta>
          <Item.Description>
            {this.props.vendor.description}
          </Item.Description>
          <Item.Description>
            <OperatingTime vendor = {this.props.vendor}/>
          </Item.Description>
          <Item.Extra>
            <LikeBtn vendor = {this.props.vendor}/>
          </Item.Extra>
          <Button as={Link} to={`/VendorProfile/${this.props.vendor._id}`} primary floated='right'>
                    View menu
            <Icon name='right arrow' />
          </Button>
        </Item.Content>
      </Item>
    );
  }
}

// Require a document to be passed to this component.
VendorItem.propTypes = {
  vendor: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.string,
    owner: PropTypes.string,
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
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(VendorItem);
