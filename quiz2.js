const stats = {
    correct:0,
    incorrect:0,
    questions:0,
    questionsDone:0,
}

function makeStats() {
    console.log("makeStats");
    stats.questions = STORE.questions.length;
    
    stats.questionsDone = 
    (stats.questions + 1)- (stats.questions - STORE.index);    
}




function handleSubmit(){
    console.log("handleSubmit");
    $(".Submit").on("click",event =>{
     event.preventDefault();
         
    
        if(stats.currentAnswer ===
          "correct") {
            renderCorrectResponse();
            stats.correct =+ 1;
        }else{
            renderIncorrectResponse();
            stats.incorrect =+ 1
        }
       console.log("handleSubmit",stats);
//        renderStats();
//        renderQuestions();
        
    });
    
   renderQuestions(); 
}



function renderAnswers() {
    
    let answers = STORE.questions[STORE.index].answers
    
    $(".flex").append('<div class="answers"></div>')
    
    answers.forEach((item,index)=>{
        $(".answers").append(`
<input type='radio' name="answers" value='A' id="option${index}" ><label for="option${index}">${item}</label><br>`)
    })
            
    renderStats();
};
                     
function renderStats(){
    
    makeStats();
    
    let correct = stats.correct;
    let incorrect = stats.incorrect;
    let questions = stats.questions;
    let questionsDone = stats.questionsDone;
    
    $("form").append("<div class='js-stats'></div>")
    
    $(".js-stats").html(`<p class="correct">${correct} out of ${questions} correct</p>
            <p class="incorrect">${incorrect} out of ${questions} incorrect</p>
            <p class="questions">${questionsDone} out of ${questions} questions</p>`);
    
     renderButtons();
}
function renderButtons() {
    
    let buttons = 
    STORE.questions[STORE.index].buttons;
    
    
    buttons.forEach((item)=>{
        $("form").append(`
    
    <button class="${item}">${item}</button>`)
    })
    handleSubmit();
}

function renderQuestions() {
    console.log("renderQuestionsStatic");
    let options = STORE.questions[STORE.index].answers.map((question, i) => (
    `<div>
            <input type="radio" name="answers" value="A" id="option${i}">
            <label for="option${i}">${question}</label><br>
    </div>`
    ))
    $("body").html(
        
            `<form class="form">
        
            <header class="js-question  question">${STORE.questions[STORE.index].question}</header>
               
            <div class="answers">

            ${options.join('')}
            
        </div>

           
        <div class="js-stats stats">
          <div>
            <p class="correct">${stats.correct} out of 10 correct</p>
            <p class="incorrect">${stats.incorrect} out of 10 incorrect</p>
            <p class="questions">${stats.questions} out of 10 questions</p>
          </div>
        </div>
    
    <button class="Submit">Submit</button>
    
    <button class="Reset Quiz">Reset </button>
 
 </form>`              
    );
}

function checkAnswers() {
    console.log("checkAnswers");
    $(".answers").on("click",()=>{
        let inputId = $(event.target).attr('id');
        stats.label = $(`label[for='${inputId}']`).html();     
        let correctAnswer = STORE.questions[STORE.index].correctAnswer;    

        if(stats.label === correctAnswer){
            stats.currentAnswer = "correct";

        }else{
            stats.currentAnswer = "incorrect";
        }
        console.log("check-answers",stats);
    });
    
    
};

function renderCorrectResponse(){
    console.log("renderCorrectResponse");
//    $("form").addClass("js-turn-blue");
//    $("form").html(` <header class='js-question question'>:</header>`);
    stats.responseRendered = true;
    
    
}

function renderIncorrectResponse() {
    console.log("renderIncorrectResponse");
    $("form").addClass("js-turn-red");
    stats.responseRendered = true;
}


$(()=>{
    renderQuestions();
    checkAnswers();
    handleSubmit();
})