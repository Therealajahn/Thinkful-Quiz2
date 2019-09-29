

function makeContainers() {
    for(let i = 0; i < 10; i++) {
        let container = document.createElement('div');
       container.setAttribute("class", `container js-container-${i}`); 
        
       makeTriangles(i); document.body.appendChild(triangle);
       rotateTriangles(i, triangle);    
    }
}

function makeTriangles(index) {
    let triangle = document.createElement('div');
    triangle.setAttribute("class",`triangle js-triangle-${i}`)
}

function rotateTriangles(index, triangle) {
   let angle = index * Math.PI;
   triangle.style.transform =               "rotate(${angle}deg)";   
}


function incrementQuestions(){
    console.log(QUESTIONS[0].index);
    $(".Submit").on("click",()=>{
        event.preventDefault();
        QUESTIONS[0].index++;
        console.log(QUESTIONS[0].index)

        renderQuestions();
    });
    
    
}


function renderQuestions() {
    
    let question = `<header class='js-question question'>${QUESTIONS[QUESTIONS[0].index].question}</header>`
    
    $("form").html(question);
    
    renderAnswers();
}

function renderAnswers() {
    
    let answers = QUESTIONS[QUESTIONS[0].index].answers
    
    answers.forEach((item)=>{
        $("form").append(`<input type='radio' name="answers" class="answers" value='A'>${item}<br>`)
    })
    renderButtons();
}

function renderButtons() {
    
    let buttons = 
    QUESTIONS[QUESTIONS[0].index].buttons;
    
    $("form").append(`<div class="button-wrap></div>`)
    
    buttons.forEach((item)=>{
        $(".button-wrap").append(`
    
    <button class="${item}">${item}</button>`)
    })
    incrementQuestions();
}

$(()=>{
    renderQuestions();
})