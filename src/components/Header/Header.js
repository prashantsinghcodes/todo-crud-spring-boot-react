import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './Header.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: true
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        localStorage.removeItem('token');
        this.setState({loggedIn:false});
    }


    render() {
        const { loggedIn } = this.state;
        if(!loggedIn) {
            return <Redirect to="/" />
        }
        return (
            <ul class="breadcrumb">
                {
                    this.props.menu.map(
                        v =>  <li><Link to={v.value}>{v.key}</Link></li>
                    )
                }
                <li onClick={this.handleClick}><i className="fa fa-sign-out">Logout</i></li>
            </ul>
            
        )
    }
}

export default Header;