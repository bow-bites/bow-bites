import React from 'react';
import { Label, Item } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class OperatingTime extends React.Component {

  render() {
    let btnColour = 'yellow';
    let statMes = 'Retrieving';
    let openTime = this.props.openTime;
    let closeTime = this.props.closeTime;
    if (this.props.openAP === 'PM') {
      openTime += 12;
    }
    if (this.props.closeAP === 'PM') {
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
        <Label color={btnColour} id="listVendor-Favorite"> {statMes}: {this.props.openTime} {this.props.openAP} to {this.props.closeTime} {this.props.closeAP} </Label>
      </Item.Description>
    );
  }
}

OperatingTime.propTypes = {
  openTime: PropTypes.number,
  closeTime: PropTypes.number,
  openAP: PropTypes.string,
  closeAP: PropTypes.string,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(OperatingTime);
