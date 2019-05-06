import $ from 'jquery'; 
class Open{
    constructor(returnState, updateImage){
        this.returnState = returnState;
        this.updateImage = updateImage;
        this.title = 'Open';

        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        $('#open_file').trigger('click')
    }
}

export default Open;