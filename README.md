# PHQ-9 Form App #

## Summary ##
A single page application built with React.js.  Application presents users with the PHQ-9 questionnaire and calculates results.  Upon completion, if the user's score falls within the range of "moderately depressed" or higher, the user will have the option to be contacted by one of three mental health professionals.

The app was built with mobile users in mind, and leverages the Twitter Bootstrap responsive grid and themeing.  In order to keep the form as simple as possible, there are 3 "views" the user can be presented with.  The "Welcome" component describes the PHQ-9 and prompts the user to being the form.  The "Form" component contains all of the PHQ-9 questions on a single form page.  All questions on the PHQ-9 form are required, and are validated on submit to warn the user of any missing fields (if any exist).  The final component, Results, sums up the answer values and displays the user's score.  If the user's depression severity level is "moderately depressed" or higher, an additional "Recommendation" component will appear with the option to be contacted by one of three mental health professional.

## Required Dependencies ##
- ***Node.js***
- ***Node Package Manager***
- Express.js
- React.js
- Twitter Bootstrap
- Bootswatch Yeti Theme

## Installation ##
Clone project to local machine

`git clone https://github.com/yurm04/PHQ-9-Questionnaire.git`

Install NPM dependencies

`npm install`

## Run Instructions ##

Start Express Server

`node server.js`

Open in browser

`http://localhost:3000`

OR

`http://127.0.0.1:3000`


## React.js Components ##
- App
  - Welcome
  - Form
    - QuestionsList
      - Question
        - OptionsList
  - Results
    - Score
    - Recommendation

