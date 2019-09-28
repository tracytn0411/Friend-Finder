//---------- CLIENT-SIDE Javascript ------//

//For testing purpose : check if sever is working
  //Function to display /friends.json in home page (index.html)
  //? Status: Working -> Display on html properly, no error
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
      p.text(`id: ${friends[friendIndex].id}, friend name: ${friends[friendIndex].friend_name}, link: ${friends[friendIndex].picture_link}`)
      $('#testing').append(p);
    }
  })
}
getFriends();


//Function to build survey form for survey page
  //  *First section: input field to collect user name & photo link 
  getQuestions = () => {
    let nameSection = $('<div>').addClass('form-group').append([
      $('<label>').attr('for', 'inputName'),
      $('<input>').addClass('form-control').attr({
        'type': 'text',
        'name': 'friend_name',
        'id': 'inputName',
        'placeholder': 'Enter your name...'
      })
    ])
    let photoSection = $('<div>').addClass('form-group').append([
      $('<label>').attr('for', 'inputName'),
      $('<input>').addClass('form-control').attr({
        'type': 'text',
        'name': 'picture_link',
        'id': 'inputLink',
        'placeholder': 'Photo link...'
      })
    ])
    $('#insert_user').append(nameSection, photoSection)
    
  //  *Function to attach radio buttons to each question and display on survey.html
    //? Status: Working -> Radios display on html and work properly for each question
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

        // TODO: Find a way to minimize this part. Try to learn more ES6
        // for (let i=0; i<6; i++) {
        //   let sRadio = $('<section>').addClass()
        // }

        let sRadio1 = $('<section>').addClass('form-check form-check-inline').append([
          $('<label>').addClass('form-check-label').attr('for', 'sRadio1').text('1'),
          $('<input>').addClass('form-check-input').attr({
            'type': 'radio',
            'value': '1',
            'id': 'sRadio1',
            'name': `question${questions[questionIndex].id}`
          })
        ])
        let sRadio2 = $('<section>').addClass('form-check form-check-inline').append([
          $('<label>').addClass('form-check-label').attr('for', 'sRadio2').text('2'),
          $('<input>').addClass('form-check-input').attr({
            'type': 'radio',
            'value': '2',
            'id': 'sRadio2',
            'name': `question${questions[questionIndex].id}`
          })
        ])
        let sRadio3 = $('<section>').addClass('form-check form-check-inline').append([
          $('<label>').addClass('form-check-label').attr('for', 'sRadio3').text('3'),
          $('<input>').addClass('form-check-input').attr({
            'type': 'radio',
            'value': '3',
            'id': 'sRadio3',
            'name': `question${questions[questionIndex].id}`
          })
        ])
        let sRadio4 = $('<section>').addClass('form-check form-check-inline').append([
          $('<label>').addClass('form-check-label').attr('for', 'sRadio4').text('4'),
          $('<input>').addClass('form-check-input').attr({
            'type': 'radio',
            'value': '4',
            'id': 'sRadio4',
            'name': `question${questions[questionIndex].id}`
          })
        ])
        let sRadio5 = $('<section>').addClass('form-check form-check-inline').append([
          $('<label>').addClass('form-check-label').attr('for', 'sRadio5').text('5'),
          $('<input>').addClass('form-check-input').attr({
            'type': 'radio',
            'value': '5',
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