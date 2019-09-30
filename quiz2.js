const stats = {
    correct:0,
    incorrect:0,
    questions:0,
    questionsDone:0,
}

function makeStats() {
    stats.questions = STORE.questions.length;
    stats.questionsDone = 
    stats.questions - (stats.questions - STORE.index);    
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


function incrementQuestions(){
    
    $(".Submit").on("click",()=>{
        event.preventDefault();
        STORE.index += 1;
        makeStats();
        renderQuestions();
    });
    
    
}


function renderQuestions() {
    
    let question = `<header class='js-question question'>${STORE.questions[STORE.index].question}</header>`
    
    $(".flex").html(question);
    
    renderStats();
}

function renderStats(){
    
    makeStats();
    
    let correct = stats.correct;
    let incorrect = stats.incorrect;
    let questions = stats.questions;
    let questionsDone = stats.questionsDone;
    
    $(".flex").append(`<p class="correct">${correct} out of ${questions} correct</p>
            <p class="incorrect">${incorrect} out of ${questions} incorrect</p>
            <p class="questions">${questionsDone} out of ${questions} questions</p>`);
    
    renderAnswers(); 
}

function renderAnswers() {
    
    let answers = STORE.questions[STORE.index].answers
    
    answers.forEach((item)=>{
        $(".flex").append(`<div class="answers">
<input type='radio' name="answers" value='A'><label for="answers">${item}</label>\</div>`)
    })
    renderButtons();
}

function renderButtons() {
    
    let buttons = 
    STORE.questions[STORE.index].buttons;
    
    
    buttons.forEach((item)=>{
        $("form").append(`
    
    <button class="${item}">${item}</button>`)
    })
    incrementQuestions();
}

$(()=>{
    renderQuestions();
})