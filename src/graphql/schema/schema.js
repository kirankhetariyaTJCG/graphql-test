const { mergeTypeDefs } = require('@graphql-tools/merge');
const userTypeDefs = require('./userTypeDefs');
const productTypeDefs = require('./productTypeDefs');

const mergedTypeDefs = mergeTypeDefs([userTypeDefs, productTypeDefs]);

module.exports = mergedTypeDefs;
