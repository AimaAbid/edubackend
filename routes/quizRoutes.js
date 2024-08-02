var express = require("express");
var Router = express.Router();
var user = require("../models/user");
var question = require("../models/question");
var userprogress = require("../models/userprogress");

// Submit an answer
// Submit an answer
Router.post("/answers", async (req, res) => {
	try {
		const { userId, questionId, selectedAnswer } = req.body;

		// Find the question from the database
		const foundQuestion = await question.findById(questionId);

		if (!foundQuestion) {
			return res.status(404).json({ error: "Question not found" });
		}

		// Find or create the user progress
		let foundUserprogress = await userprogress.findOne({ userId });

		if (!foundUserprogress) {
			foundUserprogress = new userprogress({ userId, points: 0, badges: [] });
		}

		// Check the answer
		if (foundQuestion.correctAnswer === selectedAnswer) {
			foundUserprogress.points += 10; // Example point increment

			// Check for badge criteria
			if (
				foundUserprogress.points >= 40 &&
				!foundUserprogress.badges.includes("Rookie")
			) {
				foundUserprogress.badges.push("Rookie");
			}if (
				foundUserprogress.points >=80 &&
				!foundUserprogress.badges.includes("Traveller")
			) {
				foundUserprogress.badges.push("Traveller");
			}
			if (
				foundUserprogress.points >= 160 &&
				!foundUserprogress.badges.includes("Trail Blazer")
			) {
				foundUserprogress.badges.push("Trail Blazer");
			}

			if (
				foundUserprogress.points >= 120 &&
				!foundUserprogress.badges.includes("Adventurer")
			) {
				foundUserprogress.badges.push("Adventurer");
			}

			await foundUserprogress.save();

			res.json({ correct: true, points: foundUserprogress.points });
		} else {
			res.json({ correct: false });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "An error occurred" });
	}
});

// Get questions for a module
Router.get("/:moduleId", async (req, res) => {
	try {
		const moduleId = req.params.moduleId;
		const searchedQuestion = await question.find({ moduleId: moduleId });
		if (!searchedQuestion || searchedQuestion.length === 0) {
			return res.status(404).json({ message: "No questions found for this module" });
		}
		res.status(200).json(searchedQuestion);
	} catch (error) {
		console.error("Error fetching question:", error.message);
		res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
})

// Get user points
Router.get('/points/:userId', async (req, res) => {
	const userId = req.params.userId;
	const searchedUserProgress = await userprogress.findOne({ userId });
	res.json({ points: searchedUserProgress ? searchedUserProgress.points : 0 });
  });
  
  // Get user badges
  Router.get('/badges/:userId', async (req, res) => {
	const userId = req.params.userId;
	const searchedUserProgress = await userprogress.findOne({ userId });
	res.json({ badges: searchedUserProgress ? searchedUserProgress.badges : [] });
  });

  // Endpoint to submit final exam answers
// Endpoint to submit final exam answers
// Endpoint to submit final exam answers


// Endpoint to submit final exam answers
Router.post('/final-exam/answers', async (req, res) => {
  console.log('Received body:', req.body); // Log the incoming body

  try {
    const { userId, answers } = req.body;

    // Validate that `answers` is an array
    if (!Array.isArray(answers)) {
      return res.status(400).json({ error: 'Answers should be an array' });
    }

    let correctAnswersCount = 0;

    for (const answer of answers) {
      const { questionId, selectedAnswer } = answer;

      if (!questionId || !selectedAnswer) {
        continue; // Skip invalid answers
      }

      const foundQuestion = await question.findById(questionId);

      if (foundQuestion && foundQuestion.correctAnswer === selectedAnswer) {
        correctAnswersCount++;
      }
    }

    let foundUserProgress = await userprogress.findOne({ userId });

    if (!foundUserProgress) {
      foundUserProgress = new userprogress({ userId, points: 0, badges: [] });
    }

    const score = correctAnswersCount * 10; // Adjust scoring as needed
    foundUserProgress.points += score;

    if (correctAnswersCount >= 17 && !foundUserProgress.badges.includes('Course Completion')) {
      foundUserProgress.badges.push('Course Completion');
    }

    await foundUserProgress.save();

    res.json({
      correctAnswersCount,
      totalPoints: foundUserProgress.points,
      badges: foundUserProgress.badges
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});



  

module.exports = Router;
