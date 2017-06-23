(function() {

    var socket = io();

    var config = { //config object which stores needed elements & settings
        elements: {
            todayHeader: document.getElementById('todayHeader'),
            dayOne: document.getElementById('dayOne'),
            overlay: document.getElementById('overlay'),
            userForm: document.getElementById('userForm'),
            username: document.getElementById('username'),
            commentsList: document.getElementById('comments'),
            commentForm: document.getElementById('commentForm'),
            commentInput: document.getElementById('commentInput'),
            likeButton: document.getElementsByClassName('likeButton'),
            commentOne: document.getElementById('articleComment-one'),
            commentTwo: document.getElementById('articleComment-two'),
            commentThree: document.getElementById('articleComment-three'),
            iconTwo: document.getElementById('iconTwo'),
            iconThree: document.getElementById('iconThree'),
            paragraphTwo: document.getElementById('paragraphTwo'),
            paragraphThree: document.getElementById('paragraphThree')
        }
    };

    var app = {
        init: function() { // Initializing the app and calling methods needed on startup
            console.log('app started :)');
            username.checkUsername();
            listDates.setDay();
            comments.placeComment();
            comments.tab();
        }
    };

    var username = {
        checkUsername: function() {
            if(!localStorage.getItem('username')) {
                username.enterUsername();
            }
        },
        enterUsername: function() {
            config.elements.overlay.classList.remove("hide");
            config.elements.userForm.addEventListener("submit", function(e){
                e.preventDefault();
                localStorage.setItem('username', config.elements.username.value);
                console.log('Your nickname is ' + config.elements.username.value);
                config.elements.overlay.classList.add("hide");
            });
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
                if (msg.articleId == window.location.pathname.replace(/^\/([^\/]*).*$/, '$1')) {
                    config.elements.commentsList.appendChild(listItem).innerHTML=msg.comment + '<button class="likeButton" id="'+ msg.commentId +'">Like</button>'; // add comment to list
                    comments.likeComment();
                }
            });
            socket.on('place articleComment', function(comments) { // receive commentArray from server
                var sorted = comments.sort(function(a, b) {
                    return parseFloat(b.likes) - parseFloat(a.likes);
                });
                var articleFilter = sorted.filter(function(val) {
                    return val.articleId == window.location.pathname.replace(/^\/([^\/]*).*$/, '$1');
                });
                console.log(sorted);
                console.log(articleFilter);
                config.elements.commentOne.innerText=articleFilter[0].comment;
                if (articleFilter[1]) {
                    config.elements.commentTwo.innerText=articleFilter[1].comment;
                } if (articleFilter[2]) {
                    config.elements.commentThree.innerText=articleFilter[2].comment;
                }
            });
        },
        tab: function() {
            config.elements.iconTwo.addEventListener('click', function() {
                showComment(config.elements.commentTwo, config.elements.paragraphTwo);
            });
            config.elements.iconThree.addEventListener('click', function() {
                showComment(config.elements.commentThree, config.elements.paragraphThree);
            });
            function showComment(id, p) {
                console.log(id.offsetHeight);
                if (id.classList.contains("openComment")) {
                    id.classList.remove("openComment");
                    p.style.paddingTop = '1em';
                } else {
                    id.classList.add("openComment");
                    p.style.paddingTop = id.offsetHeight + 20 + 'px';
                }
            }
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
