/**
 * Created by ian on 08/03/16.
 */
import React from "react";
import ReactDom from "react-dom";

import CreateCustomer from './CreateCustomer'
import CustomerList from './CustomerList'
import Nav from './Nav'
var axios = require('axios');

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

    componentDidMount() {
        var _this = this
        var config = {
            headers: {
                'Authorization': 'Basic '+ btoa("username:password")
            },
            withCredentials: true
        };
        console.log("Config >>> " + config)
        axios.get('http://localhost:8080/customers', config).then(function(response){
            console.log("Axios responnse >>>> ")
            console.log(response.status)
            console.log(response)
            console.log(response.data)
            console.log(response.data.data)
            _this.setState({customers: response.data.data})
        });
        console.log("ComponentDidMount");
    }

    render() {
        console.log("Layout Render");
        console.log("state >> " + this.state.customers)
        return(
            <div style={this.layoutStyle}>
                <Nav />
                <h1>Application Header</h1>
                {React.cloneElement(this.props.children, {customers: this.state.customers})}
            </div>
        );
    }
}

export default Layout