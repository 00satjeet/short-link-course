import {Meteor} from 'meteor/meteor';
import React from 'react';
import Modal from 'react-modal';

export default class AddLink extends React.Component{
  constructor(props){
    super(props);
    this.state={
      url:'',
      IsOpen:false,
      error:''
    };
  }

  onSubmit(e){
    const {url} =this.state;
    e.preventDefault();
    // const url=this.refs.url.value.trim();
    // if(url){
      Meteor.call('links.insert',url,(err,res)=>{
        if(!err){
          this.setState({url:'',IsOpen:false,error:''});
        }else{
          this.setState({error:err.reason});
        }
      });
      //Links.insert({url,userId:Meteor.userId()});
      // this.refs.url.value='';
    // }
  }
  onChange(e){
    this.setState({
      url:e.target.value
    });
  }
  handleModalClose(){
    this.setState({IsOpen:false, url:'',error:''});
  }
  render(){
    return(
      <div>
        <button className="button" onClick={()=>this.setState({IsOpen:true})}> +Add Link</button>
        <Modal isOpen={this.state.IsOpen}
          contentLabel="agregar link"
           onAfterOpen={()=>this.refs.url.focus()}
           onRequestClose={this.handleModalClose.bind(this)}
           className="boxed-view__box"
           overlayClassName="boxed-view boxed-view--modal"
           >
          <h1>Agregar un Link</h1>
          {this.state.error ? <p>{this.state.error}</p> :undefined }
          <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
            <input
              type="text"
              ref="url"
              placeholder="URL"
            value={this.state.url}
          onChange={this.onChange.bind(this)}/>
            <button className="button"> Agregar Link</button>
            <button type="button" className="button button--secondary" onClick={()=>this.setState({IsOpen:false, url:'',error:''})}> Cancel </button>

          </form>

        </Modal>

      </div>
    );
  }
}
