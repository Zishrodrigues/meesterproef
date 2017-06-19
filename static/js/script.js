(function() {
    "use strict";

    var socket = io();

    var config = { //config object which stores needed elements & settings
        elements: {
            todayHeader: document.getElementById('todayHeader'),
            dayOne: document.getElementById('dayOne'),
            commentsList: document.getElementById('comments'),
            commentForm: document.getElementById('commentForm'),
            commentInput: document.getElementById('commentInput'),
            likeButton: document.getElementsByClassName('likeButton')
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
            config.elements.commentForm.addEventListener('submit', function(e){  // submit the comment form
                e.preventDefault();
                var messageObj = {};
                messageObj.comment = commentInput.value;
                messageObj.commentId = Math.floor((Math.random() * 1000000) + 1);
                messageObj.likes = 0;
                console.log(messageObj);
                var value = commentInput.value; // get the form comment form value
                socket.emit('place comment', messageObj); // send value to server
                value = ''; // reset value to null
            });
            socket.on('place comment', function(msg) { // receive new comment from server
                var listItem = document.createElement('li'); // create list element in comment list
                var listButton = document.createElement('button');
                config.elements.commentsList.appendChild(listItem).innerHTML=msg.comment + '<button class="likeButton" id="'+ msg.commentId +'">Like</button>'; // add comment to list
                comments.likeComment();
            });
            socket.on('place articleComment', function(msg) { // receive commentArray from server
                console.log(msg);
            });
        },
        likeComment: function() {
            for (var i = 0; i < config.elements.likeButton.length; i++) {
                if (!config.elements.likeButton[i].classList.contains('likeEvent')) {
                    config.elements.likeButton[i].addEventListener('click', likeComment);
                    config.elements.likeButton[i].classList.add("likeEvent");
                }
            }
            function likeComment() {
                console.log('kek');
            }
        }
    };

    app.init();
})();
