//---------- CLIENT-SIDE Javascript ------//

//Function to build survey form for survey page
  //  *First section: input field to collect user name & photo link 
  getQuestions = () => {
    let nameSection = $('<div>').addClass('form-group').append([
      $('<label>').attr('for', 'inputName').text('Your Name'),
      $('<input>').addClass('form-control').attr({
        'type': 'text',
        'name': 'friend_name',
        'id': 'inputName',
        'placeholder': 'Enter your name...'
      })
    ])
    let photoSection = $('<div>').addClass('form-group mb-5').append([
      $('<label>').attr('for', 'inputLink').text('Your Photo Link'),
      $('<input>').addClass('form-control').attr({
        'type': 'text',
        'name': 'picture_link',
        'id': 'inputLink',
        'placeholder': 'Photo link...'
      })
    ])
    var surveyIntro = $('<h3>').text('Please answer the following questions: ')
    $('#insert_user').append(nameSection, photoSection, surveyIntro)
    
  //  *Function to attach radio buttons to each question and display on survey.html
    //? Status: Working -> Radios display on html and work properly for each question
  $.ajax({
      url: '/questions.json',
      method: 'GET'
    })
    .then(function (questions) {
      for (let questionIndex in questions) {
        console.log(questionIndex);
        console.log(questions[questionIndex]);

        let surveySection = $('<fieldset>').addClass('form-group')
        let sQuestion = $('<h4>').text(`Question ${questions[questionIndex].id}. ${questions[questionIndex].question}`);

        // TODO: Find a way to minimize this part. Try to learn more ES6
        // for (let i=0; i<6; i++) {
        //   let sRadio = $('<section>').addClass()
        // }

        let sRadio1 = $('<section>').addClass('form-check form-check-inline').append([
          $('<input>').addClass('form-check-input').attr({
            'type': 'radio',
            'value': '1',
            'id': 'sRadio1',
            'name': `question${questions[questionIndex].id}`
          }),
          $('<label>').addClass('form-check-label').attr('for', 'sRadio1').text('1'),
        ])
        let sRadio2 = $('<section>').addClass('form-check form-check-inline').append([
          $('<input>').addClass('form-check-input').attr({
            'type': 'radio',
            'value': '2',
            'id': 'sRadio2',
            'name': `question${questions[questionIndex].id}`
          }),
          $('<label>').addClass('form-check-label').attr('for', 'sRadio2').text('2'),
        ])
        let sRadio3 = $('<section>').addClass('form-check form-check-inline').append([
          $('<input>').addClass('form-check-input').attr({
            'type': 'radio',
            'value': '3',
            'id': 'sRadio3',
            'name': `question${questions[questionIndex].id}`
          }),
          $('<label>').addClass('form-check-label').attr('for', 'sRadio3').text('3'),
        ])
        let sRadio4 = $('<section>').addClass('form-check form-check-inline').append([
          $('<input>').addClass('form-check-input').attr({
            'type': 'radio',
            'value': '4',
            'id': 'sRadio4',
            'name': `question${questions[questionIndex].id}`
          }),
          $('<label>').addClass('form-check-label').attr('for', 'sRadio4').text('4'),
        ])
        let sRadio5 = $('<section>').addClass('form-check form-check-inline').append([
          $('<input>').addClass('form-check-input').attr({
            'type': 'radio',
            'value': '5',
            'id': 'sRadio5',
            'name': `question${questions[questionIndex].id}`
          }),
          $('<label>').addClass('form-check-label').attr('for', 'sRadio5').text('5'),
        ])

        $('<div>').addClass('form-check')
        surveySection.append(sQuestion)
        surveySection.append([sRadio1, sRadio2, sRadio3, sRadio4, sRadio5])
        $('#insert_user').append(surveySection);
      }

      let surveyBtn = $('<div>').addClass('form-group submitBtn').append(
        $('<button>').addClass('btn btn-info').text('Submit')
      )
      $('#insert_user').append(surveyBtn)
    })
}
getQuestions();


$(document).on('click', '.submitBtn', function(){
  
  event.preventDefault()
  var newName = $('#inputName').val()
  var newLink = $('input[name = "picture_link"]').val()
  console.log(newName)
  console.log(newLink)
  var newScores =[]
  for (var i = 1; i <=8; i++ ){ 
    newScores.push(parseInt($('input[name = question' + i + ']:checked').val(),10))
  }
  console.log(newScores)
  
  $.ajax({ // in the data: object, I needed to put book_name as the key because we need req.body.book_name to exist
    url: '/api/friends',
    method: 'POST',
    data: {
      friend_name : newName,
      picture_link : newLink,
      scores : JSON.stringify(newScores) //convert scores array to JSON
    }
  })
  .then(function (response) {
    
      var matchFriend = response[0].friend_name;
      //console.log(friendObs[0].friend_name)
      var matchLink = response[0].link;
      console.log(matchLink);

      var divModal = $('<div>').addClass('modal-dialog').attr('role', 'document').append(
        $('<div>').addClass('modal-content')
      )

      var modalHeader = $('<div>').addClass('modal-header').append([
        $('<h4>').addClass('modal-title text-info').text('Your match result'),
        $('<button>').addClass('close').attr({
          'type': 'button',
          'data-dismiss' : 'modal',
          'aria-label' : 'close'
        }).append($('<span aria-hidden = "true">&times;</span>'))
      ]);

      var modalBody = $('<div>').addClass('modal-body').append([
        $('<h5>').text(matchFriend).addClass('friend-name-modal pb-2'),
        $('<img>').addClass('img-fluid').attr('src', matchLink)
      ]);

      var modalFooter = $('<div>').addClass('modal-footer').append(
        $('<button>').addClass('btn btn-secondary').attr('data-dismiss','modal').text('Close')
      )

      divModal.append(modalHeader, modalBody, modalFooter);
      $('#resultModal').append(divModal);
      $('#resultModal').modal('show'); //call open result model
      
      //Redirect to homepage after exit the result modal
      $(".modal").on("hidden.bs.modal", function () {
        window.location = '/';
    });
    })
    
})
