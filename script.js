let quizQuestions = [];
let currentQuestionIndex = 0;

function addQuestion() {
    const questionInput = document.getElementById('question');
    const answerInput = document.getElementById('answer');

    const question = questionInput.value.trim();
    const answer = answerInput.value.trim();

    if (question && answer) {
        quizQuestions.push({ question, answer });
        updateQuestionsList();
        questionInput.value = '';
        answerInput.value = '';
    } else {
        alert('Please enter both a question and an answer.');
    }
}

function updateQuestionsList() {
    const questionsList = document.getElementById('questions-list');
    questionsList.innerHTML = '';
    quizQuestions.forEach((q, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${q.question}`;
        questionsList.appendChild(listItem);
    });
}

function startQuiz() {
    if (quizQuestions.length === 0) {
        alert('Please add at least one question to start the quiz.');
        return;
    }

    document.getElementById('quiz-creator').style.display = 'none';
    document.getElementById('quiz-player').style.display = 'block';

    showCurrentQuestion();
}

function showCurrentQuestion() {
    if (currentQuestionIndex < quizQuestions.length) {
        document.getElementById('question-display').textContent =
            quizQuestions[currentQuestionIndex].question;
        document.getElementById('player-answer').value = '';
    } else {
        endQuiz();
    }
}

function submitAnswer() {
    const playerAnswer = document.getElementById('player-answer').value.trim();
    const correctAnswer = quizQuestions[currentQuestionIndex].answer;

    const feedback = document.getElementById('quiz-feedback');
    if (playerAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        feedback.textContent = 'Correct! 🎉';
        feedback.style.color = 'green';
    } else {
        feedback.textContent = `Incorrect! The correct answer was "${correctAnswer}".`;
        feedback.style.color = 'red';
    }

    currentQuestionIndex++;
    setTimeout(() => {
        feedback.textContent = '';
        showCurrentQuestion();
    }, 2000);
}

function endQuiz() {
    document.getElementById('current-question').innerHTML =
        '<p>🎉 Quiz Completed! Well done! 🎉</p>';
    document.getElementById('quiz-feedback').textContent = '';
}
