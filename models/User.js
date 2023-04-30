const express = require('express');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  login: {
    type:String
  },
  node_id: {
    type:String
  },
  avatar_url: {
    type:String
  }
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);
if (mongoose.model('User')) {
  console.log('User model created successfully');
} else {
  console.log('User model creation failed');
}
// Export the model for use in other modules
module.exports = User;