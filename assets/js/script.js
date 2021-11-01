
// create a question

var questions = [{ text: "What is the color of the sky?", choices: [{ answer: "blue", correct: true }, { answer: "red", correct: false }] }, {
    text: "Is this my second question?",
    choices: [{ answer: "Yes", correct: true }, { answer: "No", correct: false }]
}]

var questionsEl = document.querySelector(".questions")
var choicesEl = document.querySelector(".choices")

var questionIndex = 0;
var lastQuestionIndex = questions.length - 1
var timeLeft = 30;
var time = document.getElementById('time')

function createQuestions() {
    var question = questions[questionIndex].text
    questionsEl.textContent = question

    for (let i = 0; i < questions[questionIndex].choices.length; i++) {
        var btnEl = document.createElement('button')
        var liEl = document.createElement('li')
        var isCorrect = questions[questionIndex].choices[i].correct

        btnEl.innerText = questions[questionIndex].choices[i].answer
        btnEl.setAttribute("class", "answer-choice")
        btnEl.setAttribute("data-correct", isCorrect)

        liEl.appendChild(btnEl)

        choicesEl.appendChild(liEl)

        btnEl.addEventListener('click', checkAnswer)
    }


}

function checkAnswer(e) {
    var checkEvent = e.target.dataset.correct
    // console.log(checkEvent)

    if (checkEvent === "true") {
        console.log("Correct")

        // show correct on the body
        var rightAnswer = document.getElementById('answer')
        rightAnswer.innerText = "Correct"

        var toggleNext = document.getElementById('next-btn')
        toggleNext.style.display = 'block';
        nextQuestion(questions[questionIndex])
    }

    if (checkEvent === "false") {
        console.log("Wrong!")

        //show wrong on the body
        var wrongAnswer = document.getElementById('answer')
        wrongAnswer.innerText = "Wrong!"

        var toggleNext = document.getElementById('next-btn')
        toggleNext.style.display = 'block';

        nextQuestion(questions[questionIndex])

        timeLeft -= 10

    }
}

function nextQuestion(nextQ) {
    const clickNext = document.getElementById('next-btn')
    clickNext.addEventListener('click', () => {
        questionIndex++
        console.log(questionIndex)
        resetChoices()
        createQuestions()
    })
}

function resetChoices() {
    const deleteChoices = document.querySelector('.choices')
    const nestedChoices = document.querySelector('li')
    const siblingChoices = nestedChoices.nextElementSibling
    deleteChoices.removeChild(nestedChoices)
    deleteChoices.removeChild(siblingChoices)
}

function startTimer() {
    

    var timer = setInterval(() => {
        timeLeft--
        time.textContent = timeLeft

        // if (timeLeft <= 0){
        //     clearInterval(timer)
        //     gameEnd() 
            
        // }
        // } else if (timeLeft <= 0) {
        //     // alert('Time\'s up!')
        //     clearInterval(timer)
            
        //     gameEnd()
            
        // }
    }, 1000)
}

function gameState() {

    // when user answers all questions stop the timer
    // capture the LAST click of the last question

    if (questionIndex === lastQuestionIndex) {
        if (document.querySelector('.answer-choice').clicked === "Correct") {
            console.log('game-end')
        }
    }
    var initials = document.getElementById('initials')
    var highScore = document.createElement('input')
    var endBtn = document.createElement('button')
    initials.appendChild(highScore)
    
    var endDiv = document.getElementById('end')
    endBtn.textContent = 'End Game'
    endDiv.appendChild(endBtn)

    endBtn.addEventListener('click', getCredentials)

    console.log('game ended')

 
}

function getCredentials() {
    var initials = document.getElementById('initials')
    var initial = initials.value
    console.log(initial)

    var scores = JSON.parse(window.localStorage.getItem('user')) || []


    var scoreObj = {score: timeLeft, initials: initial}
    scores.push(scoreObj)
    window.localStorage.setItem('user', JSON.stringify(scores))
}

createQuestions()
// displayCorrectAnswer()

startTimer()

gameState()


