import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The VendorsCollection. It encapsulates state and variable values for Vendor.
 */
class VendorsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'VendorsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      location: String,
      foodType: String,
      storeImage: String,
      open: Number,
      openAmOrPm: String,
      close: Number,
      closeAmOrPm: String,
      menuItem: { type: Array, minCount: 1 },
      'menuItem.$': Object,
      'menuItem.$.name': { type: String },
      'menuItem.$.price': { type: Number, min: 0 },
      'menuItem.$.description': { type: String },
      'menuItem.$.image': { type: String },
      description: String,
      owner: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the VendorsCollection.
 * @type {VendorsCollection}
 */
export const Vendors = new VendorsCollection();
