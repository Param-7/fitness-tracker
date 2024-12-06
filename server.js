const express = require("express");
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const axios = require('axios');

const app = express();
const Schema = mongoose.Schema;


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/recommendations", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "recommendations.html"));
});
// app.get("/api/recommendations", async (req, res) => {
//   const workoutType = req.query.type;

//   if (!workoutType) {
//     return res.status(400).json({ error: "Workout type is required." });
//   }

//   try {
//     //const apiKey = "0b0c4e914dmsh94f472d71144f9fp1948a2jsn8cc11b6c31c8"; 
//     const apiUrl = `https://api.api-ninjas.com/v1/exercises?muscle=${bodyPart}`
//     //const apiUrl = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${encodeURIComponent(workoutType)}`;
//     const apiKey = "tLa9YBv+1JiAYFNk/1nRoA==SNnG08vHKj3WfT07"
//     const response = await axios.get(apiUrl, {
//       headers: {
//         "X-RapidAPI-Key": apiKey,
//         "X-RapidAPI-Host": "exercisedb.p.rapidapi.com"
//       }
//     });

//     const exercises = response.data;
//     const recommendations = exercises.map(exercise => ({
//       name: exercise.name,
//       type: exercise.type,
//       difficulty: exercise.difficulty,
//     }));

//     res.json(recommendations);
//   } catch (error) {
//     res.status(500).json({ error: "Unable to fetch recommendations at this time." });
//   }
// });
app.get("/api/recommendations", async (req, res) => {
  const bodyPart = req.query.type;

  if (!bodyPart) {
    return res.status(400).json({ error: "Body part is required." });
  }

  try {
    const apiUrl = `https://api.api-ninjas.com/v1/exercises?muscle=${bodyPart}`;
    const apiKey = "tLa9YBv+1JiAYFNk/1nRoA==SNnG08vHKj3WfT07";
    const response = await axios.get(apiUrl, {
      headers: { "X-Api-Key": apiKey }
    });

    const exercises = response.data;

    const recommendations = exercises.map(exercise => ({
      name: exercise.name,
      type: exercise.type,
      difficulty: exercise.difficulty,
      equipment: exercise.equipment || 'None',
      instructions: exercise.instructions || 'No instructions available'
    }));

    res.json(recommendations);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to fetch recommendations at this time." });
  }
});

// MongoDB schema starts here =============================
const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },

  totalDuration: {
    type: Number,
    default: 0
  },

  exercises: [
    {
      type: {
        type: String,
        enum: ['resistance', 'cardio']
      },

      name: {
        type: String,
        trim: true
      },

      distance: Number,
      duration: Number,
      weight: Number,
      reps: Number,
      sets: Number
    }
  ]
});

const Workout = mongoose.model('workout', WorkoutSchema);
module.exports = { Workout };
// MongoDB schema ends here =============================

// Express middlewares starts here ======================
app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get('/exercise', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/exercise.html'));
});

app.get('/stats', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/stats.html'));
});

app.get('/api/workouts', async (req, res) => {
  const result = await Workout.find({});
  res.json(result);
});

app.get('/api/workouts/range', async (req, res) => {
  await Workout.deleteMany({'totalDuration': 0}); 
  await Workout.deleteMany({'exercises': {$elemMatch: {'duration': 0}}});
  const result = await Workout.find({}).sort({day: -1}).limit(7);
  const reverse = result.reverse();
  res.json(reverse);
});

app.post('/api/workouts', async (req, res) => {
  const result = await Workout.create({});
  res.json(result);
});

app.put('/api/workouts/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const duration = data.duration;
  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      $push: { exercises: data },
      $inc: { totalDuration: duration}
    },
    {new: true}
  );
  const result = await workout.save();
  res.json(result);
});
// Express middlewares ends here ======================

// Server set up starts here ==========================
const mongoParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
};

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/project', mongoParams)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`==> 🌎  Listening on port ${PORT}. Visit http://localhost:${PORT} in your browser.`);
    });
  });
// Server set up endss here ===========================