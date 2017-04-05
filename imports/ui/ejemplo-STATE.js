import React from 'react';
import {Link} from 'react-router';

export default class Signup extends React.Component{
  constructor(props){
    super(props);
    this.state={
      count:0
    };
  }
  increment(){
    this.setState({
      count:this.state.count +1
    });
  }
  decrement(){
    this.setState({
      count:this.state.count -1
    });
  }
  render(){
    return (
      <div>
        <h1>Registro</h1>

        <p>registro form</p>
      <p> {this.state.count}     </p>
      <button onClick={this.increment.bind(this)}> +1</button>
      <button onClick={this.decrement.bind(this)}> -1</button>

        <Link to="/">Ya tienes una Cuenta</Link>

      </div>


    );
  }
}
