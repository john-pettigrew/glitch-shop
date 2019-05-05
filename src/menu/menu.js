import React from 'react';
import PropTypes from 'prop-types';
import FileUpload from '../tools/file_upload';
import './menu.css';

class Menu extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        const items = this.props.items && this.props.items.map(item => {
            return (
                <li 
                title={item.title} 
                className="menu_item" 
                key={item.title}
                onClick={item.onClick}
                >
                    {item.title}
                </li>
            )
        })
        return (
            <div className={'menu_container ' + (this.props.side === 'right' ? 'menu_right' : 'menu_left')} >
                <ul className="menu">
                    { items }
                </ul>
                {this.props.fileUploadEnabled && 
                <FileUpload
                    initImage={this.props.initImage}
                ></FileUpload>
                }
            </div>
        );
    }

}

Menu.prototypes = {
    side: PropTypes.string,
    items: PropTypes.array.isRequired,
}

export default Menu;