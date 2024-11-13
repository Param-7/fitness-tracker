// // Step - 1

// // server.js
// const express = require('express');
// const app = express();

// // a simple route to test the server
// app.get('/', (req, res) => {
//   res.send('Fitness Tracker API is running');
// });

// // Start the server on port 3000
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// // Step - 2 
// // server.js
// const express = require('express');
// const app = express();

// // Middleware to parse JSON data
// app.use(express.json());

// // Sample Data (In-memory simulation)
// let userProfile = {
//   name: 'John Doe',
//   age: 30,
//   height: 175,
//   weight: 70,
// };

// let workouts = [
//   { id: 1, type: 'Running', duration: 30, caloriesBurned: 300 },
//   { id: 2, type: 'Cycling', duration: 45, caloriesBurned: 450 },
// ];

// // Route: Get User Profile
// app.get('/api/profile', (req, res) => {
//   res.json(userProfile);
// });

// // Route: Get All Workouts
// app.get('/api/workouts', (req, res) => {
//   res.json(workouts);
// });

// // Route: Add a New Workout
// app.post('/api/workouts', (req, res) => {
//   const newWorkout = {
//     id: workouts.length + 1,
//     type: req.body.type,
//     duration: req.body.duration,
//     caloriesBurned: req.body.caloriesBurned,
//   };
//   workouts.push(newWorkout);
//   res.status(201).json(newWorkout);
// });

// // Start the server
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

let workouts = []; // Temporary in-memory storage for workouts

// Existing routes for profile and fetching workouts
app.get('/api/profile', (req, res) => {
  res.json({
    name: 'John Doe',
    age: 30,
    height: 180,
    weight: 75,
  });
});

app.get('/api/workouts', (req, res) => {
  res.json(workouts);
});

// Route to handle adding a new workout
app.post('/api/workouts', (req, res) => {
  const { type, duration, caloriesBurned } = req.body;
  const newWorkout = {
    id: workouts.length + 1,
    type,
    duration: parseInt(duration),
    caloriesBurned: parseInt(caloriesBurned),
  };
  workouts.push(newWorkout);
  res.status(201).json(newWorkout);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
