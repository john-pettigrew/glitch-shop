import React from 'react';

export default class FileUpload extends React.Component{
    constructor(props){
        super(props);
        this.fileUploaded = this.fileUploaded.bind(this);
    }

    fileUploaded(){
        if(this.fileUploadRef && this.fileUploadRef.files && this.fileUploadRef.files.length > 0){
            const reader = new FileReader();
            reader.onerror = (err) => {
                if(this.props.showErr){
                    this.props.showErr('Error loading file...');
                }
            }
            reader.onload = (e) => {
                if(this.props.updateImage){
                    const newImg = new Image();
                    newImg.addEventListener('load', () => {
                        this.props.updateImage(newImg);
                    });
                    newImg.src = e.target.result;
                }
            }
            reader.readAsDataURL(this.fileUploadRef.files[0]);
        }
    }

    render(){

        return (
            <input
                type="file" 
                id="open_file" 
                accept="image/*" 
                onChange={this.fileUploaded} 
                ref={ref => {this.fileUploadRef = ref;}} 
            />
        )
    }
}