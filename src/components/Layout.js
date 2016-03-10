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
        super();
        this.state = {
            showForm: false,
            customers: []
        };
        this.layoutStyle = {
            marginLeft: "200px"
        };
    }

    componentDidMount() {
        console.log("ComponentDidMount");
        this.getCustomers()
    }

    getCustomers(){
        console.log("Get Customers");
        var request = $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/customers',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Basic '+ btoa("username:password"))
            },
            dataType: 'json'
        });
        request.success(data => {
            console.log(data)
            this.setState({customers: JSON.parse(data.data[0])})
        });
    }

    render() {
        return(
            <div style={this.layoutStyle}>
                <Nav />
                <h1>Application Header</h1>
                {this.props.children && React.cloneElement(this.props.children,
                    {   customers: this.state.customers,
                        updateCustomers: this.getCustomers.bind(this)
                    })}
            </div>
        );
    }
}

export default Layout