const mongoose = require('mongoose');
const User = require('../models/User');
const Thought = require('../models/thought');

mongoose.connect('mongodb://localhost/socialBackend', {
  useNewUrlParser: true,
  useUnifiedTopology: true,

});

const userData = [
  {
    username: 'Alice',
    email: 'alice@example.com'
  },
  {
    username: 'Bob',
    email: 'bob@example.com'
  },
  {
    username: 'Charlie',
    email: 'charlie@example.com'
  },
  {
    username: 'David',
    email: 'david@example.com'
  },
  {
    username: 'Eva',
    email: 'eva@example.com'
  },
  {
    username: 'Frank',
    email: 'frank@example.com'
  },
  {
    username: 'Grace',
    email: 'grace@example.com'
  },
  {
    username: 'Helen',
    email: 'helen@example.com'
  },
  {
    username: 'Irene',
    email: 'irene@example.com'
  },
  {
    username: 'Jack',
    email: 'jack@example.com'
  },
];

const thoughtData = [
  {
    thoughtText: 'Just had a fantastic day!',
    username: 'Alice',
  },
  {
    thoughtText: 'Learning Mongoose is fun.',
    username: 'Bob',
  },
  {
    thoughtText: 'I love coding.',
    username: 'Charlie',
  },
  {
    thoughtText: 'APIs are so powerful!',
    username: 'David',
  },
  {
    thoughtText: 'Can’t wait for the weekend.',
    username: 'Eva',
  },
  {
    thoughtText: 'Node.js is the best.',
    username: 'Frank',
  },
  {
    thoughtText: 'I might try out Python soon.',
    username: 'Grace',
  },
  {
    thoughtText: 'React makes frontend so much more interactive.',
    username: 'Helen',
  },
  {
    thoughtText: 'Mondays are always so challenging.',
    username: 'Irene',
  },
  {
    thoughtText: 'Looking forward to the team meeting tomorrow.',
    username: 'Jack',
  },
];

const reactionData = [
  {
    reactionBody: "That's awesome!",
    username: 'David'
  },
  {
    reactionBody: "I totally agree.",
    username: 'Frank'
  },
  {
    reactionBody: "You're so right.",
    username: 'Grace'
  },
  {
    reactionBody: "Well said!",
    username: 'Irene'
  }
];

const seedDatabase = async () => {
  try {
    await User.deleteMany({});
    await Thought.deleteMany({});

    const createdUsers = await User.insertMany(userData);

    for (let thought of thoughtData) {
      const user = createdUsers.find((user) => user.username === thought.username);
      if (user) {
        thought = { ...thought, userId: user._id };
        const createdThought = await Thought.create(thought);

        user.thoughts.push(createdThought._id);
        await user.save();
      }
    }

    // Adding some reactions
    const firstThought = await Thought.findOne({ username: 'Alice' });
    const secondThought = await Thought.findOne({ username: 'Bob' });

    firstThought.reactions.push(reactionData[0], reactionData[1]);
    secondThought.reactions.push(reactionData[2], reactionData[3]);

    await firstThought.save();
    await secondThought.save();

    // Making some users friends
    const alice = await User.findOne({ username: 'Alice' });
    const bob = await User.findOne({ username: 'Bob' });
    const charlie = await User.findOne({ username: 'Charlie' });

    alice.friends.push(bob._id, charlie._id);
    bob.friends.push(alice._id, charlie._id);
    charlie.friends.push(alice._id, bob._id);

    await alice.save();
    await bob.save();
    await charlie.save();

    console.log('Database seeded!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
};

seedDatabase();
