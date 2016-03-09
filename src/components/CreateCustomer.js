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

    handleFormSubmit(e){
        e.preventDefault()
        console.log("Form Submission");
        console.log(this.state);

        var config = {
            //headers: {
            //    'Authorization': 'Basic '+ btoa("username:password")
            //},
            auth: {
                username: 'username',
                password: 'password'
            },
            withCredentials: true,
            data: this.state
        };

        var data = this.state;
        console.log("NEW CONFIG")
        console.log(config)
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/customers',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Basic '+ btoa("username:password"))
            },
            data: JSON.stringify(this.state),
            success: function(data){
                console.log("Success!")
                console.log(data)
            },
            dataType: 'json'
        })
        //axios.post('http://localhost:8080/customers', config)
        //    .then(function(response){
        //        console.log("Post Response >>> " );
        //        console.log(response)
        //    })
        //    .catch(function(err){
        //        console.log("Axios error");
        //        console.log(err);
        //    })
    }

    showCustomerList(){
        this.props.showList(true)
    }

    handleChange(field, e){
        var newState = this.state;
        newState[field] = e.target.value;
        this.setState(newState);
    }

    render(){
        console.log(this.state)
        return(
            <div className="customer-form">
                <button onClick={this.showCustomerList.bind(this)}>Show Customer List</button>
                <form action="" onSubmit={this.handleFormSubmit.bind(this)}>
                    <h2>Create New Customer</h2>
                    <label for="name">Customer Name:</label>
                    <input type="text" id="name" onChange={ this.handleChange.bind(this, 'name')}/><br/>
                    <label for="environment">Envionment</label>
                    <select id="environment" onChange={ this.handleChange.bind(this, 'environment')}>
                        <option value="dev">Dev</option>
                        <option value="test">Test</option>
                        <option value="prod">Prod</option>
                    </select><br/>
                    <label for="dbUrl">Database URL: </label>
                    <input type="text" id="dbUrl" onChange={ this.handleChange.bind(this, 'dbUrl')} /><br/>
                    <label for="dbUser">Database username: </label>
                    <input type="text" id="dbUser" onChange={ this.handleChange.bind(this, 'dbUser')} /><br/>
                    <label for="dbPassword">Database Password: </label>
                    <input type="text" id="dbPassword" onChange={ this.handleChange.bind(this, 'dbPassword')} /><br/>
                    <input type="submit"/>
                </form>
            </div>
        );
    }
}

export default CreateCustomer