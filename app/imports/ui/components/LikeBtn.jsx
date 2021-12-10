import React from 'react';
import { Button, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';
import { Favorites } from '../../api/favorite/Favorite';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class LikeBtn extends React.Component {

  isValid = (frag) => frag.favorite === this.props.vendor._id;

  like = () => {
    const data = this.props.vendor._id;
    const liked = [];
    const favorite = { favorite: data };
    liked.push(favorite);
    let user;
    try {
      user = Meteor.user().username;
    } catch {
      console.log('not logged in');
    }
    if (user) {

      console.log('adding to favorites');
      if (Favorites.collection.find({ userId: user }).fetch()[0]) {
        // console.log('User already has a collection');
        const userPro = Favorites.collection.find({ userId: user }).fetch()[0];
        if (userPro) {
          const userProId = userPro._id;
          const newArr = [];
          userPro.liked.forEach(element => newArr.push(element.favorite));
          if (newArr.includes(data)) {
            console.log('Vendor already exists in favorites');
          } else {
            console.log('it does not exist updating collection');
            Favorites.collection.update({ _id: userProId }, { $push: { liked: favorite } });
          }
        }
      } else {
        const userId = user;
        Favorites.collection.insert({ userId, liked },
          (error) => {
            if (error) {
              console.log('Error', error.message, 'error');
            } else {
              console.log('Success', 'Vendor added successfully', 'success');
            }
          });
      }
    }
  }

  deleteFavorite = () => {
    const user = Meteor.user().username;
    const curFav = Favorites.collection.find({ userId: user }).fetch()[0];
    const allFav = Favorites.collection.find({ userId: user }).fetch()[0];
    const favList = [];
    allFav.liked.forEach(frag => favList.push(frag));
    const favIndex = curFav.liked.findIndex(this.isValid);
    if (favIndex > -1) {
      favList.splice(favIndex, 1);
      if (favList[0]) {
        Favorites.collection.update({ _id: curFav._id }, { $set: { liked: favList } });
      } else {
        Favorites.collection.remove(curFav._id);
      }
    }
  }

  render() {
    let favVenTxt = 'Loading';
    let favAdded = 'blue';

    // Checks if the vendor has already been liked
    const dataCheck = this.props.vendor._id;
    const likedCheck = [];
    const favoriteCheck = { favorite: dataCheck };
    likedCheck.push(favoriteCheck);
    let userCheck;
    try {
      userCheck = Meteor.user().username;
    } catch {
      console.log('not logged in');
    }
    console.log(userCheck);
    if (userCheck) {
      if (Favorites.collection.find({ userId: userCheck }).fetch()[0]) {
        const userProCheck = Favorites.collection.find({ userId: userCheck }).fetch()[0];
        if (userProCheck) {
          const newArrCheck = [];
          userProCheck.liked.forEach(element => newArrCheck.push(element.favorite));
          if (newArrCheck.includes(dataCheck)) {
            console.log('Vendor already exists in favorites');
            favAdded = 'grey';
            favVenTxt = 'Added to Favorites';
          } else {
            favVenTxt = `Favorite ${this.props.vendor.name}`;
            favAdded = 'green';
          }
        }
      } else {
        favVenTxt = `Favorite ${this.props.vendor.name}`;
        favAdded = 'green';
      }
    } else {
      favVenTxt = 'Log in to add this to your favorites';
      favAdded = 'orange';
    }

    if (favAdded === 'green' || favAdded === 'orange') {
      return (
        <Button color={favAdded} id="listVendor-Favorite" onClick={this.like}> {favVenTxt} </Button>
      );
    }
    return (
      <Container>
        <Button color={favAdded} id="listVendor-Favorite"> {favVenTxt}</Button>
        <Button icon='remove circle' color='red' onClick={this.deleteFavorite}/>
      </Container>
    );
  }
}

// Require a document to be passed to this component.
LikeBtn.propTypes = {
  vendor: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.string,
    owner: PropTypes.string,
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
export default withRouter(LikeBtn);
