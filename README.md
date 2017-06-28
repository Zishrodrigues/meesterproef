# Persgroep articles web app (Meesterproef)

Zishan K. Pasha | V 0.3.5 | [Live link(progress)](https://meesterproef-vzujpzsxnk.now.sh)

![persgroep-logo](https://raw.githubusercontent.com/zishrodrigues/meesterproef/master/readme-files/pg-logo.png)

Index of this readme:
* Project description
* Course implementation
* Concept
* Project progress
* Features (moscow)
* Install guide
* Sources

## Project description

The Persgroep is concepting a app/website that allows young users (20-30) to post articles and browse/read them. So it's articles by younger people for younger people. The ultimate goal is to have content which appeals to younger users because it's written by they're peers.

I've been asked to help think out and develop a prototype which showcases a multitude of features and interfaces which would suit the concept that Persgroep has layed before us.

## Course implementation (What a journey this has been)

The minor Web Development has been an incredible journey for me. When I started I barely knew how to add a class with jQuery, so to speak. Now i'm able to build stuff using vanilla Javascript and real-time data. Let me tell you how I've used and implemented the techniques that I learned during the minor.

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

* IIFE

## Concept: Read an article, or be part of one

It's in peoples nature to want to say their peace and express their opinions to their peers. It's also in peoples natures to have a certain curiousity about what other think of subject. My project aims to present readers with a clear overview of articles to browse. Once they see something that peaks their interest they can click on the link and to go the full article page. What makes the article page unique is that people's comments are embedded within the article itself. Meaning that certain spots in the flow of the article will be reserved for comments people posts. These posts will be choses based on ratings.

Readers can read the article, and at the same time see what others have to say about the subject.

## Project progress (Last updated: 14-06-2017)

#### Datamodel (work in progress, feedback is greatly appreciated)
![datamodel](https://raw.githubusercontent.com/zishrodrigues/meesterproef/master/readme-files/datamodel.jpg)

#### Code flow (work in progress, feedback is greatly appreciated)
![codeflow](https://raw.githubusercontent.com/zishrodrigues/meesterproef/master/readme-files/codeflow.jpg)

In my current workflow the server.js handles templates and routes. As well as setting up a socket.io communication. Client-side javascript is used to communicate user input to the user via sockets and enhancements like animations. Using local storage I'll be tracking and saving read articles and comments.

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
