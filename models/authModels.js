import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: String,
  email: String,
  password: String,
  lastname: {
    type: String,
    default: "lastname",
  },
  location: {
    type: String,
    default: "my city",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  avatar: String,
  avatarPublicId: String,
});

userSchema.methods.toRemovePassword = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

const authModels = mongoose.model("User", userSchema);
export default authModels;
