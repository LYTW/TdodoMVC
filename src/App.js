import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';

class TaskRow extends React.Component{
  constructor(props){
    super(props);
    this.onClickDel = this.onClickDel.bind(this);
    this.onCompleted = this.onCompleted.bind(this);
  }

  onClickDel(e){
    this.props.onClickDel(this.props.id, e);
  }

  onCompleted(e){
    this.props.onCompleted(this.props.id,e);
  }

  render(){
    return(
      <div className = "Div_tab">
        <input type="checkbox" checked={this.props.isCompleted} onChange = {this.onCompleted} />
        {this.props.isCompleted ? 
          <s>{this.props.taskName}</s> : this.props.taskName}
        <button type="button" onClick={this.onClickDel}  className = "Del">×</button>
      </div>
    );
  }
}

class TaskTable extends React.Component{
  constructor(props){
    super(props);
    this.onClickDel = this.onClickDel.bind(this);
    this.onCompleted = this.onCompleted.bind(this);
    this.OnChangeShowOpt100 = this.OnChangeShowOpt100.bind(this);
    this.OnChangeShowOpt010 = this.OnChangeShowOpt010.bind(this);
    this.OnChangeShowOpt001 = this.OnChangeShowOpt001.bind(this);
    
  }

  onClickDel(id, e){
    this.props.onClickDel(id);
  }
  onCompleted(id,e){
    this.props.onCompleted(id,e);

  }

  OnChangeShowOpt100(e){
    this.props.OnChangeShowOpt(0b100);
  }

  OnChangeShowOpt010(e){
    this.props.OnChangeShowOpt(0b010);
  }

  OnChangeShowOpt001(e){
    this.props.OnChangeShowOpt(0b001);
  }


  render(){
    var showTaskRows = [];


    this.props.taskList.forEach(ob => {
      if(this.props.showOptions === 0b100)
        showTaskRows.push(
          <TaskRow 
            taskName={ob.taskname} 
            isCompleted={ob.iscompleted}
            id={ob.id}
            onClickDel = {this.onClickDel}
            onCompleted = {this.onCompleted}
          />)

      else if(ob.iscompleted == (this.props.showOptions& 0b001))
        showTaskRows.push(
          <TaskRow 
            taskName={ob.taskname} 
            isCompleted={ob.iscompleted}
            id={ob.id}
            onClickDel = {this.onClickDel}
            onCompleted = {this.onCompleted}
          />)
    }, this);

    return (
      <div className = "Foot">
        <div>{showTaskRows }</div>
        <p>
          {showTaskRows.length} items
          <input className = "Check_box"
            type = "radio" 
            checked={this.props.showOptions & 0b100} 
            onChange = {this.OnChangeShowOpt100}
            name = "state"/>All
          <input className = "Check_box"
            type = "radio" 
            checked={this.props.showOptions & 0b010}
            onChange = {this.OnChangeShowOpt010}
            name = "state"/>Active
          <input className = "Check_box"
            type = "radio" 
            checked={this.props.showOptions & 0b001} 
            onChange = {this.OnChangeShowOpt001}
            name = "state"/>Completed
        </p >
      </div>
    );

  }
}

class HeadBar extends React.Component{
  constructor(props){
    super(props);
    this.handleTaskTextInputChange = this.handleTaskTextInputChange.bind(this);
    this.handleIsCompletedAllChecked = this.handleIsCompletedAllChecked.bind(this);  
    this.handleTaskTextInputSubmit = this.handleTaskTextInputSubmit.bind(this);
  }

  handleTaskTextInputChange(e) {
    this.props.onTextInput(e.target.value);
  }

  handleIsCompletedAllChecked(e) {
    this.props.onCompletedAll(e.target.checked);
  }

  handleTaskTextInputSubmit(e){
    if(e.keyCode === 13)
      this.props.onTextInputSubmit();
  }

