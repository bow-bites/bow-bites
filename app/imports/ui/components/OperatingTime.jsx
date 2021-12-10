import React from 'react';
import { Label, Item } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class OperatingTime extends React.Component {

  render() {
    let btnColour = 'yellow';
    let statMes = 'Retrieving';
    // console.log(this.props.vendor);
    let openTime = this.props.vendor.open;
    let closeTime = this.props.vendor.close;
    if (this.props.vendor.openAmOrPm === 'PM') {
      openTime += 12;
    }
    if (this.props.vendor.closeAmOrPm === 'PM') {
      closeTime += 12;
    }
    const THours = new Date().getHours();
    // const TMinutes = new Date().getMinutes();
    if (openTime <= THours && THours < closeTime) {
      btnColour = 'green';
      statMes = 'Open Now';
    } else {
      btnColour = 'red';
      statMes = 'Currently Closed: Operating Hours';
    }
    return (
      <Item.Description>
        <Label color={btnColour} id="listVendor-Favorite"> {statMes}: {this.props.vendor.open} {this.props.vendor.openAmOrPm} to {this.props.vendor.close} {this.props.vendor.closeAmOrPm} </Label>
      </Item.Description>
    );
  }
}

OperatingTime.propTypes = {
  vendor: PropTypes.shape({
    open: PropTypes.number,
    close: PropTypes.number,
    openAmOrPm: PropTypes.string,
    closeAmOrPm: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(OperatingTime);
