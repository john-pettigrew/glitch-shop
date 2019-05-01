import React from 'react';
import PropTypes from 'prop-types';
import './menu.css';
import FileUpload from '../tools/file_upload';

class Menu extends React.Component {
    constructor(props){
        super(props);
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
                 <FileUpload
                    updateImage={this.props.updateImage}
                 ></FileUpload>
            </div>
        );
    }

}

Menu.prototypes = {
    side: PropTypes.string,
    items: PropTypes.array.isRequired,
}

export default Menu;