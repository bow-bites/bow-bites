import { Meteor } from 'meteor/meteor';
import { Vendors } from '../../api/vendor/Vendor';
import { Favorites } from '../../api/favorite/Favorite';

/* eslint-disable no-console */

// Initialize the database with a default vendor document.
function addVendor(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Vendors.collection.insert(data);
}

function addFavorite(data) {
  console.log(`  Adding: ${data.userId} (${data.liked})`);
  Favorites.collection.insert(data);
}

// Initialize the VendrosCollection if empty.
if (Vendors.collection.find().count() === 0) {
  if (Meteor.settings.defaultVendor) {
    console.log('Creating default Vendors.');
    Meteor.settings.defaultVendor.map(data => addVendor(data));
  }
}

if (Favorites.collection.find().count() === 0) {
  if (Meteor.settings.defaultFavorites) {
    console.log('Creating default Favorites.');
    Meteor.settings.defaultFavorites.map(data => addFavorite(data));
  }
}
