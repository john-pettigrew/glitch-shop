import React from 'react';
import PropTypes from 'prop-types';
import './menu.css';

class Menu extends React.Component {
    constructor(props){
        super(props);

        this.fileUploaded = this.fileUploaded.bind(this);
    }

    fileUploaded(){
        if(this.fileUploadRef && this.fileUploadRef.files && this.fileUploadRef.files.length > 0){
            console.log(this.fileUploadRef.files);
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
        const items = this.props.items && this.props.items.map(item => {
            return (
                <li 
                title={item.title} 
                className="menu_item" 
                key={item.title}
                onClick={item.onStateStart}
                >
                    {item.title}
                </li>
            )
        })
        return (
            <div className={(this.props.side === 'right' ? 'menu_right' : 'menu_left')} >
                <ul className="menu">
                    { items }
                </ul>
                <input
                    type="file" 
                    id="open_file" 
                    accept="image/*" 
                    onChange={this.fileUploaded} 
                    ref={ref => {this.fileUploadRef = ref;}} 
                 />
            </div>
        );
    }

}

Menu.prototypes = {
    side: PropTypes.string,
    items: PropTypes.array.isRequired,
}

export default Menu;