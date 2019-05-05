class Open{
    constructor(returnState, updateImage, getCurrentImageData, setSecondaryButtons){
        this.returnState = returnState;
        this.updateImage = updateImage;
        this.getCurrentImageData = getCurrentImageData;
        this.setSecondaryButtons = setSecondaryButtons;
        this.title = 'Chromatic Aberration';
        this.clicking = false;
        this.lastClickingPosition = {x:0, y: 0};
        this.currentColor = 'r';

        this.onClick = this.onClick.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.shiftColor = this.shiftColor.bind(this);
        this.changeColor = this.changeColor.bind(this);

        this.secondaryButtons =[
            {
                title: 'Red',
                onClick: this.changeColor.bind(this, 'r'),
            },
            {
                title: 'Green',
                onClick: this.changeColor.bind(this, 'g'),
            },
            {
                title: 'Blue',
                onClick: this.changeColor.bind(this, 'b'),
            },
        ] 

    }

    onClick(){
        this.setSecondaryButtons(this.secondaryButtons);
        return true;
    }

    onMouseDown(x, y){
        this.clicking = true;
        this.lastClickingPosition = {x,y};
    }

    onMouseMove(newX, newY){
        if(this.clicking){
            this.shiftColor(newX - this.lastClickingPosition.x, newY - this.lastClickingPosition.y, 'g');
            this.lastClickingPosition = {x: newX,y: newY};
        }
    }

    onMouseUp(x, y){
        this.clicking = false;
    }

    changeColor(newColor){
        this.currentColor = newColor;
    }

    shiftColor(deltaX, deltaY){
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

export default Open;