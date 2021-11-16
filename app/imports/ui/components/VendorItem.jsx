import React from 'react';
import { Container, Item } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class VendorItem extends React.Component {
  render() {
    return (
      <div className="middle-background">
        <Container>
          <Item.Group>
            <Item>
              <Item.Image size='small' src={this.props.vendor.menuItem.$.image}/>
              <Item.Content>
                <Item.Header as='a'>{this.props.vendor.menuItem.$.name}</Item.Header>
                <Item.Meta>Description</Item.Meta>
                <Item.Description>
                  {this.props.vendor.menuItem.$.description}
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
VendorItem.propTypes = {
  vendor: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(VendorItem);
