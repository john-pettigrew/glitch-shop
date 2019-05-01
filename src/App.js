import React from 'react';
import Menu from './menu/menu.js';
import ImgDisplay from './img_display/img_display';
import OpenTool from './tools/open';
import ChromaticAberrationTool from './tools/chromatic_aberration';
import './App.css';



class App extends React.Component {
  constructor(props){
    super(props);

    this.mainMenuItems = [
      new OpenTool(this.setDefaultState, this.updateImage),
      new ChromaticAberrationTool(this.setDefaultState, this.updateImage),
    ]

    this.state = {
      currentState: this.mainMenuItems[1],
    };

    this.setDefaultState = this.setDefaultState.bind(this);
    this.updateImage = this.updateImage.bind(this);
    this.showErr = this.showErr.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  setDefaultState(){
    this.setState({
      currentState: this.mainMenuItems[1],
    });
  }

  updateImage(newImageData){
    this.setState({
     currentImage: newImageData, 
    });
  }

  onMouseDown(x, y){
    if(this.state.currentState.onMouseDown){
      this.state.currentState.onMouseDown(x, y);
    }
  }
  onMouseMove(x, y){
    if(this.state.currentState.onMouseMove){
      this.state.currentState.onMouseMove(x, y);
    }
  }
  onMouseUp(x, y){
    if(this.state.currentState.onMouseUp){
      this.state.currentState.onMouseUp(x, y);
    }
  }

  showErr(text){
    console.log(text);
  }

  render(){
    
    return (
      <div className="App">
        <Menu 
          items={this.mainMenuItems} 
          updateImage={this.updateImage}
        >
        </Menu>
        <ImgDisplay 
          imgData={this.state.currentImage} 
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onMouseMove={this.onMouseMove}
        >
        </ImgDisplay>
      </div>
    );
  }
}

export default App;
