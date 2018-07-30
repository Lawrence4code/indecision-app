import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super();
    this.state = {
      count: 0
    };
    this.resetCountHandler = this.resetCountHandler.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount');
    const json = localStorage.getItem('count');
    const count = parseInt(json, 10);

    if (!isNaN(count)) {
      this.setState(() => {
        return {
          count
        };
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('compoenentDidUpdated');
    if (prevState.count !== this.state.count) {
      const json = JSON.stringify(this.state.count);
      localStorage.setItem('count', json);
    }
  }

  addOneHandler = () => {
    this.setState(prevState => {
      return {
        count: prevState.count + 1
      };
    });
  };

  minusOneHandler = () => {
    this.setState(prevState => {
      return {
        count: prevState.count - 1
      };
    });
  };

  resetCountHandler() {
    this.setState({
      count: 0
    });
  }

  render() {
    console.log(this.state.count);
    return (
      <div>
        <h1>Count: {this.state.count} </h1>
        <button onClick={this.addOneHandler}>+1</button>
        <button onClick={this.minusOneHandler}>-1</button>
        <button onClick={this.resetCountHandler}>Reset </button>
      </div>
    );
  }
}

export default Counter;
