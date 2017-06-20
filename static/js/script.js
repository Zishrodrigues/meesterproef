(function() {

    var socket = io();

    var config = { //config object which stores needed elements & settings
        elements: {
            todayHeader: document.getElementById('todayHeader'),
            dayOne: document.getElementById('dayOne'),
            commentsList: document.getElementById('comments'),
            commentForm: document.getElementById('commentForm'),
            commentInput: document.getElementById('commentInput'),
            likeButton: document.getElementsByClassName('likeButton'),
            commentOne: document.getElementById('articleComment-one'),
            commentTwo: document.getElementById('articleComment-two'),
            commentThree: document.getElementById('articleComment-three')
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
                messageObj.articleId =  window.location.pathname.replace(/^\/([^\/]*).*$/, '$1');
                console.log(messageObj);
                socket.emit('place comment', messageObj); // send value to server
                commentInput.value = ''; // reset value to null
            });
            socket.on('place comment', function(msg) { // receive new comment from server
                var listItem = document.createElement('li'); // create list element in comment list
                var listButton = document.createElement('button');
                config.elements.commentsList.appendChild(listItem).innerHTML=msg.comment + '<button class="likeButton" id="'+ msg.commentId +'">Like</button>'; // add comment to list
                comments.likeComment();
            });
            socket.on('place articleComment', function(comments) { // receive commentArray from server
                var sorted = comments.sort(function(a, b) {
                    return parseFloat(b.likes) - parseFloat(a.likes);
                });
                console.log(sorted);
                config.elements.commentOne.innerText=sorted[0].comment;
                if (sorted[1]) {
                    config.elements.commentTwo.innerText=sorted[1].comment;
                } if (sorted[2]) {
                    config.elements.commentThree.innerText=sorted[2].comment;
                }
            });
        },
        articleComment: function(sorted) {
            console.log(sorted);
        },
        likeComment: function() {
            for (var i = 0; i < config.elements.likeButton.length; i++) {
                if (!config.elements.likeButton[i].classList.contains('likeEvent')) {
                    config.elements.likeButton[i].addEventListener('click', likeComment);
                    config.elements.likeButton[i].classList.add("likeEvent");
                }
            }
            function likeComment() {
                console.log('clicked like button ' + this.id);
                socket.emit('like comment', this.id);
            }
        }
    };

    app.init();
})();
