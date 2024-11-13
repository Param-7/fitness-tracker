// src/WorkoutForm.js
import React, { useState } from 'react';

function WorkoutForm({ onAddWorkout }) {
  const [workout, setWorkout] = useState({
    type: '',
    duration: '',
    caloriesBurned: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkout((prevWorkout) => ({
      ...prevWorkout,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddWorkout(workout);
    setWorkout({ type: '', duration: '', caloriesBurned: '' }); // Clear form after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Workout</h2>
      <label>
        Type:
        <input
          type="text"
          name="type"
          value={workout.type}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Duration (mins):
        <input
          type="number"
          name="duration"
          value={workout.duration}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Calories Burned:
        <input
          type="number"
          name="caloriesBurned"
          value={workout.caloriesBurned}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Add Workout</button>
    </form>
  );
}

export default WorkoutForm;
