import React from 'react';
import { Container, Item } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import OperatingTime from './OperatingTime';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class PublicVendorItem extends React.Component {
  render() {
    return (
      <div className="middle-background">
        <Container>
          <Item.Group divided>
            <Item>
              <Item.Image size='medium' src={this.props.vendor.storeImage}/>
              <Item.Content verticalAlign="middle">
                <Item.Header as="h1" id='listVendor-Name'>{this.props.vendor.name}</Item.Header>
                <Item.Extra>
                  {this.props.vendor.name} sells {this.props.vendor.foodType} food
                </Item.Extra>
                <Item.Description>
                  {this.props.vendor.description}
                </Item.Description>
                <Item.Description>
                  <OperatingTime openTime ={this.props.vendor.open} openAP ={this.props.vendor.openAmOrPm} closeTime ={this.props.vendor.close} closeAP={this.props.vendor.closeAmOrPm}/>
                </Item.Description>
                <Item.Extra>
                  Link to {this.props.vendor.name}&apos;s Profile page.
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        </Container>
      </div>
    );
  }
}

// Require a document to be passed to this component.
PublicVendorItem.propTypes = {
  vendor: PropTypes.shape({
    name: PropTypes.string,
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
export default withRouter(PublicVendorItem);
