const User = require('../models/User');
const Thought = require('../models/thought');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(400).json(err);
        }
    },


    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
            console.log("query result:", thought)
           
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(thought);
        } catch (err) {
            res.status(400).json(err);
        }
    },


    async createThought(req, res) {
        try {
            const dbThoughtData = await Thought.create(req.body);
            await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: dbThoughtData._id } }, { new: true, runValidators: true })
            res.json(dbThoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },


    async updateThought(req, res) {
        try {
            const dbThoughtData = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                req.body,
                { new: true, runValidators: true });
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json(dbThoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {

        try {
            const dbThoughtData = await Thought.findByIdAndDelete(req.params.thoughtId);

            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json({ message: 'Thought deleted successfully!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Add a reaction to a thought
    async addReaction(req, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: req.body } },
                { new: true }
            );
            if (!updatedThought) {
                return res.status(404).json({ message: 'No thought with this ID!' });
            }
            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async removeReaction(req, res) {
        try {
          const updatedThought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
          );
          if (!updatedThought) {
            return res.status(404).json({ message: 'No thought with this ID!' });
          }
          res.json(updatedThought);
        } catch (err) {
          res.status(500).json(err);
        }
      }
};