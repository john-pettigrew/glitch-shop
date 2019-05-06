const downloadId = 'download_link';
const downloadFileName = 'glitch_art';
class Save{
    constructor(returnState, updateImage, getCurrentImageData, setSecondaryButtons, getDataURL){
        this.getDataURL = getDataURL;
        this.title = 'Save';
        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        const downloadLink = document.getElementById(downloadId);
        if(!downloadLink){
            throw new Error('Error saving file');
        }
        const date = new Date();
        downloadLink.setAttribute('download', `${downloadFileName}_${date.getTime()}`);
        const imageData = this.getDataURL();
        if(!imageData){
            throw new Error('Error saving file');
        }
        downloadLink.setAttribute('href', imageData);
        downloadLink.click();
    }
}

export default Save;