const router = require('koa-router')();

const {
  userController,
  petController,
  orgController,
} = require('./controllers');

router
  .get('/pets/:pet_id', petController.getPet)
  .get('/pets', petController.getPets)
  .post('/pets', petController.addPet);

router
  .get('/orgs', orgController.getOrgs)
  .get('/orgs/:org_id', orgController.getOrg)
  .post('/orgs', orgController.addOrg)
  .put('/orgs/:org_id', orgController.adoptionRequest);

router
  .get('/users', userController.getUsers)
  .get('/users/:usr_id', userController.getUser)
  .put('/users/:usr_id/accepted', userController.acceptAdoption)
  .put('/users/:usr_id/rejected', userController.rejectAdoption)
  .put('/users/:usr_id/markAsRead', userController.markAsRead)
  .post('/users', userController.addUser);

// PENDING ROUTES
// router.put('/pets/:pet_id', petController.editPet);
// router.delete('/pets/:pet_id', petController.deletePet);

// router.put('/orgs/:org_id', orgController.editOrg);
// router.put('/orgs/:org_id', orgController.rejectResidence);
// router.delete('/orgs/:org_id', orgController.deleteOrg);
// router.post('/orgs/:org_id/pets', orgController.addPet);

// router.post('/users/:user_id/pets', petController.addPet);
// router.put('/users/:user_id', userController.editUser);
// router.put('/users/:user_id', userController.applyForResidence);
// router.delete('/users/:user_id', userController.deleteUser);

module.exports = router;
