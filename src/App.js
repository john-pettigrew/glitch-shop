import React from 'react';
import Menu from './menu/menu.js';
import ImgDisplay from './img_display/img_display';
import OpenTool from './tools/open';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {};

    this.setDefaultState = this.setDefaultState.bind(this);
    this.updateImage = this.updateImage.bind(this);
    this.showErr = this.showErr.bind(this);
  }

  setDefaultState(){
    this.setState({
      //currentState: defaulState
    });
  }

  updateImage(newImageData){
    this.setState({
     currentImage: newImageData, 
    });
  }

  showErr(text){
    console.log(text);
  }

  render(){
    const mainMenuItems = [
      new OpenTool(this.setDefaultState, this.updateImage),
    ]
    return (
      <div className="App">
        <Menu 
          items={mainMenuItems} 
          updateImage={this.updateImage}
        >
        </Menu>
        <ImgDisplay imgData={this.state.currentImage} >
        </ImgDisplay>
      </div>
    );
  }
}

export default App;
