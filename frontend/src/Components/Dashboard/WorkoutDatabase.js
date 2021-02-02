const workoutSaved = {
  workout: {
   /*  doneWorkout: [],
    missedWorkout: [],
    streak: 0, */
    day1: {
      button: "buttonGreen",
      exercises: [
        ["Bench Press", "chest", 3, 8],
        ["Military Press", "shoulders", 3, 8],
        ["Close-grip Bench Press", "arms", 3, 8],
        ["Chin-ups", "back", 4, 6],
        ["Bicpes Curls With Barbell", "arms", 3, 10],
        ["Dips", "arms", 3, 8],
      ],
      panels: [1, 2, 3, 4, 5, 6],
    },
    day2: {
      button: "buttonGreen",
      exercises: [
        ["Front Squats", "legs", 3, 8],
        ["Deadlifts", "back", 3, 6],
        ["Barbel Lunges", "legs", 3, 8],
        ["Leg Curl", "legs", 3, 8],
      ],
      panels: [1, 2, 3, 4],
    },
    day3: {
      button: "buttonGreen",
      exercises: [
        ["Incline Bench Press", "chest", 4, 8],
        ["Shoulder Press, Dumbbells", "shoulders", 3, 10],
        ["French Press (skullcrusher)", "arms", 3, 8],
        ["Incline Bumbbell Flye", "chest", 3, 8],
        ["Lateral Raises", "shoulders", 3, 8],
        ["Triceps Extensions on Cable", "arms", 3, 8],
      ],
      panels: [1, 2, 3, 4, 5, 6],
    },
    day4: {
      button: "buttonYellow",
      exercises: [["Rest Day"]],
      panels: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    day5: {
      button: "buttonGreen",
      exercises: [
        ["Leg Extension", "legs", 4, 8],
        ["Calf Press Using Leg Press Machine", "legs", 3, 10],
        ["Sumo Deadlift", "legs", 3, 6],
        ["Leg Curl", "legs", 3, 8],
        ["Calf Raises", "legs", 3, 8],
        ["Calf Raises on Hackenschmitt Machine", "legs", 3, 8],
      ],
      panels: [1, 2, 3, 4, 5, 6],
    },
    day6: {
      button: "buttonGreen",
      exercises: [
        ["Lat Pull Down (Straight Back)", "back", 3, 8],
        ["Bicpes Curls With Barbell", "arms", 3, 8],
        ["Row", "back", 3, 8],
        ["Hammercurls", "arms", 3, 8],
        ["Dumbbells on Scott Machine", "arms", 3, 8],
        ["Facepull", "back", 3, 8],
        ["Rowing, T-bar", "back", 3, 8],
      ],
      panels: [1, 2, 3, 4, 5, 6, 7],
    },
    day7: {
      button: "buttonYellow",
      exercises: [["Rest Day"]],
      panels: [1, 2, 3, 4, 5, 6, 7, 8],
    },
  },
}

module.exports = workoutSaved;
