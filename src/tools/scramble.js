class Chromatic{
    constructor(setState, updateImage, getCurrentImageData, setSecondaryButtons){
        this.setState = setState;
        this.updateImage = updateImage;
        this.getCurrentImageData = getCurrentImageData;
        this.setSecondaryButtons = setSecondaryButtons;
        this.title = 'Scramble';
        this.clicking = false;
        this.brushSize = 36;

        this.onClick = this.onClick.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.scramble = this.scramble.bind(this);
    }

    onClick(){
        this.setState(this);
        this.setSecondaryButtons(null);
    }

    onMouseDown(x, y){
        this.clicking = true;
        this.scramble(x, y);
    }

    onMouseMove(x, y){
        if(this.clicking){
            this.scramble(x, y);
        }
    }

    onMouseUp(x, y){
        this.clicking = false;
    }

    scramble(xClick, yClick){
        const image = this.getCurrentImageData();
        const imageData = image.data;
        const originalArr = imageData.slice();
        let foundColors;
        let randomX, randomY;

        let xStartPos = xClick - this.brushSize / 2;
        if(xStartPos < 0){
            xStartPos = 0;
        }
        let yStartPos = yClick - this.brushSize / 2;
        if(yStartPos < 0){
            yStartPos = 0;
        }

        let xEndPos = xClick + this.brushSize / 2;
        if(xEndPos > image.width){
            xEndPos = image.width - 1;
        }
        let yEndPos = yClick + this.brushSize / 2;
        if(yEndPos > image.height){
            yEndPos = image.height - 1;
        }

        for(let x = xStartPos; x < xEndPos; x+=1){
            for(let y = yStartPos; y < yEndPos; y+=1){
                randomX = Math.floor( Math.random() * (xEndPos - xStartPos) + xStartPos );
                randomY = Math.floor( Math.random() * (yEndPos - yStartPos) + yStartPos );
                foundColors = getPixelsAtPos(randomX, randomY);
                for(let i = 0; i < 4; i++){
                    imageData[((image.width * y + x) * 4) + i] = foundColors[i];
                }
            }
        }

        this.updateImage(image);


        function getPixelsAtPos(x, y){
            const pixelStart = (image.width * y + x) * 4;

            return [
                originalArr[pixelStart],
                originalArr[pixelStart + 1],
                originalArr[pixelStart + 2],
                originalArr[pixelStart + 3],
            ];
        }
    }

}

export default Chromatic;