import React from 'react';
import { Button, Popup } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import AnythingContent from './AnythingContent';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Anything extends React.Component {

  render() {
    // console.log(this.props);
    if (this.props.newArr.length > 0) {
      return (
        <Popup
          trigger={
            <Button fluid attached color='green' icon='quidditch' id="listVendor-Delete" content="Anything"/>
          }
          content={<AnythingContent newArr={this.props}/>}
          on='click'
          position='top left'
        />
      );
    }
    return (
      <Popup
        trigger={
          <Button fluid attached color='green' icon='quidditch' id="listVendor-Delete" content="Anything"/>
        }
        content='Nothing avaliable'
        on='click'
        position='top left'
      />
    );
  }
}

Anything.propTypes = {
  newArr: PropTypes.array,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Anything);
