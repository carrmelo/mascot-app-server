const { Organization, Pet, User } = require('../models');

const getUsers = async ctx => {
  try {
    ctx.body = await User.find();
    ctx.status = 200;
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      errors: [e.message],
    };
  }
};

const getUser = async ctx => {
  try {
    const { usr_id: id } = ctx.params;
    ctx.body = await User.findById(id).populate('pets.pet');
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      errors: [e.message],
    };
  }
};

const acceptAdoption = async ctx => {
  const { org, pet, query } = ctx.request.body;
  try {
    await User.findByIdAndUpdate(ctx.params.usr_id, {
      $push: {
        pets: {
          org,
          pet,
        },
        messages: {
          org,
          pet,
          message: 'Su solicitud ha sido aprobada',
          alert: 'success',
        },
      },
    });
    await Organization.findByIdAndUpdate(org, {
      $pull: {
        queries: { _id: query },
        pets: pet,
      },
    });
    await Pet.findByIdAndUpdate(pet, {
      adopted: true,
      owner: ctx.params.usr_id,
    });
    ctx.status = 200;
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      errors: [e.message],
    };
  }
};

const rejectAdoption = async ctx => {
  const { org, pet, query } = ctx.request.body;
  try {
    await User.findByIdAndUpdate(ctx.params.usr_id, {
      $push: {
        messages: {
          org,
          pet,
          message: 'Lo sentimos, su solicitud ha sido rechazada',
          alert: 'danger',
        },
      },
    });
    await Organization.findByIdAndUpdate(org, {
      $pull: { queries: { _id: query } },
    });
    await Pet.findByIdAndUpdate(pet, {
      $set: { available: true },
    });
    ctx.status = 200;
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      errors: [e.message],
    };
  }
};

const markAsRead = async ctx => {
  const { _id: id } = ctx.request.body;
  try {
    await User.findByIdAndUpdate(ctx.params.usr_id, {
      $pull: { messages: { _id: id } },
    });
    ctx.status = 200;
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      errors: [e.message],
    };
  }
};

const addUser = async ctx => {
  try {
    const newUser = new User(ctx.request.body);
    newUser.save();
    ctx.status = 201;
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      errors: [e.message],
    };
  }
};

module.exports = {
  getUsers,
  acceptAdoption,
  getUser,
  rejectAdoption,
  markAsRead,
  addUser,
};
