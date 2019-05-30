(function() 
 {
  var allQuestions = [{
    question: "Co to jest IP?",
    options: ["Internet Practice", "Mail", "Internet Protocol", "Informacja Publiczna"],
    answer: 2
  }, {
    question: "Co to jest VPS?",
    options: ["Virtual Private Server", "Vincent van Gogh", "Pozycja w Internecie", "Numer Telefonu"],
    answer: 0
  }, {
    question: "Ile jest rodzaji Paint'ów?",
    options: ["1", "2", "3","4"],
    answer: 1
  },{
    question: "Co to jest HTML?",
    options: ["Hypertext Markup Language", "Paragraf", "Symbol", "Waga"],
    answer: 0
  }, {
    question: "W jakiej pamięci znajduje się BIOS?",
    options: ["RAM", "ROM", "Cache", "GB"],
    answer: 1
  },{
    question: "Co przeprowadza test POST?",
    options: ["BIOS", "Pamiec RAM", "Pamiec Cache", "ROM"],
    answer: 0
  },{
    question: "Formaty plików takie jak MP4, AVI oraz MOV są to formaty plików...",
    options: ["Wideo", "Muzyki", "Grafiki", "Tekstu"],
    answer: 0
  },{
    question: "Jeden bajt to...",
    options: ["6 bitów", "10 bitów", "64 bity", "8 bitów"],
    answer: 3
  },{
    question: "Jaka litera odpowiada za podkreślenie tekstu w języku HTML?",
    options: ["B", "I", "U", "P"],
    answer: 2
  },{
    question: "Wyszukując jakiś plik, jakim znakiem zastąpimy dowolny ciąg znaków?",
    options: ["*", "$", "#", "@"],
    answer: 0
    }];
  
  var quesCounter = 0;
  var selectOptions = [];
  var quizSpace = $('#quiz');
    
  nextQuestion();
    
  $('#next').click(function () 
    {
        chooseOption();
        if (isNaN(selectOptions[quesCounter])) 
        {
            alert('Please select an option !');
        } 
        else 
        {
          quesCounter++;
          nextQuestion();
        }
    });
  
  $('#prev').click(function () 
    {
        chooseOption();
        quesCounter--;
        nextQuestion();
    });
  
  function createElement(index) 
    {
        var element = $('<div>',{id: 'question'});
        var header = $('<h2>Pytanie nr. ' + (index + 1) + ' :</h2>');
        element.append(header);

        var question = $('<p>').append(allQuestions[index].question);
        element.append(question);

        var radio = radioButtons(index);
        element.append(radio);

        return element;
    }
  
  function radioButtons(index) 
    {
        var radioItems = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < allQuestions[index].options.length; i++) {
          item = $('<li>');
          input = '<input type="radio" name="answer" value=' + i + ' />';
          input += allQuestions[index].options[i];
          item.append(input);
          radioItems.append(item);
        }
        return radioItems;
  }
  
  function chooseOption() 
    {
        selectOptions[quesCounter] = +$('input[name="answer"]:checked').val();
    }
   
  function nextQuestion() 
    {
        quizSpace.fadeOut(function() 
            {
              $('#question').remove();
              if(quesCounter < allQuestions.length)
                {
                    var nextQuestion = createElement(quesCounter);
                    quizSpace.append(nextQuestion).fadeIn();
                    if (!(isNaN(selectOptions[quesCounter]))) 
                    {
                      $('input[value='+selectOptions[quesCounter]+']').prop('checked', true);
                    }
                    if(quesCounter === 1)
                    {
                      $('#prev').show();
                    } 
                    else if(quesCounter === 0)
                    {
                      $('#prev').hide();
                      $('#next').show();
                    }
                }
              else 
                {
                    var scoreRslt = displayResult();
                    quizSpace.append(scoreRslt).fadeIn();
                    $('#next').hide();
                    $('#prev').hide();
                }
        });
    }
  
  function displayResult() 
    {
        var score = $('<p>',{id: 'question'});
        var correct = 0;
        for (var i = 0; i < selectOptions.length; i++) 
        {
          if (selectOptions[i] === allQuestions[i].answer) 
          {
            correct++;
          }
        }
        score.append('Twoj wynik to ' + correct + ' z ' +allQuestions.length);
        return score;
  }
})();