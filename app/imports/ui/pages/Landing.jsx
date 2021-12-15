import React from 'react';
import { Grid, Icon, Header, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const gridStyle = { height: '500px' };
    const containStyle = { backgroundColor: '#379683', height: '250px', borderRadius: '10px', padding: '20px' };
    const wordStyle = { color: '#EDF5E1' };
    const iconStyle = { color: '#05386B' };
    return (
      <div className="bowbites-background-image" id="landing-page">
        <Grid container stackable centered columns={2} verticalAlign="middle" style={gridStyle}>

          <Grid.Column textAlign="center">
            <Container style={containStyle} as={Link} to={'/AvailableNow/'}>
              <Icon name="utensils" size="huge" style={iconStyle}/>
              <Header as="h1" style={wordStyle}>Bow Bites</Header>
              <Header as="h3" style={wordStyle}>Connecting the UH community to Campus Vendors to make finding good eats easy, quick, and accessible.</Header>
            </Container>
          </Grid.Column>

          <Grid.Column textAlign="center">
            <Container style={containStyle} as={Link} to={'/Signin/'}>
              <Icon name="user" size="huge" style={iconStyle} />
              <Header as="h1" style={wordStyle}>Become a User</Header>
              <Header as="h3" style={wordStyle}>Become a user to like your favorite vendor picks, and sort through your liked vendors to find something good to eat!</Header>
            </Container>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Landing;
