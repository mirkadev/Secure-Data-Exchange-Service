const { Mongoose } = require('../../../storages/mongo/mongo');

const mongoose = new Mongoose();
const { mongo } = mongoose;
const { Schema } = mongo;

const Metadata = new Schema({
  accessTimeCount: Number,
  expirationTime: Date,
  shareCode: String,
  adminCode: String,
  filename: String,
});

const MetadataModel = mongo.model('Metadata', Metadata);

module.exports = { MetadataModel };
