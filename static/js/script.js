(function() {
    "use strict";

    var socket = io();

    var config = { //config object which stores needed elements & settings
        elements: {
            todayHeader: document.getElementById('todayHeader'),
            dayOne: document.getElementById('dayOne'),
            commentsList: document.getElementById('comments'),
            commentForm: document.getElementById('commentForm'),
            commentInput: document.getElementById('commentInput')
        }
    };

    var app = {
        init: function() { // Initializing the app and calling methods needed on startup
            console.log('app started :)');
            listDates.setDay();
            comments.placeComment();
        }
    };

    var listDates = {
        dayNames: [  'Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'], // storing week names to match to day number
        setDay: function() {
            var date = new Date(); // get date
            var dayName = listDates.dayNames[date.getDay()]; // get day number and match to dayNames array. (0 = sunday etc)
            if(window.location.pathname == '/') { // page location check
                config.elements.todayHeader.textContent = dayName; // Add day name to list
                config.elements.dayOne.textContent = listDates.dayNames[date.getDay() - 1];
            }
        }
    };

    var comments = {
        placeComment: function(){
            config.elements.commentForm.onsubmit = function() { // submit the comment form
                var value = commentInput.value; // get the form comment form value
                socket.emit('place comment', value); // send value to server
                value = ''; // reset value to null
                return false;
            };
            socket.on('place comment', function(msg) { // receive new comment from server
                var listItem = document.createElement('li'); // create list element in comment list
                config.elements.commentsList.appendChild(listItem).textContent=msg; // add comment to list
            });
        }
    };

    app.init();
})();
