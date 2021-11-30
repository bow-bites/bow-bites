import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The FavoritesCollection. It encapsulates state and variable values for stuff.
 */
class FavoritesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'FavoritesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      userId: String,
      liked: { type: Array, minCount: 1 },
      'liked.$': Object,
      'liked.$.favorite': { type: String },
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the FavoritesCollection.
 * @type {FavoritesCollection}
 */
export const Favorites = new FavoritesCollection();
