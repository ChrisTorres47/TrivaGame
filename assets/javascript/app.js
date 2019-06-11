$(document).ready(function(){
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 15,
    timerOn: false,
    timerId : '',

    questions: {
      q1: 'Who claims to be a five star man?',
      q2: 'What is the name of the bar the "gang" owns?',
      q3: 'What does Charlie eat before bed?',
      q4: 'What is franks relation to Dennis and Dee?',
      q5: 'What is Mac a "master" of?',
      q6: 'What fantasy figure does charlie hate?',
      q7: "Who pooped the bed?"
    },
    options: {
      q1: ['Charlie', 'Mac', 'Dennis', 'Frank'],
      q2: ['Pattys pub', 'Longshots', 'Bradys Bar', 'Cheers'],
      q3: ['Dog food', 'Cat food', 'Bird food', 'Xanex'],
      q4: ['Uncle', 'Father', 'Family friend', 'Bar owner'],
      q5: ['Karate','Cooking','Fishing','Billiards'],
      q6: ['Tooth fairy','Boogy man','Santa Claus','Easter Bunny'],
      q7: ['Frank', 'Mac', 'Dee','Artamis']
    },
    answers: {
      q1: 'Dennis',
      q2: 'Pattys pub',
      q3: 'Cat food',
      q4: 'Father',
      q5: 'Karate',
      q6: 'Santa Claus',
      q7: 'Frank'
    },

    startGame: function(){
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      $('#start').hide();
      
      $('#game').show();
    
      $('#results').html('');
      
      $('#timer').text(trivia.timer);
      
      $('#remaining-time').show();
      
      trivia.nextQuestion();
      
    },
    nextQuestion : function(){
      
    
      trivia.timer = 15;

      $('#timer').text(trivia.timer);
      
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
      var questionAsked = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionAsked);
      
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      

      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },

    timerRunning : function(){

      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }

      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }

      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
        $('#results')
          .html('<h3>"Here are your results!"</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
        
        $('#game').hide();
        
        $('#start').show();
      }
      
    },
    guessChecker : function() {
      
      var resultId;
      
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      
      if($(this).text() === currentAnswer){

        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }
      else{
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Nope! The right answer was: '+ currentAnswer +'</h3>');
      }
      
    },
    guessResult : function(){
      
      trivia.currentSet++;
    
      $('.option').remove();
      $('#results h3').remove();
      
      trivia.nextQuestion();
       
    }
  
  }