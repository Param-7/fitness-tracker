import React, { useEffect, useState } from 'react';
import './App.css';
import WorkoutForm from './WorkoutForm';

function App() {
  const [profile, setProfile] = useState(null);
  const [workouts, setWorkouts] = useState([]);

  // Fetch User Profile
  useEffect(() => {
    fetch('/api/profile')
      .then((response) => response.json())
      .then((data) => setProfile(data));
  }, []);

  // Fetch Workouts
  useEffect(() => {
    fetch('/api/workouts')
      .then((response) => response.json())
      .then((data) => setWorkouts(data));
  }, []);

  // Handle adding a new workout
  const addWorkout = (newWorkout) => {
    fetch('/api/workouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newWorkout),
    })
      .then((response) => response.json())
      .then((data) => {
        setWorkouts((prevWorkouts) => [...prevWorkouts, data]);
      });
  };

  return (
    <div className="App">
      <h1>Fitness Tracker</h1>
      {profile && (
        <div>
          <h2>User Profile</h2>
          <p>Name: {profile.name}</p>
          <p>Age: {profile.age}</p>
          <p>Height: {profile.height} cm</p>
          <p>Weight: {profile.weight} kg</p>
        </div>
      )}
      <WorkoutForm onAddWorkout={addWorkout} />
      <h2>Workouts</h2>
      <ul>
        {workouts.map((workout) => (
          <li key={workout.id}>
            {workout.type} - {workout.duration} mins - {workout.caloriesBurned} kcal
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
