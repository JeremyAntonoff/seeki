const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

router.get('/api/user', async (req, res) => {
  const findSavedItems = await User.findById(req.user.id);
  res.send(findSavedItems.savedItems);
});

router.post('/api/user', async (req, res) => {
  const updatedUserItems = await User.findOneAndUpdate(
    { _id: req.user.id },
    { $push: { savedItems: req.body } }
  );
  res.send(updatedUserItems.savedItems);
});

router.get('/api/user/:id', async (req, res) => {
  console.log(typeof req.params.id);
  const updatedUserItems = await User.findOneAndUpdate(
    { _id: req.user.id },
    { $pull: { savedItems: { id: Number(req.params.id) } } },
    { new: true }
  );
  res.send(updatedUserItems.savedItems);
});

module.exports = router;
