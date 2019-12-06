const stats = {
    correct:0,
    incorrect:0,
    questions:0,
    questionsDone:0,
    currentAnswer:"",
}

function makeStats() {
    console.log("makeStats");
    stats.questions = STORE.questions.length; 
    stats.questionsDone = 1 + STORE.index;
}



function checkAnswers() {
    console.log("checkAnswers");
    $(".answers").on("click",()=>{
        let inputId = $(event.target).attr('id');
        stats.label = $(`label[for='${inputId}']`).html();     
        let correctAnswer = STORE.questions[STORE.index].correctAnswer;    

        if(stats.label === correctAnswer){
            stats.currentAnswer = "correct";
    

        }else if(stats.label !== correctAnswer){
            stats.currentAnswer = "incorrect";
        }
        
    });
    handleSubmit();
    
};

function handleSubmit(){
    console.log("handleSubmit");
    $(".Submit").on("click", event =>{
     event.preventDefault();
         
      
        if(stats.currentAnswer ===
          "correct") {
            renderCorrectResponse();
            stats.correct += 1;
        }else if(stats.currentAnswer ===
          "incorrect"){
            renderIncorrectResponse();
            stats.incorrect += 1;
        }
        
        STORE.index += 1;
        stats.currentAnswer = "";
       console.log("handleSubmit",stats);

     renderQuestions();    
    });
    
   
}


                    
function renderOptions(){
   console.log("renderOptions");
    return(
       STORE.questions[STORE.index].answers.map((question, i) => (
    `<div>
            <input type="radio" name="answers" value="A" id="option${i}">
            <label for="option${i}">${question}</label><br>
    </div>`
    )).join('')
       );
}

function renderQuestions() {
    console.log("renderQuestionsStatic");
makeStats();
    
    $("body").html(
        
            `<form class="form">
        
            <header class="js-question  question">${STORE.questions[STORE.index].question}</header>
               
            <div class="answers">

            ${renderOptions()}
            
        </div>

           
        <div class="js-stats stats">
          <div>
            <p class="correct">${stats.correct} out of 10 correct</p>
            <p class="incorrect">${stats.incorrect} out of 10 incorrect</p>
            <p class="questions">${stats.questionsDone} out of 10 questions</p>
          </div>
        </div>
    
    <button class="Submit">Submit</button>
    
    <button class="Reset Quiz">Reset </button>
 
 </form>`              
    );
    
    checkAnswers();
}



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
})