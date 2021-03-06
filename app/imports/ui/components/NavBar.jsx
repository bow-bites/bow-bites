import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '10px' };
    return (
      <Menu style={menuStyle} attached="top" borderless inverted id='NavBar'>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Header inverted as='h1'>Bow-Bites</Header>
        </Menu.Item>
        {this.props.currentUser === '' ? (
          [
            <Menu.Item as={NavLink} activeClassName="active" exact to="/AvailableNow" key='AvailableNow' id='navbar-available-now'>Available Now</Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="/PublicListVendor" key='PublicListVendor' id='navbar-public-list-vendor'>Vendors</Menu.Item>,
          ]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          [
            <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin' id ="navbar-admin-list-vendor">Admin</Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="/addVendor" key='addVendor' id="navbar-add-vendor">Add Vendor</Menu.Item>,
          ]
        ) : ''}
        {this.props.currentUser && !Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          [
            <Menu.Item as={NavLink} activeClassName="active" exact to="/AvailableNow" key='AvailableNow' id='navbar-available-now'>Available Now</Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="/listVendor" key='listVendor' id="navbar-list-vendor">Vendors</Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="/editListVendor" key='editListVendor' id="navbar-edit-list-vendor" >Edit my Vendors</Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="/userProfile" key='userProfile' id="navbar-user-profile">User Profile</Menu.Item>,
          ]
        ) : '' }
        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
            <Dropdown id="login-dropdown" text="Login" pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

// Declare the types of all properties.
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
