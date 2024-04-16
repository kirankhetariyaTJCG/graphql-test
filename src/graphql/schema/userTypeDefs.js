const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
  type User {
    _id: ID!
    email: String!
    password: String!
    firstName: String
    lastName: String
    mobileNo: String
    gender: String
    address: String
    status: Boolean
  }

  input UserInput {
    email: String!
    password: String!
    firstName: String
    lastName: String
    mobileNo: String
    gender: String
    address: String
    status: Boolean
  }

  input updateUserInput {
    email: String
    firstName: String
    lastName: String
    mobileNo: String
    gender: String
    address: String
    status: Boolean
  }

  type AuthUser {
    userId: ID!
    token: String!
    expiresIn: Int!
  }

  type Response {
    status: Boolean!
    message: String!
    error: String
    data: [User]
  }

  type signUpResponse {
    status: Boolean!
    message: String!
    error: String
    data: User
  }

  type getUserByIdResponse {
    status: Boolean!
    message: String!
    error: String
    data: User
  }

  type updateResponse {
    status: Boolean!
    message: String!
    error: String
    data: User
  }

  type deleteUserResponse {
    status: Boolean!
    message: String!
    error: String
  }

  type signInResponse {
    status: Boolean!
    message: String!
    error: String
    userId:String
    token:String
    data:User
  }

  type Query {
    getAllUsers: Response!
    getUserById(userId: ID!): getUserByIdResponse!
  }

  type Mutation {
    signUp(userInput: UserInput!): signUpResponse!
    signIn(email: String!, password: String!): signInResponse!
    updateUser(userId: ID!, userInput: updateUserInput!): updateResponse!
    deleteUser(userId: ID!): deleteUserResponse!
  }
`;

module.exports = userTypeDefs;
