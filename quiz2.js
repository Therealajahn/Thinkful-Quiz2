const stats = {
    correct:0,
    incorrect:0,
    questions:0,
    questionsDone:0,
    currentAnswer:"no answer",
    score:100,
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
            stats.score -= 10;
        }
        
    });
    handleSubmit();
    
};

function handleSubmit(){
    console.log("handleSubmit");
    $(".Submit").on("click", event =>{
     event.preventDefault();
         console.log("store index:",STORE.index);
        if(STORE.index === (STORE.questions.length - 1)){
            endOfQuiz();
        }else{
            if(stats.currentAnswer ===
              "correct") {
                stats.correct += 1;
                renderCorrectResponse();
            }else if(stats.currentAnswer ===
              "incorrect"){
                stats.incorrect += 1;
                renderIncorrectResponse();
            }else if(stats.currentAnswer ===
                    "no answer"){
                renderNoAnswer();
            }
        };
        
       stats.currentAnswer = "no answer";
       console.log("handleSubmit",stats);

         
    });
    
   
}


                    
function renderOptions(){
   console.log("renderOptions");
    return(
       STORE.questions[STORE.index].answers.map((question, i) => (
    `<section>
            <input type="radio" name="answers" value="A" id="option${i}">
            <label for="option${i}">${question}</label><br>
    </section>`
    )).join('')
       );
}

function renderQuestions() {
    console.log("renderQuestionsStatic");
makeStats();
    $(".form").empty();
    $(".form").html(
        
            
        
            `<header class="js-question  question">${STORE.questions[STORE.index].question}</header>
               
            <section class="answers">

            ${renderOptions()}
            
        </section>

           
        <footer class="js-stats stats">
          <section>
            <p class="correct">${stats.correct} out of 10 correct</p>
            <p class="incorrect">${stats.incorrect} out of 10 incorrect</p>
            <p class="questions">${stats.questionsDone} out of 10 questions</p>
            <p class="score">Score:${stats.score}%</p>
          </section>
        </footer>
    
    <button class="Submit">Submit</button>
    
   
 
 </form>`              
    );
    
    checkAnswers();
}

function handleMoveOnClick(){
    $(".move-on").on("click",()=>{
        event.preventDefault();
        STORE.index += 1;
        renderQuestions();
    })
    
}

function renderCorrectResponse(){
    console.log("renderCorrectResponse");
     STORE.status = "aside";
     STORE.questions[STORE.index].question.response 
    $(".form").empty();
     $(".form").html(
        
            `
            <header class="js-question  question">Correct</header>
               
            <div class="answers">

            You got it!
            
        </div>

      <div class="js-stats stats">
          <div>
            <p class="correct">${stats.correct} out of 10 correct</p>
            <p class="incorrect">${stats.incorrect} out of 10 incorrect</p>
            <p class="questions">${stats.questionsDone} out of 10 questions</p>
            <p class="score">Score:${stats.score}%</p>
          </div>
        </div>     
        
    
    <button class="move-on">Move On</button>
    
  
    `              
    );
   handleMoveOnClick();
   
}

function renderIncorrectResponse() {
    console.log("renderIncorrectResponse");
     $(".form").empty();
     $(".form").html(
        
        `<header class="js-question  question">Incorrect</header>
               
        <div class="answers">

            Im gonna have to dock ya 10 points.
            
        </div>

        <div class="js-stats stats">
          <div>
            <p class="end-result">${stats.correct} out of 10 correct</p>
            <p class="end-result">${stats.incorrect} out of 10 incorrect</p>
            <p class="end-result">${stats.questionsDone} out of 10 questions</p>
            <p class="end-result">Score:${stats.score}%</p>          
           </div>
        </div>
           
        
    
    <button class="move-on">Move On</button>
    

    `              
    );
   handleMoveOnClick();
}

function handleGoBackClick(){
    $(".go-back").on("click", () => {
        renderQuestions();
    })
}

function renderNoAnswer() {
    console.log("renderNoResponse");
     $(".form").empty();
     $(".form").html(
        
        `<header class="js-question  question">Not So Fast</header>
               
        <div class="answers">

            Please chooose an option, bud
            
        </div>

        <div class="js-stats stats">
          <div>
            <p class="correct">${stats.correct} out of 10 correct</p>
            <p class="incorrect">${stats.incorrect} out of 10 incorrect</p>
            <p class="questions">${stats.questionsDone} out of 10 questions</p>
            <p class="score">Score:${stats.score}%</p>
           </div>
        </div>
           
        
    
    <button class="go-back">Go Back</button>
    
    
    `              
    );
   handleGoBackClick();
}

function endOfQuiz(){
   console.log("endOfQuiz")
    $(".form").empty();
     $(".form").html(
        
        `<header class="js-question  question">You Finished</header>


        <div class="js-stats-end stats-end">
          <div>
            <h1 class="score">Score:${stats.score}%</h1>
            <h2 class="correct">${stats.correct} out of 10 correct</h2>
            <h2 class="incorrect">${stats.incorrect} out of 10 incorrect</h2>
           </div>
          <p> To be fair, this quiz was pretty obscure
        </div>
           
        
    

    
    <button class="Reset Quiz">Reset Quiz</button>
    `              
    );
   
}




$(()=>{
    renderQuestions();
})