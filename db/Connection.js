const mongoose = require('mongoose');

// Define the MongoDB connection URL
const password = "03152436290aAA";
const encodedpass=encodeURIComponent(password);
const mongoDBUrl = 'mongodb+srv://xyzty1:03152436290aAA@cluster1.kvmgj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// Connect to the MongoDB database
mongoose.connect(mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB successfully');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});
// Export the mongoose object for use in other modules
module.exports = mongoose;