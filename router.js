const Router = require('koa-router');

const UserController = require('./controllers/user.controller');
const PetController = require('./controllers/pet.controller');
const OrganizationController = require('./controllers/organization.controller');

const router = new Router();

// router.get('/pets', PetController.getPet);
router.get('/pets', PetController.getPets);
router.post('/pets', PetController.addPet);
router.put('/pets/:pet_id', PetController.editPet);
router.delete('/pets/:pet_id', PetController.deletePet);

router.get('/organizations', OrganizationController.getOrganizations);
// router.get('/organizations', OrganizationController.getOrganization);
router.post('/organizations', OrganizationController.addOrganization);
router.put('/organizations/:organization_id', OrganizationController.editOrganization);
router.put('/organizations/:organization_id', OrganizationController.acceptAdoption);
router.put('/organizations/:organization_id', OrganizationController.acceptResidence);
router.put('/organizations/:organization_id', OrganizationController.rejectAdoption);
router.put('/organizations/:organization_id', OrganizationController.rejectResidence);
router.delete('/organizations/:organization_id', OrganizationController.deleteOrganization);

router.get('/users', UserController.getUsers);
// router.get('/users', UserController.getUser);
router.post('/users', UserController.addUser);
router.put('/users/user_id', UserController.editUser);
router.put('/users/user_id', UserController.applyForAdoption);
router.put('/users/user_id', UserController.applyForResidence);
router.delete('/users/user_id', UserController.deleteUser);

module.exports = router;