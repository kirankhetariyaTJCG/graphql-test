// productResolver.js

const Product = require('../../models/product');

const productResolver = {
  Query: {
    getAllProducts: async () => {

      try {
        const products = await Product.find();
        return {
          status: true,
          message: "Products fetched successfully",
          data: products,
        }

      } catch (error) {
        return {
          status: false,
          message: "Internal server error",
          error: error.message,
        };
      }
    },
    getProductById: async (_, { productId }) => {
      try {
        
        const product = await Product.findById(productId);
        return {
          status: true,
          message: "Product fetched successfully",
          data: product,
        };

      } catch (error) {
        return {
          status: false,
          message: "Internal server error",
          error: error.message,
        };
      }
    },
  },
  Mutation: {
    createProduct: async (_, { productInput }) => {
      try {
        const product = new Product(productInput);
        const savedProduct = await product.save();
        return {
          status: true,
          message: "Product created successfully",
          data: savedProduct,
        };
      } catch (error) {
        return {
          status: false,
          message: "Internal server error",
          error: error.message,
        };
      }
    },
    updateProduct: async (_, { productId, productInput }, context) => {
      try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, productInput, { new: true });
        return {
          status: true,
          message: "Product updated successfully",
          data: updatedProduct,
        };
      } catch (error) {
        return {
          status: false,
          message: "Internal server error",
          error: error.message,
        };
      }
    },
    deleteProduct: async (_, { productId }) => {
      try {
        await Product.findByIdAndDelete(productId);
        return {
          status: true,
          message: "Product deleted successfully",
        };
      } catch (error) {
        return {
          status: false,
          message: "Internal server error",
          error: error.message,
        };
      }
    },
  },
};

module.exports = productResolver;