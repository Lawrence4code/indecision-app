import React, { Component } from 'react';
import './App.css';

class IndecisionApp extends Component {
  constructor(props) {
    super();
    this.state = {
      options: ['Thing One', 'Thing Two', 'Thing Three']
    };
  }

  // handle delete options
  handleDeleteOptions = () => {
    this.setState(() => {
      return {
        options: []
      };
    });
  };

  // handle pick random options
  handlePick = () => {
    const randomNumber = Math.floor(Math.random() * this.state.options.length);
    console.log(this.state.options[randomNumber]);
  };

  // handle add options
  handleAddOption = option => {
    if (!option) {
      return 'Enter a valid text to add option.';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exist, please enter diffrent value.';
    }

    console.log(option);
    this.setState(prevState => {
      return {
        options: prevState.options.concat([option])
      };
    });
  };

  render() {
    const title = 'Indecision';
    const subtitle = 'Put your life in the hands of a computer.';
    return (
      <div className="App">
        <Header title={title} subtitle={subtitle} />
        <Action
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
        />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    );
  }
}

const Header = props => {
  return (
    <div>
      <h1> {props.title} </h1>
      <h2> {props.subtitle} </h2>
    </div>
  );
};

const Action = props => {
  return (
    <div>
      <button onClick={props.handlePick} disabled={!props.hasOptions}>
        What should I do?
      </button>
    </div>
  );
};

const Options = props => {
  return (
    <div>
      <button onClick={props.handleDeleteOptions}> Remove All </button>
      {props.options.map(option => <Option key={option} optionText={option} />)}
      <Option />
    </div>
  );
};

const Option = props => {
  return <div> {props.optionText} </div>;
};

class AddOption extends Component {
  constructor(props) {
    super();
    this.state = {
      error: undefined
    };
  }

  handleAddOption = event => {
    event.preventDefault();
    const optionText = event.target.elements.option.value.trim();
    const error = this.props.handleAddOption(optionText);
    this.setState(() => {
      return { error };
    });
    event.target.elements.option.value = '';
  };
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form
          onSubmit={e => {
            this.handleAddOption(e);
          }}
        >
          <input type="text" name="option" />
          <button> Add options </button>
        </form>
      </div>
    );
  }
}

export default IndecisionApp;

// form validation and sanitization
