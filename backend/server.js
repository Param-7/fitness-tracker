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
