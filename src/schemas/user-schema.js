import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  _id: String,
  name: String,
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
