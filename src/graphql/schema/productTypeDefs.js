// productTypeDefs.js

const { gql } = require('apollo-server-express');

const productTypeDefs = gql`
  type Product {
    _id: ID!
    name: String!
    price: Float!
    description: String
    discount: Float
    discountType: String
    quantity: Float
    category: String
    image: String
  }

  input ProductInput {
    name: String!
    price: Float!
    description: String
    discount: Float
    discountType: String
    quantity: Float
    category: String
    image: String
  }

  input UpdateProductInput {
    name: String
    price: Float
    description: String
    discount: Float
    discountType: String
    quantity: Float
    category: String
    image: String
  }

  type ProductResponse {
    status: Boolean!
    message: String!
    error: String
    data: [Product]
  }

  type GetProductByIdResponse {
    status: Boolean!
    message: String!
    error: String
    data: Product
  }

  type UpdateProductResponse {
    status: Boolean!
    message: String!
    error: String
    data: Product
  }

  type DeleteProductResponse {
    status: Boolean!
    message: String!
    error: String
  }

  type CreateProductResponse {
    status: Boolean!
    message: String!
    error: String
    data: Product
  }

  type Query {
    getAllProducts: ProductResponse!
    getProductById(productId: ID!): GetProductByIdResponse!
  }

  type Mutation {
    createProduct(productInput: ProductInput!): CreateProductResponse!
    updateProduct(productId: ID!, productInput: UpdateProductInput!): UpdateProductResponse!
    deleteProduct(productId: ID!): DeleteProductResponse!
  }
`;

module.exports = productTypeDefs;
