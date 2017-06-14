(function() {
    "use strict";

    var socket = io();

    var config = {
        elements: {
            todayHeader: document.getElementById('todayHeader'),
            dayOne: document.getElementById('dayOne'),
            commentsList: document.getElementById('comments'),
            commentForm: document.getElementById('commentForm'),
            commentInput: document.getElementById('commentInput')
        }
    };

    var app = {
        init: function() {
            console.log('app started :)');
            listDates.setDay();
            comments.placeComment();
        }
    };

    var listDates = {
        dayNames: [  'Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'],
        setDay: function() {
            var date = new Date();
            var dayName = listDates.dayNames[date.getDay()];
            if(window.location.pathname == '/') {
                config.elements.todayHeader.innerHTML = dayName;
                config.elements.dayOne.innerHTML = listDates.dayNames[date.getDay() - 1];
            }
        }
    };

    var comments = {
        placeComment: function(){
            config.elements.commentForm.onsubmit = function() {
                var value = commentInput.value;
                socket.emit('place comment', value);
                value = '';
                return false;
            };
            socket.on('place comment', function(msg) {
                var listItem = document.createElement('li');
                config.elements.commentsList.appendChild(listItem).innerHTML=(msg);
            });
        }
    };

    app.init();
})();
