const express = require('express');
const {
  getAllUsers,
  updateUser,
  createUser,
  getUser,
  deleteUser,
} = require('./../controllers/userController');
const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
