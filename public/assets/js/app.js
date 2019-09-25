//---------- CLIENT-SIDE Javascript ------//

//Function to display /friends.json in home page (index.html)
  // For testing purpose : check if sever is working
// function getFriends() {
//   $('#testing').empty();

//   $.ajax({
//     url: '/friends.json',
//     method: 'GET'
//   }).then(function (friends) {
//     for (var friendIndex in friends) {
//       console.log(friendIndex);
//       console.log(friends[friendIndex]);
//       var p = $('<p>');
//       p.text(`id: ${friends[friendIndex].id}, friend name: ${friends[friendIndex].friend_name}, link: ${friends[friendIndex].picture_link}`);

//       $('#testing').append(p);
//     }
//   })
// }
// getFriends();

//Function to pass user input to database
  // button class (.btn) on.click won't work here. Need to use form id (#)
// $("#insert_user").submit(function (event) {
//   event.preventDefault(); // avoid to execute the actual submit of the form
//   var un = $('#insert_user input[name = "friend_name"]').val();
//   var up = $('#insert_user input[name = "picture_link"]').val();
//   console.log(un);
//   console.log(up);

//   $.ajax({
//     url: '/user-input',
//     method: 'GET',
//     data: {
//       friend_name: un,
//       picture_link: up,
//     }
//   }).then(function (message) {
//     getFriends();
//   })
// })