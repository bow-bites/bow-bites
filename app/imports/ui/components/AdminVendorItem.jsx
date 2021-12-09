import React from 'react';
import { Item, Button, Confirm, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Vendors } from '../../api/vendor/Vendor';
import OperatingTime from './OperatingTime';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class AdminVendorItem extends React.Component {

  state = { open: false };

  open = () => this.setState({ open: true })

  close = () => this.setState({ open: false })

  deleteVendor = () => {
    Vendors.collection.remove(this.props.vendor._id);
  }

  render() {
    const delVenTxt = `Delete   ${this.props.vendor.name}`;
    const itemPadding = { padding: '50px' };
    const vendorImage = { height: '100px' };
    return (
      <Item style = {itemPadding}>
        <Item.Image label={{
          color: 'orange',
          content: `${this.props.vendor.foodType} Food`,
          icon: 'food',
          ribbon: true,
        }} style = {vendorImage} src={this.props.vendor.storeImage}/>
        <Item.Content verticalAlign="middle">
          <Item.Header as="h1" id='listVendor-Name'>{this.props.vendor.name}</Item.Header>
          <Item.Meta>{this.props.vendor.location}</Item.Meta>
          <Item.Description>
            {this.props.vendor.description}
          </Item.Description>
          <Item.Description>
            <OperatingTime openTime ={this.props.vendor.open} openAP ={this.props.vendor.openAmOrPm} closeTime ={this.props.vendor.close} closeAP={this.props.vendor.closeAmOrPm}/>
          </Item.Description>
          <Item.Extra>
            <Button as={Link} to={`/edit/${this.props.vendor._id}`} > Edit </Button>
            <Button color='red' id="listVendor-Delete" onClick={this.open}>{delVenTxt}</Button>
            <Confirm
              open={this.state.open}
              onCancel={this.close}
              onConfirm={this.deleteVendor}
            />
          </Item.Extra>
          <Item.Extra>
            <Button primary floated="right" as={Link} to={`/VendorProfile/${this.props.vendor._id}`} id='listVendor-profile'>
              View menu
              <Icon name='right arrow' />
            </Button>
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}

// Require a document to be passed to this component.
AdminVendorItem.propTypes = {
  vendor: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.string,
    _id: PropTypes.string,
    description: PropTypes.string,
    storeImage: PropTypes.string,
    foodType: PropTypes.string,
    openAmOrPm: PropTypes.string,
    closeAmOrPm: PropTypes.string,
    open: PropTypes.number,
    close: PropTypes.number,
    menuItem: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
    })),
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(AdminVendorItem);
