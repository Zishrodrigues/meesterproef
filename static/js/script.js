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
            paragraphFour: document.getElementById('paragraphFour'),
            articleSection: document.getElementById('articleSection'),
            commentSection: document.getElementById('commentSection'),
            showComments: document.getElementById('showSub'),
            showCommentsFixed: document.getElementById('showSubFixed')
        }
    };

    var app = {
        init: function() { // Initializing the app and calling methods needed on startup
            username.check();
            if(window.location.pathname != '/') { // page location check
                sidebar.openClose();
                comments.initial();
                sidebar.enable();
            }
        }
    };

    var username = {
        check: function() {
            if(!localStorage.getItem('username')) {
                username.enter();
            }
        },
        enter: function() {
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

    var sidebar = {
        enable: function() {
            if (window.innerWidth < 795 && window.innerWidth > 300) {
                console.log('sidebar enabled');
                sidebar.scrollButton();
                config.elements.articleSection.classList.add('slideable');
                config.elements.commentSection.classList.add('slide');
                config.elements.showComments.classList.remove('hide');
            } else {
                config.elements.articleSection.classList.remove('slideable');
                config.elements.commentSection.classList.remove('slide');
                config.elements.commentSection.classList.remove("opened");
                config.elements.showComments.innerText='Comments';
                config.elements.articleSection.classList.remove('slideLeft');
                config.elements.showComments.classList.add('hide');
            }
        },
        openClose: function() {
            config.elements.showComments.addEventListener('click', check, false);
            // config.elements.showCommentsFixed.addEventListener('click', check, false);
                function check() {
                    if (config.elements.commentSection.classList.contains('opened')) {
                        config.elements.commentSection.classList.remove("opened");
                        config.elements.articleSection.classList.remove('slideLeft');
                        document.body.style.overflow = 'auto';
                        config.elements.showComments.innerText='Comments';
                        config.elements.showComments.classList.remove('openFix');
                        console.log('1');
                    } else {
                        config.elements.commentSection.classList.add("opened");
                        config.elements.articleSection.classList.add('slideLeft');
                        document.body.style.overflow = 'hidden';
                        config.elements.showComments.innerText='close >';
                        config.elements.showComments.classList.add('openFix');
                        console.log('2');
                    }
                }
        },
        scrollButton: function() {
            // var top = 480;
            // var listener = function () {
            //     var y = window.pageYOffset;
            //
            //     if (y >= top) {
            //         config.elements.showComments.classList.add('fixedButton');
            //         // config.elements.showCommentsFixed.classList.remove('hide');
            //         console.log('fixed: D');
            //     } else {
            //         config.elements.showComments.classList.remove('fixedButton');
            //         // config.elements.showCommentsFixed.classList.add('hide');
            //         console.log('nixed: D');
            //     }
            // };
            // window.addEventListener('scroll', listener, false);
        }
    };

    var comments = {
        initial: function() {
            comments.place();
            comments.tab();
            config.elements.commentsList.innerHTML = '';
            socket.emit('insert comments');
            setTimeout(function(){
                comments.show(config.elements.commentOne, config.elements.paragraphTwo);
            }, 500);
        },
        place: function(){
            config.elements.commentForm.addEventListener('submit', function(e){  // submit the comment form
                e.preventDefault();
                var message = {};
                message.comment = commentInput.value;
                message.commentId = Math.floor((Math.random() * 1000000) + 1);
                message.likes = 0;
                message.user = localStorage.getItem('username');
                message.articleId = window.location.pathname.replace(/^\/([^\/]*).*$/, '$1');
                message.date = comments.date();
                socket.emit('place comment', message); // send value to server
                commentInput.value = ''; // reset value to null
            });
            socket.on('place comment', function(msg) { // receive new comment from server
                var listItem = document.createElement('li'); // create list element in comment list
                var listButton = document.createElement('button');
                if (msg.articleId == window.location.pathname.replace(/^\/([^\/]*).*$/, '$1')) {
                    listItem.setAttribute("id", msg.commentId);
                    config.elements.commentsList.appendChild(listItem).innerHTML=msg.comment + '<span class="likes" id="id' + msg.commentId + '">' + 'Likes: ' + msg.likes + '</span><p class="author">Written by: ' + msg.user + '</p><button class="likeButton" id="' + msg.commentId +'">Like</button><div class="floatIcon" id="icon' + msg.commentId + '"></div>'; // add comment to list
                    comments.like();
                }
            });
            socket.on('place articleComment', function(comments, clicked) { // receive commentArray from server
                var sorted = comments.sort(function(a, b) {
                    return parseFloat(b.likes) - parseFloat(a.likes);
                });
                var articleFilter = sorted.filter(function(val) {
                    return val.articleId == window.location.pathname.replace(/^\/([^\/]*).*$/, '$1');
                });
                iconFloat('articleComment-one', 0);
                tabContent('articleComment-one', 0);
                if (articleFilter[1]) {
                    iconFloat('articleComment-two', 1);
                    tabContent('articleComment-two', 1);
                } if (articleFilter[2]) {
                    iconFloat('articleComment-three', 2);
                    tabContent('articleComment-three', 2);
                }
                function iconFloat(id, arr){
                    if (clicked) {
                        if (document.querySelector('#' + id + ' p').innerText != articleFilter[arr].comment) {
                            var icon = document.getElementById('icon' + clicked);
                            icon.classList.add('iconFly');
                            setTimeout(function(){
                                icon.classList.remove('iconFly');
                            }, 3000);
                        }
                    }
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
                comments.show(config.elements.commentOne, config.elements.paragraphTwo);
            });
            config.elements.iconTwo.addEventListener('click', function() {
                comments.show(config.elements.commentTwo, config.elements.paragraphThree);
            });
            config.elements.iconThree.addEventListener('click', function() {
                comments.show(config.elements.commentThree, config.elements.paragraphFour);
            });
        },
        show: function(id, p) {
            if (id.classList.contains("openComment")) {
                id.classList.remove("openComment");
                p.style.paddingTop = '0em';
            } else {
                id.classList.add("openComment");
                p.style.paddingTop = id.offsetHeight + 20 + 'px';
            }
        },
        like: function() {
            for (var i = 0; i < config.elements.likeButton.length; i++) {
                if (!config.elements.likeButton[i].classList.contains('likeEvent')) {
                    config.elements.likeButton[i].addEventListener('click', likeClick);
                    config.elements.likeButton[i].classList.add("likeEvent");
                }
            }
            function likeClick() {
                socket.emit('like comment', this.id, window.location.pathname.replace(/^\/([^\/]*).*$/, '$1'));
            }
            socket.on('update likes', function(id, arr, article) {
                if (article == window.location.pathname.replace(/^\/([^\/]*).*$/, '$1')) {
                    document.getElementById('id' + id).innerText = 'Likes: ' + arr.likes;
                }
            });
        }
    };

    if(window.location.pathname != '/') { // page location check
        window.addEventListener('resize', function(){
            sidebar.enable();
        }, false);
    }

    app.init();
})();
