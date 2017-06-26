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
            headerName: document.getElementById('headerName'),
            commentOne: document.getElementById('articleComment-one'),
            commentTwo: document.getElementById('articleComment-two'),
            commentThree: document.getElementById('articleComment-three'),
            iconOne: document.getElementById('iconOne'),
            iconTwo: document.getElementById('iconTwo'),
            iconThree: document.getElementById('iconThree'),
            paragraphTwo: document.getElementById('paragraphTwo'),
            paragraphThree: document.getElementById('paragraphThree'),
            paragraphFour: document.getElementById('paragraphFour')
        }
    };

    var app = {
        init: function() { // Initializing the app and calling methods needed on startup
            console.log('app started :)');
            username.checkUsername();
            listDates.setDay();
            if(window.location.pathname != '/') { // page location check
                comments.initial();
            }
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
                // config.elements.dayOne.textContent = listDates.dayNames[date.getDay() - 1];
            }
        }
    };

    var comments = {
        initial: function() {
            comments.placeComment();
            comments.tab();
            config.elements.commentsList.innerHTML = '';
            socket.emit('insert comments');

        },
        placeComment: function(){
            config.elements.commentForm.addEventListener('submit', function(e){  // submit the comment form
                e.preventDefault();
                var messageObj = {};
                messageObj.comment = commentInput.value;
                messageObj.commentId = Math.floor((Math.random() * 1000000) + 1);
                messageObj.likes = 0;
                messageObj.user = localStorage.getItem('username');
                messageObj.articleId = window.location.pathname.replace(/^\/([^\/]*).*$/, '$1');
                messageObj.date = comments.date();
                socket.emit('place comment', messageObj); // send value to server
                commentInput.value = ''; // reset value to null
            });
            socket.on('place comment', function(msg) { // receive new comment from server
                var listItem = document.createElement('li'); // create list element in comment list
                var listButton = document.createElement('button');
                if (msg.articleId == window.location.pathname.replace(/^\/([^\/]*).*$/, '$1')) {
                    config.elements.commentsList.appendChild(listItem).innerHTML=msg.comment + '<span class="likes" id="id' + msg.commentId + '">' + 'Likes: ' + msg.likes + '</span><p class="author">Written by: ' + msg.user + '</p><button class="likeButton" id="' + msg.commentId +'">Like</button>'; // add comment to list
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
                tabContent('articleComment-one', 0);
                if (articleFilter[1]) {
                    tabContent('articleComment-two', 1);
                } if (articleFilter[2]) {
                    tabContent('articleComment-three', 2);
                }
                function tabContent(id, arr) {
                    document.getElementById(id).classList.remove('hide');
                    document.querySelector('#' + id + ' p').innerText=articleFilter[arr].comment;
                    document.querySelector('#' + id + ' span').innerText=articleFilter[arr].user + ' | ' + articleFilter[arr].date;

                }
            });
        },
        date: function() {
            var today = new Date();
            var day = today.getDate();
            var month = today.getMonth()+1; //January is 0!
            var year = today.getFullYear();
            today = day + '/' + month + '/' + year;
            return today;
        },
        tab: function() {
            config.elements.iconOne.addEventListener('click', function() {
                showComment(config.elements.commentOne, config.elements.paragraphTwo);
            });
            config.elements.iconTwo.addEventListener('click', function() {
                showComment(config.elements.commentTwo, config.elements.paragraphThree);
            });
            config.elements.iconThree.addEventListener('click', function() {
                showComment(config.elements.commentThree, config.elements.paragraphFour);
            });
            function showComment(id, p) {
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
                    config.elements.likeButton[i].addEventListener('click', likeClick);
                    config.elements.likeButton[i].classList.add("likeEvent");
                }
            }
            function likeClick() {
                socket.emit('like comment', this.id);
            }
            socket.on('update likes', function(id, likes) {
                console.log(id + ' ' + likes);
                document.getElementById('id' + id).innerText = 'Likes: ' + likes;
            });
        }
    };

    app.init();
})();
