import React, { Component } from 'react';
import './App.css';

class IndecisionApp extends Component {
  constructor(props) {
    super();
    this.state = {
      options: []
    };
  }

  componentDidMount() {
    console.log('componentDidMount!');
    try {
      // to ensure only JSON data is saved in options
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);

      if (options) {
        // This is check is very important, if null is passed as option the whole application gonna crash.
        this.setState(() => {
          return {
            options
          };
        });
      }
    } catch (e) {
      // Do nothing
    }
  }

  // localStorage.clear() can cause serious issue in the app if not checked and taken care off before hand

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate!');
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }

  componentWillUnmount() {
    // console.log('componentWillUnmount!');
  }

  // handle delete options
  handleDeleteOptions = () => {
    this.setState(() => {
      return {
        options: []
      };
    });
  };

  // delete individual option
  handleDeleteOption = optionToRemov => {
    this.setState(prevState => {
      return {
        options: prevState.options.filter(opt => {
          return opt !== optionToRemov;
        })
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
    console.log('render!');
    // const title = 'Indecision';
    const subtitle = 'Put your life in the hands of a Computer.';
    return (
      <div className="App">
        <Header subtitle={subtitle} />
        <Action
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
        <Options
          options={this.state.options}
          handleDeleteOption={this.handleDeleteOption}
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
      {props.subtitle && <h2> {props.subtitle} </h2>}
    </div>
  );
};

Header.defaultProps = {
  title: 'Indecision'
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
      <button onClick={props.handleDeleteOptions}>Remove All</button>
      {props.options.length === 0 && ( // this is a good check and display information for UX
        <p> Please add an options to get started. </p>
      )}
      {props.options.map(option => (
        <Option
          key={option}
          optionText={option}
          handleDeleteOption={props.handleDeleteOption}
        />
      ))}
    </div>
  );
};

const Option = props => {
  return (
    <div>
      {props.optionText}
      <button onClick={event => props.handleDeleteOption(props.optionText)}>
        Remove
      </button>
    </div>
  );
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
    if (!error) {
      // incase of error, the input stays intact to edit and give the use an option to correct the error and try again
      event.target.elements.option.value = '';
    }
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
