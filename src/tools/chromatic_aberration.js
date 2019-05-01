class Open{
    constructor(returnState, updateImage){
        this.returnState = returnState;
        this.updateImage = updateImage;
        this.title = 'Chromatic Aberration';

        this.onStateStart = this.onStateStart.bind(this);
    }

    onStateStart(){
        return true;
    }

    onMouseDown(x, y){
        console.log('down',x, y);
    }

    onMouseMove(x, y){
        console.log('move');
    }

    onMouseUp(x, y){
        console.log('up',x, y);
    }
}

export default Open;