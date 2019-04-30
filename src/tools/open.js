import $ from 'jquery'; 
class Open{
    constructor(returnState, updateImage){
        this.returnState = returnState;
        this.updateImage = updateImage;
        this.title = 'Open';

        this.onStateStart = this.onStateStart.bind(this);
    }

    onStateStart(){
        console.log('open...');
        $('#open_file').trigger('click')
        return false;
    }
}

export default Open;