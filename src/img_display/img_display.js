import React from 'react';

class ImgDisplay extends React.Component {
  constructor(props){
    super(props);
  }



  render(){
    if(this.props.imgData){
        const canvas = this.canvasRef;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(this.props.imgData, 0, 0);
    }

    return (
      <div className="img_display">
        <canvas 
            ref={ref => {this.canvasRef = ref;}} 
        ></canvas>
      </div>
    );
  }
}

export default ImgDisplay;
