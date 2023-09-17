const User = require('../models/User');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const dbUserData = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true, runValidators: true });
      if (!dbUserData) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const userThoughts = await Thought.find({ username: req.params.userId });

      if(userThoughts.length > 0) {
          // 2. Delete those thoughts
          await Thought.deleteMany({ username: req.params.userId });
      }

      const dbUserData = await User.findByIdAndDelete(req.params.userId);

      if (!dbUserData) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json({ message: 'User deleted successfully!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
//add a friend to user's friend list
  async addFriend(req, res) {
    try {
        const dbUserData = await User.findByIdAndUpdate(
            req.params.userId,
            { $push: { friends: req.params.friendId } },
            { new: true, runValidators: true }
        );

        if (!dbUserData) {
            return res.status(404).json({ message: 'No user with that ID' });
        }

        res.json(dbUserData);
    } catch (err) {
        res.status(500).json(err);
    }
},

// Remove a friend from user's friend list
async deleteFriend(req, res) {
    try {
        const dbUserData = await User.findByIdAndUpdate(
            req.params.userId,
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );

        if (!dbUserData) {
            return res.status(404).json({ message: 'No user with that ID' });
        }

        res.json(dbUserData);
    } catch (err) {
        res.status(500).json(err);
    }
}
};
