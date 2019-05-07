class PixelShift{
    constructor(setState, updateImage, getCurrentImageData, setSecondaryButtons){
        this.setState = setState;
        this.updateImage = updateImage;
        this.getCurrentImageData = getCurrentImageData;
        this.setSecondaryButtons = setSecondaryButtons;

        this.title = 'Pixel Shift';
        this.clicking = false;
        this.startClickPosition = {x:0, y: 0};
        this.brushSize = 30;

        this.onClick = this.onClick.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
    }

    onClick(){
        this.setState(this);
        this.setSecondaryButtons(null);
    }

    onMouseDown(x, y){
        this.clicking = true;
        this.startClickPosition = {x,y};
    }

    onMouseMove(newX, newY){
        if(this.clicking){
            this.shiftPixels(newX - this.startClickPosition.x, newY - this.startClickPosition.x);
        }
    }

    onMouseUp(x, y){
        this.clicking = false;
    }

    changeColor(newColor){
        this.currentColor = newColor;
    }

    shiftPixels(deltaX, deltaY){
        let colorOffset = 0;
        if(this.currentColor === 'g'){
            colorOffset = 1;
        }
        if(this.currentColor === 'b'){
            colorOffset = 2;
        }
        const image = this.getCurrentImageData();
        const imageData = image.data;
        const pixelGroups = imageData.length / 4;
        const originalArr = imageData.slice();
        let currentX, currentY, newX, newY;
        for(let i = 0; i < pixelGroups; i+=1){
            currentX =  i % image.width;
            currentY =  Math.floor(i / image.width);
            newX = currentX - deltaX;
            newY = currentY - deltaY;

            if(newX < 0){
                newX = image.width + newX;
            }else if(newX > image.width - 1){
                newX = newX - image.width;
            }

            if(newY < 0){
                newY = image.height + newY;
            }else if(newY > image.height - 1){
                newY = newY - image.height;
            }
            imageData[i*4 + colorOffset] = originalArr[(image.width * newY + newX) * 4 + colorOffset];
        }

        this.updateImage(image);
    }
}

export default PixelShift;