import React from 'react';
import { Header, List } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px', color: 'white' };
    return (
      <footer>
        <div style={divStyle} className="ui center aligned container">
          <hr />
          <Header inverted>To add a vendor, please email: bowbites.requests@gmail.com</Header>
          <Header inverted>Please include the following information in the email:</Header>
          <List inverted bulleted>
            <List.Item>Restaurant Name</List.Item>
            <List.Item>Food Type</List.Item>
            <List.Item>Hours of Operation</List.Item>
            <List.Item>Menu</List.Item>
            <List.Item>Description of the Restaurant</List.Item>
          </List>
        </div>
      </footer>
    );
  }
}

export default Footer;
