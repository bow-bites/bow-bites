import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class VendorItem extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.stuff.name}</Table.Cell>
        <Table.Cell>
          <Link to={`/edit/${this.props.stuff._id}`}>Edit</Link>
        </Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
VendorItem.propTypes = {
  stuff: PropTypes.shape({
    name: String,
    foodType: String,
    open: Number,
    openAmOrPm: {
      type: String,
      allowedValues: ['AM', 'PM'],
      defaultValue: 'AM',
    },
    close: Number,
    closeAmOrPm: {
      type: String,
      allowedValues: ['AM', 'PM'],
      defaultValue: 'PM',
    },
    menuItem: { type: Array, minCount: 1 },
    'menuItem.$': Object,
    'menuItem.$.name': { type: String },
    'menuItem.$.price': { type: Number, min: 0 },
    description: String,
    owner: String,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(VendorItem);
