// phq9.js ----------------------------

/*
NOTES 
For next react project:
- Start with browserify and set up Gulp tasks
- Need to find a Routing library and implement it
- Find better syntax highlighting and Emmet setup
 */

var App = React.createClass({
	getInitialState : function() {
		return {
			showWelcome : true,
			showForm : false,
			showResults :false
		};
	},

	// psuedo routing until I find something better...
	showPage : function(page, score) {
		this.setState( { showWelcome : (page === 'welcome' ? true : false) });
		this.setState( { showForm : (page === 'form' ? true : false) });
		if (score) {
			this.props.score = score;
			this.setState( { showResults : (page === 'results' ? true : false) });
		}
	},

	render: function() {
		var welcome = <Welcome changePage={this.showPage} />;
		var form = <Form changePage={this.showPage} />;
		return (
		  <div>
		  	{ this.state.showWelcome ? welcome : null  }
		  	{ this.state.showForm ? form : null }
		  </div> 
		);
	}
});

// Welcom message, default starting view
var Welcome = React.createClass({
	// change to show questions form
	startForm : function() {
		this.props.changePage('form');
	},

	render : function() {
		return (
			<div>
				<p>{test.welcome}</p>
				<a className="btn btn-primary btn-block" onClick={this.startForm}>Begin PHQ-9</a>
			</div>
		)
	}
});

// Questionnaire Form
var Form = React.createClass({
	getInitialState : function() {
		return { 
			valid : false,
			questionsCount : test.subQuestions.length,
			validQuestions : {}
		};
	},

	// whenever a question is answered, push question numb to validQuestions array to maintain count
	updateValidCount : function(name, answer) {
		if (this.state.validQuestions.indexOf(name) < 0) {
			var a = {};
			a[name] = answer;
			this.state.validQuestions.push(a);
		};
	},

	// on submit, check that questions answered and number of questions match
	validateForm : function() {
		if ( this.state.validQuestions.length === this.state.questionsCount ) {
			this.setState({ valid : true });
		};
		return this.state.valid;
	},

	// validate form and switch to results page if valid
	getResults : function() {
		var isValid = this.validateForm;
		if (isValid) {
			this.props.changePage('results');
		};
	},

	/*
	TODO - is there a more streamlined way of updating the questions count
	without passing the updating the update count function with each child?
	*/
	render : function() {
		return (
			<form>
				<h4>{test.mainQuestion}</h4>
				<QuestionsList questions={test.subQuestions} countValid={this.updateValidCount} />
				<button type="submit" className="btn btn-primary" onClick={this.getResults}>Submit</button>
			</form>
		);
	}
});

/* NOTE - iterated child nodes should have 'key' props to make DOM updating minimal */
var QuestionsList = React.createClass({
	render : function() {
		var questions = this.props.questions.map( function(q, index) {
			return <Question key={index} question={q} num={index} updateAnswered={this.props.countValid} />
		}, this);

		return <div>{questions}</div>;
	}
});

var Question = React.createClass({
	// init state data with passed in question
	getInitialState : function() {
		return { question : this.props.question };
	},

	render : function() {
		return (<div className="well">
					<p className="lead">{this.state.question}</p>
					<OptionsList data={test.options} qnum={this.props.num} onAnswered={this.props.updateAnswered} />
				</div>);
	}
});

var OptionsList = React.createClass({
	// initialize state data with passed in options
	getInitialState : function() {
		return { value : 'hello!' };
	},

	// when an item is checked or changed, update the value state
	onAnswerChange : function(event) {
		var target = event.target;
		this.setState( { value : target.value } );
		this.props.onAnswered(target.name, target.value);
		// TODO - find out the difference between event.target and event.currentTarget
	},

	// create radio list items for answer options
	render : function() {
		// map each answer to a radio option
		var items = this.props.data.map( function(answerText, index) {
			// sets radio 'checked' attribute based on comparison to current state.value
			return ( <div className="radio" key={index}>
						<label>
							<input type="radio"
								   name={'Q' + this.props.qnum} 
								   value={index}
								   onChange={this.onAnswerChange} />
							{answerText}
						</label>
					</div> );
		}, this); // pass 'this' to map() to maintain context

		// return items
		return <div>{items}</div>;
	}
});

// calculate results and display outcome based on severity
var Results = React.createClass({
	actionRequired : function() {

	},

	render : function() {
		var results = test.calculateSeverity();

	}
})


ReactDOM.render(
  <App />,
  document.getElementById('app')
);