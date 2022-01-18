
//assigning variable to control page elements
var viewScoreButEl = document.getElementById("viewScores")
var timeBarEl = document.getElementById("timer");
var timeEl = document.getElementById("time");
var introScrEl = document.getElementById("intro");
var startButEl = document.getElementById("startBut");
var questSecEl = document.getElementById("questSec");
var questEl = document.getElementById("quest")
var possAnswerEl = document.getElementById("possAns");
var messageEl = document.getElementById("message");
var finalEl = document.getElementById("final");
var scoreEl = document.getElementById("score");
var initInputEl = document.getElementById("init");
var subButEl = document.getElementById("subBut");
var highScoresEl = document.getElementById("highScores");
var entry = document.getElementById("top10");
var clearButEl = document.getElementById("clear");
var backToStartEl = document.getElementById("restart");

// variable to keep track of question number
var questionNum = 0;
// sets time limit
var timer = 60;

var timerEl;

// question object
var questions = [
    {
      quest: "JavaScript is a ___ -side programming language.",
      options: ["Client", "Server", "Both", "None"],
      answer: "Both"
    },
    {
      quest: "Which of the following will write the message “Hello DataFlair!” in an alert box?",
      options: [" alertBox(“Hello DataFlair!”);", " alert(Hello DataFlair!);", "msgAlert(“Hello DataFlair!”);", "alert(“Hello DataFlair!”);"],
      answer: "alert(“Hello DataFlair!”);"
    },
    {
      quest: "How do you find the minimum of x and y using JavaScript?",
      options: ["min(x,y);","Math.min(x,y)","Math.min(xy)","min(xy);"],
      answer: "Math.min(x,y)"
    },
    {
      quest: "Which are the correct “if” statements to execute certain code if “x” is equal to 2?",
      options: ["if(x 2)", "if(x = 2)", "if(x == 2)", "if(x != 2 )"],
      answer: "if(x == 2)"
    },
    {
      quest: "What will the code return? Boolean(3 < 7)",
      options: ["True", "False", "NaN", "SyntaxError"],
      answer: "True"
    }
  ];


// Fuction to start the game. Hides the intro screen, shows the question section and sets/starts the timer  
function startGame() {
    
    introScrEl.setAttribute("class", "invis");

    viewScoreButEl.setAttribute("class", "invis");

    questSecEl.removeAttribute("class");

    timerEl = setInterval(stopWatch, 1000);

    timeEl.textContent = timer;

    askQuestion();

};

// Function to tick down the timer value and update the timer and end game if time runs out
function stopWatch() {
    timer--;
    timeEl.textContent = timer;
  
    // check if user ran out of time
    if (timer <= 0) {
      endGame();
    }
};

// Function to display each question
function askQuestion() {

    var questNum = questions[questionNum];
    questEl.textContent = questNum.quest;
    possAnswerEl.innerHTML = "";

// Loop to create buttons for each possible answer
    questNum.options.forEach(function(option, i) {
        var optionBut = document.createElement("button");
        optionBut.setAttribute("class", "game");
        optionBut.setAttribute("value", option);
        optionBut.textContent = i + 1 + ". " + option;
        optionBut.onclick = checkAns;

        possAnswerEl.appendChild(optionBut);
      });

};

// function to check if answer is right or wrong and respond accordingly
function checkAns(){
    if (this.value !== questions[questionNum].answer) {

        timer -= 10;

        if (timer < 0) {
            timer = 0;
        };

        timeEl.textContent = timer;

        messageEl.textContent ="Incorrect!";
        messageEl.setAttribute("class", "wrong");

    } else {

        messageEl.textContent = "Correct";
        messageEl.setAttribute("class", "right");

    };

    setTimeout(function() {messageEl.setAttribute("class", "right invis");}, 1000);

    questionNum++;

    if (questionNum === questions.length) {
        endGame();
    } else {
        askQuestion();
    };
};

// function to stop time, clear the questions off the page and show the end of game screen
function endGame(){
    clearInterval(timerEl);
    questSecEl.setAttribute("class", "invis");
    scoreEl.textContent = timer;
    finalEl.removeAttribute("class", "invis");
};

// function to add players score to the high score list
function highScore(){

    var initials = initInputEl.value;

    if (initials !== "" && initials.length <= 3) {
        var scoreList = JSON.parse(window.localStorage.getItem("scoreList")) || [];

        var playerScore = {
            score: timer,
            init: initials
        };

        scoreList.push(playerScore);
        window.localStorage.setItem("scoreList", JSON.stringify(scoreList));

        finalEl.setAttribute("class", "invis");
        timeBarEl.setAttribute("class", "invis");
        createScoreList();
        highScoresEl.removeAttribute("class", "invis");

    } else {
        document.getElementById('init').value = "";
        highScore;
    }
};

// function to display high score page
function createScoreList() {
    entry.innerHTML = "";
    scoreList = JSON.parse(window.localStorage.getItem("scoreList")) || [];
    
    scoreList.sort(function(a, b){
        return b.score - a.score;
    });

    scoreList.forEach(function(score) {
        var list = document.createElement("li");
        list.textContent = score.init + "-" + score.score;
        entry.appendChild(list);
    });

};

// function to view the high scores page
function viewScore() {
    introScrEl.setAttribute("class", "invis");
    viewScoreButEl.setAttribute("class", "invis");
    createScoreList();
    highScoresEl.removeAttribute("class", "invis");
};

// function to clear score list
function clear() {
    window.localStorage.removeItem("scoreList");
    top10.innerHTML = "";
    createScoreList();
};

// function to restart the application back to the starting page
function restart() {
    timer = 60;
    questionNum = 0;
    timeEl.textContent = timer;
    document.getElementById('init').value = "";
    viewScoreButEl.removeAttribute("class", "invis");
    highScoresEl.setAttribute("class", "invis");
    timeBarEl.setAttribute("class", "timer");
    introScrEl.setAttribute("class", "intro");
}

// detecting button clicks
startButEl.onclick = startGame;
subButEl.onclick = highScore;
clearButEl.onclick = clear;
backToStartEl.onclick = restart;
viewScoreButEl.onclick = viewScore;
