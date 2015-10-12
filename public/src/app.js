// phq9.js ----------------------------

var App = React.createClass({
	getInitialState : function() {
		return {
			// currentRoute : <Welcome updateRoute={this.updateCurrentRoute} />
			currentRoute : 'welcome'

		}
	},

	// too repetetive...
	updateCurrentRoute : function(route) {
		var welcome = <Welcome updateRoute={this.updateCurrentRoute} />;

		switch (this.state.currentRoute) {
			case 'welcome':
				this.setState( { currentRoute : welcome });
				break;
			case 'questionnaire':
				this.setState({ currentRoute : <Form updateRoute={this.updateCurrentRoute} /> });
				break;
			case 'results':
				this.setState({ currentRoute : <Results updateRoute={this.updateCurrentRoute} /> });
				break;
			default:
				this.setState({ currentRoute : welcome });
				break;
		}
	},

	componentDidMount: function() {
		var router = Router({
			'/welcome': this.setState.bind(this, {currentPage: 'welcome'}),
			'/questionnaire': this.setState.bind(this, {currentPage: 'questionnaire'}),
			'/results': this.setState.bind(this, {currentPage: 'results'})
		});
		router.init();
	},

	// render: function() {
	// 	var partial;
	// 	if (this.state.currentPage === 'home') {
	// 	partial = <Home />;
	// 	} else if (this.state.currentPage === 'bio') {
	// 	partial = <Bio />;
	// 	} else {
	// 	// dunno, your default page
	// 	// if you don't assign anything to partial here, you'll render nothing (undefined). In another situation you'd use the same concept to toggle between show/hide, aka render something/undefined (or null)
	// }

	render: function() {
		/* TODO - figure out a better way for routing */
		var route;
		// too repetetive...
		switch (this.state.currentPage) {
			case 'welcome':
				route = <Welcome />;
				// this.setState({ currentRoute : 'welcome' });
				break;
			case 'questionnaire':
				route = <Form />;
				// this.setState({ currentRoute : 'questionnaire' });
				break;
			case 'results':
				router = <Results />
				// this.setState({ currentRoute : 'results' });
				break;
			default:
				route = <Welcome />;
				// this.setState({ currentRoute : 'welcome' });
				break;
		}

		return (
		  <div>
		  	{route}
		  </div> 
		);
	}
});

// Welcom message, default starting view
var Welcome = React.createClass({
	updateRoute : function() {
		this.props.updateRoute('questionnaire');
	},

	render : function() {
		return (
			<div>
				<p>{test.welcome}</p>
				<a href="/questionnaire" className="btn btn-primary btn-block" onClick={this.updateRoute}>Begin PHQ-9</a>
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
			validQuestions : []
		};
	},

	// whenever a question is answered, push question numb to validQuestions array to maintain count
	updateValidCount : function(name) {
		if (this.state.validQuestions.indexOf(name) < 0) {
			this.state.validQuestions.push(name);
		};
	},

	// on submit, check that questions answered and number of questions match
	validateForm : function() {
		if ( this.state.validQuestions.length === this.state.questionsCount ) {
			this.setState({ valid : true });
		};
		return this.state.valid;
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
				<button type="submit" className="btn btn-primary" onClick={this.validateForm}>Submit</button>
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
		this.props.onAnswered(target.name);
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


ReactDOM.render(
  <App />,
  document.getElementById('app')
);