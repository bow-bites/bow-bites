import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Vendors } from '../../api/vendor/Vendor';
import { Favorites } from '../../api/favorite/Favorite';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

function addVendor(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Vendors.collection.insert(data);
}
function addFavorite(data) {
  console.log(`  Adding: ${data.userId} (${data.liked})`);
  Favorites.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

if (Vendors.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default Vendors.');
    Meteor.settings.defaultVendor.map(data => addVendor(data));
  }
}

if (Favorites.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default Favorites.');
    Meteor.settings.defaultFavorites.map(data => addFavorite(data));
  }
}
