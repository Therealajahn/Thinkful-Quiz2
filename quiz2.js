const stats = {
    correct:0,
    incorrect:0,
    questions:0,
    questionsDone:0,
}

function makeStats() {
    
    stats.questions = STORE.questions.length;
    
    stats.questionsDone = 
    (stats.questions + 1)- (stats.questions - STORE.index);    
}

//function makeContainers() {
//    for(let i = 0; i < 10; i++) {
//        let container = document.createElement('div');
//       container.setAttribute("class", `container js-container-${i}`); 
//        
//       makeTriangles(i); document.body.appendChild(triangle);
//       rotateTriangles(i, triangle);    
//    }
//}
//
//function makeTriangles(index) {
//    let triangle = document.createElement('div');
//    triangle.setAttribute("class",`triangle js-triangle-${i}`)
//}
//
//function rotateTriangles(index, triangle) {
//   let angle = index * Math.PI;
//   triangle.style.transform =               "rotate(${angle}deg)";   
//}


function handleSubmit(){
    
    $(".Submit").on("click",()=>{
        event.preventDefault();
        if(stats.questionsDone < stats.questions)
    
        if(stats.currentAnswer ===
          "correct") {
            renderCorrectResponse();
        }else{
            renderIncorrectResponse();
        }
//        renderStats();
//        renderQuestions();
        
    });
    
    
}


function renderQuestions() {
    
    let question = `<header class='js-question question'>${STORE.questions[STORE.index].question}</header>`
    
    $(".flex").html(question);
    
    renderAnswers();
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

function checkAnswers() {
    
    $(".answers").on("click",()=>{
        let inputId = $(event.target).attr('id');
        stats.label = $(`label[for='${inputId}']`).html();     
        let correctAnswer = STORE.questions[STORE.index].correctAnswer;    

        if(stats.label === correctAnswer){
            stats.currentAnswer = "correct";

        }else{
            stats.currentAnswer = "incorrect";
        }
    });
    
    
};

function renderCorrectResponse(){
    
    $("form").addClass("js-turn-blue");
    $("form").html(` <header class='js-question question'>:</header>`);
    stats.responseRendered = true;
    
    
}

function renderIncorrectResponse() {
    
    $("form").addClass("js-turn-red");
    stats.responseRendered = true;
}


$(()=>{
    renderQuestions();
    checkAnswers();
})