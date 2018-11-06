import React, { Component } from 'react';
import config from './Config'
const firebase = require('firebase');
const uuid     = require('uuid/v1');
firebase.initializeApp(config);

class Uservey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid:uuid(),
            studentName: '',
            ansers:{
               	answer1:'',
               	answer2:'',
				answer3:'',
				ansers4:''
            },
            isSubmitted: false  

        };
		  this.handleSubmit = this.handleSubmit.bind(this);
		  this.handleAns    = this.handleAns.bind(this); 
		  this.handlaQuestionSubmit = this.handlaQuestionSubmit.bind(this); 
	}
	handlaQuestionSubmit () {
		console.log('submit');
		firebase.database().ref('Servey'+this.state.uid).set({
			studentName:this.state.studentName,
			ansers: this.state.ansers
		});
		this.setState({isSubmitted: true});
	}
    handleSubmit(eve) { 
	  let name = this.refs.name.value;
      this.setState({studentName: name},()=>{
		  console.log(this.state)
	  })
	}
	handleAns (ev) {
		let clName = ev.target.parentNode.parentNode.className;
		this.setState({
			ansers:{
				answer1: clName === 'q1' ? ev.target.value : this.state.ansers.answer1,
				answer2: clName === 'q2' ? ev.target.value : this.state.ansers.answer2,
				answer3: clName === 'q3' ? ev.target.value : this.state.ansers.answer3,
				answer4: clName === 'q4' ? ev.target.value : this.state.ansers.answer4,
			}
		})
	}
    render() {
        let studentName;
		let questions;
		let submitt;
        if(this.state.studentName === '' && this.state.isSubmitted === false ) {
            studentName = <div>
                <h3>He! please enter your Name:</h3>
                <form onSubmit={this.handleSubmit} action="#">
                    <input type="text" ref="name" placeholder="enter your name " className="nam"></input><br />
                </form>
                </div>

        } else if(this.state.studentName !== '' && this.state.isSubmitted === false ) {
            questions= <div className="main">
			<form action="#" onSubmit={this.handlaQuestionSubmit} >
				<h3>Welcome  {this.state.studentName} !</h3>
				<h4>servey questions</h4>
				<div className="q1">
					<span className="ques">In which Technology you work :</span>
					<div className="ans">
						<input type="radio" name="q1" value="RectJs" onClick={this.handleAns}/>RectJs
						<input type="radio" name="q1" value="NodeJs" onClick={this.handleAns}/>NodeJs    
						<input type="radio" name="q1" value="AngulaJs" onClick={this.handleAns}/>AngulaJs
						<input type="radio" name="q1" value="JavaScript" onClick={this.handleAns}/>JavaScript
					</div>
				</div>
				<div className="q2">
				<span className="ques">Your experience in industry :</span>
					<div className="ans">
						<input type="radio" name="q2" value="6 Month"  onClick={this.handleAns}/>6 Month
						<input type="radio" name="q2" value="1-2 Year" onClick={this.handleAns}/>1-2 Year    
						<input type="radio" name="q2" value="3-5 Year" onClick={this.handleAns}/>3-5 Year
						<input type="radio" name="q2" value="More than 5 year" onClick={this.handleAns}/>More than 5 year
					</div>
				</div>
				<div className="q3">
					<span className="ques">Which Editor you like</span>
					<div className="ans">
						<input type="radio" name="q3" value="Visual Code"  onClick={this.handleAns}/>Visual Code
						<input type="radio" name="q3" value="Sublime"  onClick={this.handleAns}/>Sublime 
						<input type="radio" name="q3" value="Atom" onClick={this.handleAns} />Atom
						<input type="radio" name="q3" value="Bracket" onClick={this.handleAns} />Bracket 
					</div>
				</div>
				<div className="q4">
					<span className="ques">Your Sex ?</span>
					<div className="ans">
						<input type="radio" name="q4" value="Male" onClick={this.handleAns} />Male
						<input type="radio" name="q4" value="Female"onClick={this.handleAns} />Female
						<input type="radio" name="q4" value="Other"onClick={this.handleAns} />Other
					</div>
				</div>
					<button type="submit" className="btn-subm" >submit</button>  
			</form>
		</div>    
        } else if (this.state.isSubmitted === true ) {
			submitt = <div>
				<h3>Thanks ! { this.state.studentName } for taking part in Servey </h3>
			</div>
		}
        return (
            <div>
                    {studentName}
                ---------------------------------------------------------------------
                    {questions}
				---------------------------------------------------------------------
					{submitt}	 
            </div>
        );
    }
}
export default Uservey;