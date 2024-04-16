const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

const userResolvers = {
  Query: {
    getAllUsers: async (_, __, context) => {
      try {
        if (!context.user) {
          return {
            status: false,
            message: "Authentication required"
          }
        }
        else {
          const userList = await User.find();
          return {
            status: true,
            message: "User list fetched successfully!",
            data: userList,
          };
        }
      } catch (error) {
        return {
          status: false,
          message: "Internal server error",
          error: error.message,
        };
      }
    },
    getUserById: async (_, { userId }, context) => {
      try {
        if (!context.user) {
          return {
            status: false,
            message: "Authentication required",
          };
        } else {
          const user = await User.findById(userId);
          return {
            status: true,
            message: "User fetched successfully",
            data: user,
          };
        }
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
    signUp: async (_, { userInput }) => {
      try {
        const hashedPassword = await bcrypt.hash(userInput.password, 10);
        const user = new User({ ...userInput, password: hashedPassword });
        const savedUser = await user.save();
        return {
          status: true,
          message: "User signup successful",
          data: savedUser,
        };
      } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
          return {
            status: false,
            message: "Email address already in use",
            error: error.message,
          };
        } else {
          return {
            status: false,
            message: "Internal server error",
            error: error.message,
          };
        }
      }
    },
    signIn: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return {
            status: false,
            message: "invalid credentials",
          };
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          const token = jwt.sign({ userId: user._id, email: user.email }, 'nodejs', {
            expiresIn: '1d',
          });
          return {
            status: true,
            message: "User sign-in successful",
            userId: user._id,
            token: token,
            data:user
          };
        } else {
          return {
            status: false,
            message: "invalid credentials",
          };
        }
      } catch (error) {
        return {
          status: false,
          message: "Authentication error",
          error: error.message,
        };
      }
    },
    updateUser: async (_, { userId, userInput }, context) => {
      try {
        if (!context.user) {
          return {
            status: false,
            message: "Authentication required",
          };
        }
        const updatedUser = await User.findByIdAndUpdate(userId, userInput, { new: true });
        return {
          status: true,
          message: "User update successful",
          data: updatedUser,
        };
      } catch (error) {
        return {
          status: false,
          message: "Internal server error",
          error: error.message,
        };
      }
    },
    deleteUser: async (_, { userId }, context) => {
      try {
        if (!context.user) {
          return {
            status: false,
            message: "Authentication required",
          };
        }
        await User.findByIdAndDelete(userId);
        return {
          status: true,
          message: "User delete successful",
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

module.exports = userResolvers;
