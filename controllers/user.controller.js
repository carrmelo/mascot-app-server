const mongoose = require('mongoose');
const UserModel = require('../models/user')

const getUsers = async (ctx, next) => {
  ctx.body = await UserModel.find()
}

// router.get('/users',PetController.getUser);

const addUser = async (ctx, next) => {
  const newUser = new UserModel(ctx.request.body);
  newUser.save();
  ctx.status = 200
}

const editUser = async (ctx, next) => {
  console.log('editUser');
  
  // const topicScore = await TopicModel.findById(ctx.params.id);
  // topicScore.score -= 1;
  // topicScore.save()
  // ctx.body = topicScore;

}

const applyForAdoption = async (ctx, next) => {
  console.log('applyForAdoption');
  
}

const applyForResidence = async (ctx, next) => {
  console.log('applyForResidence');
  
}

const deleteUser = async (ctx, next) => {
  ctx.body = await UserModel.findOneAndRemove();
}

module.exports = { getUsers, addUser, editUser, applyForAdoption, applyForResidence, deleteUser }