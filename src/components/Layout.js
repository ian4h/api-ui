/**
 * Created by ian on 08/03/16.
 */
import React from "react";
import ReactDom from "react-dom";

import CreateCustomer from './CreateCustomer'
import CustomerList from './CustomerList'
import Nav from './Nav'

class Layout extends React.Component {

    constructor(){
        super()
        this.state = {
            showForm: false,
            customers: []
        }
        this.layoutStyle = {
            marginLeft: "250px"
        }
    }

    showList(showForm) {
        this.setState({showForm})
    }

    render() {
        console.log("Layout Render");
        console.log(this.props)
        const { location } = this.props
        console.log("Location >>> ")
        console.log(location)
        return(
            <div style={this.layoutStyle}>
                <Nav />
                <h1>Application Header</h1>
                {this.props.children}
            </div>
        );
    }
}

export default Layout