  render(){
    return(
      <div className="Head_div">
            <input 
              className = "Check_b"
              type="checkbox"
              aria-label="Checkbox for following text input"
              checked = {this.props.isCompletedAll}
              onChange = {this.handleIsCompletedAllChecked}
            />
            <input className = "Input_text"
              type="text" 
              placeholder="Input..." 
              value = {this.props.inputText}
              //onChange = {this.props.handleTaskTextInputSubmit}
              onKeyUp={this.handleTaskTextInputSubmit}
              onChange = {this.handleTaskTextInputChange}

            />
      </div>
    );
  }
}

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      inputText:'',
      isCompletedAll: false,
      taskList:[],
      showOptions: 0b100
    };

    this.handleTaskTextInput = this.handleTaskTextInput.bind(this);
    this.handleIsCompletedAllChecked = this.handleIsCompletedAllChecked.bind(this);
    this.handleTaskTextInputSubmit = this.handleTaskTextInputSubmit.bind(this);
    this.handleTaskDelete = this.handleTaskDelete.bind(this);
    this.handleTaskCompleted = this.handleTaskCompleted.bind(this);
    this.handleChangeOpt = this.handleChangeOpt.bind(this);
  }

  handleTaskTextInput(inputText){
    this.setState({inputText: inputText});
  }

  handleIsCompletedAllChecked(isSetCompletedAll){
    var tempList = [];

    this.state.taskList.forEach(t => {
      if(t.iscompleted == isSetCompletedAll)
         tempList.push(t);
      else
        tempList.push({taskname: t.taskname, iscompleted: isSetCompletedAll, id: t.id});
      });
    this.setState({taskList:tempList});
    
    this.setState({isCompletedAll: isSetCompletedAll});
  }

  handleTaskTextInputSubmit(){
    if (this.state.inputText == "")  return;
    this.state.taskList.push({taskname: this.state.inputText, iscompleted: false, id: (new Date().getTime())});
    this.setState({inputText: ""})
    this.setState({isCompletedAll:false});
  }

  handleTaskDelete(id){
    var tempList = [];
    var tempIsAllCompleted = true;

    this.state.taskList.forEach(t => {
      if(t.id != id) tempList.push(t)});
    
    tempList.forEach(t =>{
      if(t.iscompleted == false)
        tempIsAllCompleted = false;
      }
    )
    
    if(tempIsAllCompleted == true)
      this.setState({isCompletedAll:true});

    this.setState({taskList:tempList});
  }

  handleTaskCompleted(id,e){
    var tempList = [];
    var tempIsAllCompleted = true;

    this.state.taskList.forEach(
      t => {
        if(t.id != id) 
          tempList.push(t);
        else
          tempList.push({taskname: t.taskname, iscompleted: e.target.checked, id: t.id})
        }
    );

    tempList.forEach(t =>{
      if(t.iscompleted == false)
        {
          this.setState({isCompletedAll:false});
          tempIsAllCompleted = false;
        }
      }
    )

    if(tempIsAllCompleted)
      this.setState({isCompletedAll:true});

    this.setState({taskList:tempList});

  }

  handleChangeOpt(opt)
  {
    this.setState({showOptions:opt});
  }

  render(){
    return(
      <div className = "Head_bar">
      <div className ="Todos">TODOS</div>
        <div>
          <HeadBar 
            inputText = {this.state.inputText}
            isCompletedAll = {this.state.isCompletedAll}
            onTextInput = {this.handleTaskTextInput}
            onCompletedAll = {this.handleIsCompletedAllChecked}
            onTextInputSubmit = {this.handleTaskTextInputSubmit}
          />
        </div>

        <div>
          <TaskTable 
            taskList = {this.state.taskList}
            showOptions = {this.state.showOptions}
            onClickDel = {this.handleTaskDelete}
            onCompleted = {this.handleTaskCompleted}
            OnChangeShowOpt = {this.handleChangeOpt}
          />
        </div>
      </div>
    );
  }
}


export default App;
