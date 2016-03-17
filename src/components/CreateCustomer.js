/**
 * Created by ian on 08/03/16.
 */

import React from 'react'
var axios = require('axios');

class CreateCustomer extends React.Component {

    constructor(){
        super();
        this.state = {
            name: '',
            environment: 'dev',
            dbUrl: '',
            dbUser: '',
            dbPassword: ''
        }
    }

    onFormSuccess(){
        console.log("On Form Success Method")
        this.props.getCustomers()
    }

    handleFormSubmit(e){
        e.preventDefault()
        var request = $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/customers',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Basic '+ btoa("username:password"))
            },
            data: JSON.stringify(this.state),
            dataType: 'json'
        });
        request.success((data) => {
            this.onFormSuccess();
            this.setState({
                name: '',
                environment: 'dev',
                dbUrl: '',
                dbUser: '',
                dbPassword: ''
            });
            $('#customerCreated').show().delay(3000).fadeOut();
        });
        request.fail((data) => {
            console.log("Failure!", data);
            $('#customerCreateFailed').show().delay(3000).fadeOut();
        });
    }

    handleChange(field, e){
        var newState = this.state;
        newState[field] = e.target.value;
        this.setState(newState);
    }

    render(){
        var labelStyle = {
            width: '140px',
            display: 'inline-block'
        };
        return(
            <div className="customer-form">
                <form action="" onSubmit={this.handleFormSubmit.bind(this)}>
                    <h2>Create New Customer</h2>
                    <label style={labelStyle} for="name">Customer Name:</label>
                    <input type="text" id="name" onChange={ this.handleChange.bind(this, 'name')} value={this.state.name}/><br/>
                    <label style={labelStyle} for="environment">Environment: </label>
                    <select id="environment" onChange={ this.handleChange.bind(this, 'environment')} value={this.state.environment}>
                        <option value="dev">Dev</option>
                        <option value="test">Test</option>
                        <option value="prod">Prod</option>
                    </select><br/>
                    <label style={labelStyle} for="dbUrl">Database URL: </label>
                    <input type="text" id="dbUrl" onChange={ this.handleChange.bind(this, 'dbUrl')} value={this.state.dbUrl} /><br/>
                    <label style={labelStyle} for="dbUser">Database username: </label>
                    <input type="text" id="dbUser" onChange={ this.handleChange.bind(this, 'dbUser')} value={this.state.dbUser} /><br/>
                    <label style={labelStyle} for="dbPassword">Database Password: </label>
                    <input type="text" id="dbPassword" onChange={ this.handleChange.bind(this, 'dbPassword')} value={this.state.dbPassword} /><br/>
                    <input type="submit"/>
                    <span id="customerCreated" style={{display: 'none'}}>Customer Created</span>
                    <span id="customerCreateFailed" style={{display: 'none'}}>Failed to create Customer</span>
                </form>
            </div>
        );
    }
}

export default CreateCustomer