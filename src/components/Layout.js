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
        this.getCustomers()
    }

    getCustomers(){
        var request = $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/customers',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Basic '+ btoa("username:password"))
            },
            dataType: 'json'
        });
        request.success(data => {
            this.setState({customers: JSON.parse(data.data[0])})
        });
    }

    putCustomer(e){
        let updatedCustomer;
        this.state.customers.forEach((cust) => {
            if(cust.id == e.currentTarget.id){
                updatedCustomer = cust
            }
        })
        var request = $.ajax({
            type: 'PUT',
            url: 'http://localhost:8080/customers/'+e.currentTarget.id,
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Basic '+ btoa("username:password"))
            },
            dataType: 'json',
            data: JSON.stringify(updatedCustomer)
        });
        request.success((data) => {
            console.log("Successful put >> ", data)
        })
    }

    //updates the state of the customer object on input event
    updateCustomer(field, event){
        console.log("Update customers")
        console.log(event)
        var newState = this.state
        newState.customers.forEach((cust) => {
            if(cust.id == event.target.name){
                console.log("Found it inpit >> ", cust)
                cust[field] = event.target.value
            }
        })
        this.setState(newState)
    }

    render() {
        return(
            <div style={this.layoutStyle}>
                <Nav />
                <h1>Application Header</h1>
                {this.props.children && React.cloneElement(this.props.children,
                    {   customers: this.state.customers,
                        getCustomers: this.getCustomers.bind(this),
                        updateCustomer: this.updateCustomer.bind(this),
                        putCustomer: this.putCustomer.bind(this)
                    })}
            </div>
        );
    }
}

export default Layout