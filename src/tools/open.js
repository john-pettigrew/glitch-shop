import $ from 'jquery'; 
class Open{
    constructor(setState, updateImage){
        this.setState = setState;
        this.updateImage = updateImage;
        this.title = 'Open';

        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        $('#open_file').trigger('click')
    }
}

export default Open;