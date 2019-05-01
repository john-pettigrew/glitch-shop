import React from 'react';

class ImgDisplay extends React.Component {
  constructor(props){
    super(props);
  }



  render(){
    if(this.props.imgData){
        const canvas = this.canvasRef;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(this.props.imgData, 0, 0, 500, 500);
    }

    return (
      <div className="img_display">
        <canvas
          width="500"
          height="500"
            ref={ref => {this.canvasRef = ref;}} 
        ></canvas>
      </div>
    );
  }
}

export default ImgDisplay;
