import sessionSchema from "./sessionSchema.js";

// insert session
export const insertSession = (obj) => sessionSchema(obj).save();

// get session by filter
export const getSession = (filter) => {
  return sessionSchema.findOne(filter);
};

// edit session
export const deleteSession = (_id) => sessionSchema.findByIdAndDelete({ _id });
