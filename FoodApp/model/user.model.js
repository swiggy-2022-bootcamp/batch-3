const mongoose = require("mongoose");
const {AutoIncrement} = require("../config/database")

const AddressSchema = mongoose.Schema({
  housenumber: { type: Number, default: null, required: true },
  street: { type: String, default: null, required: true },
  city: { type: String, default: null, required: true },
  state: { type: String, default: null, required: true },
  zip: { type: Number, default: null, required: true },
});

const UserSchema = new mongoose.Schema({
  firstname: { type: String, default: null, required: true },
  lastname: { type: String, default: null, required: true },
  username: { type: String, default: null, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: AddressSchema, required: true },
  token: { type: String },
});
UserSchema.plugin(AutoIncrement, {id: 'users_id_counter', inc_field: "id" });

module.exports = mongoose.model("user", UserSchema);
