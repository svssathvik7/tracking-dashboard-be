import User from "../models/userModel.js";

const createAdmin = async () => {
  const name = "admin";
  const email = "admin@gmail.com";
  const password = "admin";
  const role = "admin";
  const newAdmin = new User({
    name,
    email,
    password,
    role,
  });
  await newAdmin.save();
};

export default createAdmin;
