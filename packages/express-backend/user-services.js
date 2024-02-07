import mongoose from "mongoose";
import userModel from "./users.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://127.0.0.1:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function getUsers(name, job) {
  let promise;
  if (name === undefined && job === undefined) {
    promise = userModel.find();
  } else if (name && !job) {
    promise = findUserByName(name);
  } else if (job && !name) {
    promise = findUserByJob(job);
  } else if (job && name){
    promise = findUserByNameJob(name, job)
  }
  return promise;
}

function deleteById(id){
    let promise

    // promise = userModel.deleteOne({_id: ObjectId(id)})
    // promise = userModel.findByIdAndDelete(id)
    promise = userModel.deleteOne(id)
    return promise
}

function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

function findUserByNameJob(name, job){
    return userModel.find({"name": name, "job": job});
}


export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  deleteById,
};