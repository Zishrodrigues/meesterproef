# Comments | (Meesterproef - Persgroep articles web app)
![comments-logo](https://raw.githubusercontent.com/zishrodrigues/meesterproef/master/readme-files/logo.jpg)

Zishan K. Pasha | V 1.0.0 | [Live link](https://meesterproef-yveaamopsy.now.sh/)

![persgroep-logo](https://raw.githubusercontent.com/zishrodrigues/meesterproef/master/readme-files/pg-logo.png)

Index of this readme:
* Project description
* Concept
* Course implementation
* Project progress
* Looking back (reflection)
* Features (moscow)
* Data
* Install guide
* Sources

## Project description

The Persgroep is concepting a app/website that allows young users (20-30) to post articles and browse/read them. So it's articles by younger people for younger people. The goal is to have content which appeals to younger users because it's written by they're peers. And the ability to browse through comments and post them in an interesting way.

I've been asked to help think out and develop a prototype which showcases a multitude of features and interfaces which would suit the concept that Persgroep has layed before us.

### Comments; Read an article, or be part of one

Recent trends have shown that a lot of younger people tend to read the comments before even looking at the article, or stop to look at the top comments while reading an article. My concept is to bring these two things together. The top three liked comments are injected into the article itself to readers can read these while reading the articles. If their interest is sparked enough and they want to read further comments this is made possible by using the comments side-panel. Everything happens real-time so if a new comment deserves a spot in the article all readers get it without needing to refresh.

#### Article overview page
![app-screenshot-1](https://raw.githubusercontent.com/zishrodrigues/meesterproef/master/readme-files/screenshot1.jpg)

#### Article page with comment
![app-screenshot-2](https://raw.githubusercontent.com/zishrodrigues/meesterproef/master/readme-files/screenshot2.jpg)

#### Comment side panel
![app-screenshot-3](https://raw.githubusercontent.com/zishrodrigues/meesterproef/master/readme-files/screenshot3.jpg)

#### Desktop version
![app-desktop](https://raw.githubusercontent.com/zishrodrigues/meesterproef/master/readme-files/desktop.jpg)

## Concept: Read an article, or be part of one

It's in peoples nature to want to say their peace and express their opinions to their peers. It's also in peoples natures to have a certain curiousity about what other think of subject. My project aims to present readers with a clear overview of articles to browse. They can click on the link and to go the full article page. What makes the article page unique is that people's comments are embedded within the article itself. Meaning that certain spots in the flow of the article will be reserved for comments people posts. These posts will be chosen based on likes.

Readers can read the article, and at the same time see what others have to say about the subject.

## Course implementation (What a journey this has been)

The minor Web Development has been an incredible journey for me. When I started I barely knew how to add a class with jQuery, so to speak. Now i'm able to build stuff using vanilla Javascript and real-time data. I've learned so much over the past few months. Let me tell you how I've used and implemented the techniques that I learned during the minor.

### Web app from scratch

* Object oriented programming

WAFS thought me why using Objects in code is a good idea and how it really helps you as a developer, especially if working in a team, to write understandable and clean code. Since WAFS I've been writing my Javascript in a OOP way and it's made me a better developer.

```
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
```

* IIFE (Immediately Invoked Function Expression)

WAFS has thought me about using IFFE's. This allows for local scoping and invokes my code Immediately. I won't have to worry about libraries and such using characters that I use in my code. Even though it is still cleaner to try and avoid this.

```
(function() {
```

* filter & sort

I've learned how to use the filter function to loop through my objects and filter out what I needed. Same goes for Sort.

```
var filtered = articleData.articles.filter(function ( val ) {
    return val.id === id;
})[0];
```
```
var sorted = comments.sort(function(a, b) {
    return parseFloat(b.likes) - parseFloat(a.likes);
});
```

* Using a templating engine to inject data into HTML

I've learned how to use several templating engines to inject data into my html. In this case I'm using EJS.

```
app.set('view engine', 'ejs');
```
```
<h1>
    <%= article.title %>
</h1>
<h2>
    <%= article.author %>
</h2>
```

* Using Git and Github

Before the minor I really didn't use Git and github much. I've learned how to do all the things I need to do with Git in the command line and am fully using Github's capabilities of issues and project management. For this project I've create my wish list using Issues and used a Github project for small tasks.

[Using issues for wishlist)](https://github.com/Zishrodrigues/meesterproef/issues)
[Github project)](https://github.com/Zishrodrigues/meesterproef/projects/1)

* Code flow

WAFS is the first time I learned about code flows and how useful they are. Writing / drawing down the flow of your code really helps you wrap your mind around what you have to do, and see issues that might arise before coding. These days I try not to touch a keyboard until I drew a basic code flow!

![codeflow](https://raw.githubusercontent.com/zishrodrigues/meesterproef/master/readme-files/codeflow.jpg)

### CSS to the rescue

* CSS variables

During the course of CSSTTR I've learned what css variables are and how to use them. Though they're not fully supported and it's wise to fallback on more standardized ways, it's good to know what the future will bring and be prepared.

```
--main-bg-color: #2d2d2d;
--main-text-color: #ffffff;
--main-highlight-color: #b3b3b3;
```
```
background-color: var(--main-bg-color);
```

* Mobile first

Even though mobile first has been the way to go for a while now, this minor has really brought it home for me. In the past I've come across huge problems with my code because I didn't think mobile first. The minor has thought me to always start small and work up to big.

```
@media screen and (min-width: 40em) {
```

* CSS grid & Flexbox

This minor allows for freedom and experimentation. I've used Flexbox for projects across the entire minor and used some Grid to get a better understanding on it's working. Using fallbacks I've made sure my content still looks good on browsers that don't support it. But when the future is here I'll be better prepared.

```
display: grid;
grid-template-columns: 1fr;
grid-gap: 0 1em;
```

### Performance matters

* Node.js / server-side

Before the minor the concept of server-side rendering was still quite abstract to me. Now the differentiation between client and server is clearer as ever. Using Node and Express I'm now able to make sure my HTML renders server-side and can render views even if the browser is too slow to support stuff like Javascript.

```
app.get('/', function (req, res) {
    res.render('pages/index', { articles: articleData });
});
```

* NPM command line / packages

PM had given me the experience and knowledge needed to work with NPM to install and maintain packages. I now understand what a package.json does and how to use it for my projects.

```
"author": "zishrodrigues",
"license": "MIT",
"dependencies": {
  "ejs": "^2.5.6",
  "express": "^4.15.2",
```

### Browser technologies

* Progressive enhanced app (No javascript etc)

Browser technologies opened my eyes to what can actually go wrong when people are using your app. I've never thought of the fact that some people might not be used Javascript. But ever since this realization I've made sure to give all users content. If Javascript is disabled people can't comment or get real-time feedback; but they can read already posted comments in a plain and easy way.

* Layering HTML/CSS/Javascript

I structure my content in a semantic correct way to it has meaning beyond the added function of CSS and Javascript. If Javascript doesn't work then the user gets a styled page with content. If CSS doesn't work than the user get plain text that's still understandable.

### Real-time websites

* Real-time connect and disconnect when a user uses the app

When a user enters the article a socket connection is made, when they leave I make sure to disconnect as to now cause duplicate functions.

```
io.on('connection', function(socket){
```
```
socket.on('disconnect', function(){
```

* Real-time data(comments) and data manipulation

When a user posts a comment each user that's connect get's the comment on their page. Liking also happens through sockets and so does injecting the top three comments into the article. Everything happens seamlessly.

```
socket.on('like comment', function(id, article){
    function likes(id) {
        for (var i=0; i < commentsArray.length; i++) {
            if (commentsArray[i].commentId == id) {
                commentsArray[i].likes++;
                console.log('new likes = ' + commentsArray[i].likes);
                return commentsArray[i];
            }
        }
    }
    io.emit('update likes', id, likes(id), article);
    io.emit('place articleComment', commentsArray, id);
});
```

## Looking back (reflection)

Throughout this project I have not only implemented techniques and skills that I've acquired. But also a way of thinking. Each course has given me a new way to look at coding, ux and work in general. This project was a perfect way to end a great minor, and I look back with great pride at how everything has come together. A point of feedback for myself is leave the concepting phase earlier and start concepting in the browser. Thankfully I managed to do this later on in the project.

I feel like I've learned more in these past months than I have in my entire 2,5 years before it. Now I truly feel like I'm ready to take on the last year of CMD!

## Project progress (Last updated: 28-06-2017)

### First week: Research, brainstorm & concept

In the first week of the project I did intensive research for the Persgroep. I looked at general news websites and talked to people who used them. I also held several brainstorming sessions with my peers. On thursday I got together with 7 younger people (ages 19-27) and talked to them for about an hour about how and why they consume news. Most of them were interested in keeping up to date with the goings on in the world, but were more interested in reading comments others made. This also indicates a distrust in general media. I also drew several wireframes for the project and some basic flow charts for my code setup.

### Second week: Code set-up and concept

During the second week I made sure to think about what my code set-up would be and implement it. I decided on several core features to use within my project:

* Node.js
* express
* Socket.io
* EJS

These make sure I have my templating and server needs covered. I also started styling different types of lay-out. Designing in the browser is the new way to go. I showed my UX idea's to Frank from the Persgroep and got feedback for further iterations.

### Third week: Further UX frontend and deeper coding

After spending the first two weeks floating between several concepts and talking with the inspiring teachers at school I decided it was time to bite down on a single concept and go for it. Thus my project 'Read an article, or be part of one'. I started getting more serious in my coding and am building key features like the comment system. I'm also figuring out what the best way is to generate or call data for the prototype.

![ux progress](https://raw.githubusercontent.com/zishrodrigues/meesterproef/master/readme-files/progress.jpg)

Progress of the UI.

### Fourth week: Square eyes

This week was spend coding the system behind the comments. I made sure the three top liked comments were injected into the article and that this happened real-time. I also continued designing multiple lay-outs in the browser and iterating these after getting feedback from teacher and Frank.

### Dot on the i's and expo

Koop gave me great feedback about my interaction. He suggested that a pop out with comments would be good to have on mobile. As a frontend developer it's my job to be able to prototype these idea's quite quickly so I did just that. I also made a poster from my presentation and fixed remaining bugs in my project.

## Project features

I'm focusing on the reader portion of the concept. Which implies that I'll be developing a user interface for the users of the app that want to read and comment on articles.

Check the issues section of this repo for details on the must, should, could and would have features of the project.

## datamodel

![datamodel](https://raw.githubusercontent.com/zishrodrigues/meesterproef/master/readme-files/datamodel.jpg)

## Installation
### Installing locally

Using the following steps you can install and use the app locally.

#### Cloning or downloading the repo

```
$ git clone https://github.com/Zishrodrigues/meesterproef.git
```
#### Installing the required dependencies
Run the following command in the root:
```
$ npm install
```
Wait for the required npm packages to install and proceed further.

#### Starting and running the server
Make sure port 1337 isn't being used by another project. If this is the case run the following command in the root folder.
```
$ npm run start
```
If you get the message `app listening in port 1337 ` the server started successfully on localhost:1337.

## Sources

### Used packages
* express
* socket.io
* ejs
