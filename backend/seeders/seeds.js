require('dotenv').config({ path: '../.env' });
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
const User = require('../models/User');
const Habit = require('../models/Habit');

const { mongoURI: db } = require('../config/keys.js');
const NUM_SEED_HABITS = 10;

// Create one user
const user = new User({
  username: 'gary',
  email: 'gary@gary.com',
  hashedPassword: bcrypt.hashSync('password', 10)
});

// Connect to database and seed
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

// Reset and seed db
const insertSeeds = async () => {
  console.log("Resetting db and seeding user and habits...");

  try {
    await User.collection.drop();
    await Habit.collection.drop();

    // Create and save the user
    const savedUser = await User.create(user);

    // Create and save habits
    for (let i = 0; i < NUM_SEED_HABITS; i++) {
      const habit = new Habit({
        name: faker.hacker.verb(),
        frequency: ['Daily', 'Weekly', 'Monthly'][Math.floor(Math.random() * 3)],
        type: ['Physical', 'Mental', 'Nutrition', 'Family', 'Love', 'Community', 'Spiritual', 'Career'][Math.floor(Math.random() * 8)],
        startDate: faker.date.past(),
        endDate: faker.date.future(),
        reminderTime: faker.date.soon(),
        lastUpdated: null,
        user: savedUser._id // Link to the User model
      });

      await habit.save();
    }

    console.log("Done!");
    mongoose.disconnect();
  } catch (err) {
    console.error(err.stack);
    process.exit(1);
  }
}
