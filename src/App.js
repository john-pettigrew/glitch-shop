import React from 'react';
import Menu from './menu/menu.js';
import ImgDisplay from './img_display/img_display';
import OpenTool from './tools/open';
import SaveTool from './tools/save';
import ChromaticAberrationTool from './tools/chromatic_aberration';
import ScrambleTool from './tools/scramble';
import PixelShiftTool from './tools/pixel_shift';
import './App.css';
const defaultStateIndex = 2;

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {};

    this.setDefaultState = this.setDefaultState.bind(this);
    this.setNewState = this.setNewState.bind(this);
    this.initImage = this.initImage.bind(this);
    this.updateImage = this.updateImage.bind(this);
    this.getCurrentImageData = this.getCurrentImageData.bind(this);
    this.getDataURL = this.getDataURL.bind(this);
    this.showErr = this.showErr.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.setSecondaryMenu = this.setSecondaryMenu.bind(this);

    this.mainMenuItems = [
      new OpenTool(this.setNewState, this.updateImage),
      new SaveTool(null, null, null, null, this.getDataURL),
      new ChromaticAberrationTool(this.setNewState, this.updateImage, this.getCurrentImageData, this.setSecondaryMenu),
      new ScrambleTool(this.setNewState, this.updateImage, this.getCurrentImageData, this.setSecondaryMenu),
  //    new PixelShiftTool(this.setNewState, this.updateImage, this.getCurrentImageData, this.setSecondaryMenu),
    ]
  }

  componentDidMount(){
    this.setDefaultState();
  }

  setSecondaryMenu(secondaryMenu){
    this.setState({
      secondaryMenu 
    });
  };

  setNewState(newState){
    this.setState({
      currentState: newState,
    });
  }

  setDefaultState(){
    this.setNewState(this.mainMenuItems[defaultStateIndex]);
    this.mainMenuItems[defaultStateIndex].onClick();
  }

  updateImage(newImageData){
    this.setState({
     currentImage: newImageData, 
    });
  }

  initImage(newImage){
    this.imgDisplay.clearScreen();
    this.setState({
     initImage: newImage, 
     currentImage: null
    });
  }

  getCurrentImageData(){
    return this.imgDisplay.getCurrentImageData();
  }

  getDataURL(){
    return this.imgDisplay.getDataURL();
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
          fileUploadEnabled={true}
          items={this.mainMenuItems} 
          initImage={this.initImage}
        >
        </Menu>
        <ImgDisplay 
          ref={ref => {this.imgDisplay = ref;}} 
          initImage={this.state.initImage} 
          imageData={this.state.currentImage} 
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onMouseMove={this.onMouseMove}
        >
        </ImgDisplay>
        {this.state.secondaryMenu && 
          <Menu 
            fileUploadEnabled={false}
            side='right'
            items={this.state.secondaryMenu} 
          >
          </Menu>
        }
        <a id="download_link" href="#"></a>
      </div>
    );
  }
}

export default App;
