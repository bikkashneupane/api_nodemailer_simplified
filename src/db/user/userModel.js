import userSchema from "./userSchema.js";

// insert user
export const insertUser = (obj) => userSchema(obj).save();

// get user by filter
export const getUser = (filter) => userSchema.findOne(filter);

// edit user
export const editUser = (email, obj) =>
  userSchema.findOneAndUpdate({ email }, obj, { new: true });
