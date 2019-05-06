import React from 'react';

class ImgDisplay extends React.Component {
  constructor(props){
    super(props);

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.getCurrentImageData = this.getCurrentImageData.bind(this);
  }

  onMouseDown(e) {
    const canvas = this.canvasRef;
    const rect = canvas.getBoundingClientRect();
    this.props.onMouseDown(e.clientX - rect.left, e.clientY - rect.top);
  }

  onMouseMove(e) {
    const canvas = this.canvasRef;
    const rect = canvas.getBoundingClientRect();
    this.props.onMouseMove(e.clientX - rect.left, e.clientY - rect.top);
  }

  onMouseUp(e) {
    const canvas = this.canvasRef;
    const rect = canvas.getBoundingClientRect();
    this.props.onMouseUp(e.clientX - rect.left, e.clientY - rect.top);
  }

  componentDidMount(){
    const canvas = this.canvasRef;
    canvas.addEventListener('mousedown', this.onMouseDown);
    canvas.addEventListener('mousemove', this.onMouseMove);
    canvas.addEventListener('mouseup', this.onMouseUp);
  }

  componentWillUnmount(){
    const canvas = this.canvasRef;
    canvas.removeEventListener('mousedown', this.onMouseDown);
    canvas.removeEventListener('mousemove', this.onMouseMove);
    canvas.removeEventListener('mouseup', this.onMouseUp);
  }

  getCurrentImageData(){
      const canvas = this.canvasRef;
      const ctx = canvas.getContext('2d');
      return ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  getDataURL(){
      const canvas = this.canvasRef;
      return canvas.toDataURL('image/png');
  }

  clearScreen(){
      const canvas = this.canvasRef;
      const ctx = canvas.getContext('2d');
      return ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  render(){
    if(this.props.initImage || this.props.imageData){
      const canvas = this.canvasRef;
      const ctx = canvas.getContext('2d');
      if(this.props.imageData){
          ctx.putImageData(this.props.imageData, 0, 0);
      }
      else{
          ctx.drawImage(this.props.initImage, 0, 0, 500, 500);
      }
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
