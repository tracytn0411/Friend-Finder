//---------- CLIENT-SIDE Javascript ------//

//Function to display /friends.json in home page (index.html)
//For testing purpose : check if sever is working
function getFriends() {
  $('#testing').empty();

  $.ajax({
    url: '/friends.json',
    method: 'GET'
  }).then(function (friends) {
    for (var friendIndex in friends) {
      //console.log(friendIndex);
      //console.log(friends[friendIndex]);
      var p = $('<p>');
      p.text(`id: ${friends[friendIndex].id}, friend name: ${friends[friendIndex].friend_name}, link: ${friends[friendIndex].picture_link}`);

      $('#testing').append(p);
    }
  })
}
getFriends();


//Function to attach radio buttons to each question and display on survey.html
getQuestions = () => {
  $.ajax({
      url: '/survey-questions',
      method: 'GET'
    })
    .then(function (questions) {
      for (let questionIndex in questions) {
        console.log(questionIndex);
        console.log(questions[questionIndex]);

        let surveySection = $('<fieldset>').addClass('form-group')
        let sQuestion = $('<h3>').text(`Question ${questions[questionIndex].id}. ${questions[questionIndex].question}`);
        let sRadio1 = $('<section>').addClass('form-check form-check-inline').append([
          $('<label>').addClass('form-check-label').attr('for', 'sRadio1').text('1'),
          $('<input>').addClass('form-check-input').attr({
            'type': 'radio',
            'value': 'op1',
            'id': 'sRadio1',
            'name': `question${questions[questionIndex].id}`
          })
        ])
        let sRadio2 = $('<section>').addClass('form-check form-check-inline').append([
          $('<label>').addClass('form-check-label').attr('for', 'sRadio2').text('2'),
          $('<input>').addClass('form-check-input').attr({
            'type': 'radio',
            'value': 'op2',
            'id': 'sRadio2',
            'name': `question${questions[questionIndex].id}`
          })
        ])
        let sRadio3 = $('<section>').addClass('form-check form-check-inline').append([
          $('<label>').addClass('form-check-label').attr('for', 'sRadio3').text('3'),
          $('<input>').addClass('form-check-input').attr({
            'type': 'radio',
            'value': 'op3',
            'id': 'sRadio3',
            'name': `question${questions[questionIndex].id}`
          })
        ])
        let sRadio4 = $('<section>').addClass('form-check form-check-inline').append([
          $('<label>').addClass('form-check-label').attr('for', 'sRadio4').text('4'),
          $('<input>').addClass('form-check-input').attr({
            'type': 'radio',
            'value': 'op4',
            'id': 'sRadio4',
            'name': `question${questions[questionIndex].id}`
          })
        ])
        let sRadio5 = $('<section>').addClass('form-check form-check-inline').append([
          $('<label>').addClass('form-check-label').attr('for', 'sRadio5').text('5'),
          $('<input>').addClass('form-check-input').attr({
            'type': 'radio',
            'value': 'op5',
            'id': 'sRadio5',
            'name': `question${questions[questionIndex].id}`
          })
        ])

        $('<div>').addClass('form-check')
        surveySection.append(sQuestion)
        surveySection.append([sRadio1, sRadio2, sRadio3, sRadio4, sRadio5])
        $('#insert_user').append(surveySection);
      }

      let surveyBtn = $('<div>').addClass('form-group').append(
        $('<button>').addClass('btn btn-info').text('Submit')
      )
      $('#insert_user').append(surveyBtn)
    })
}
getQuestions();