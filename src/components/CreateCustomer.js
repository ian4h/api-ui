/**
 * Created by ian on 08/03/16.
 */

import React from 'react'

class CreateCustomer extends React.Component {

    handleFormSubmit(e){
        e.preventDefault()
        console.log("Form Submission")
    }

    showCustomerList(){
        this.props.showList(true)
    }

    render(){
        return(
            <div className="customer-form">
                <button onClick={this.showCustomerList.bind(this)}>Show Customer List</button>
                <form action="" onSubmit={this.handleFormSubmit}>
                    <h2>Create New Customer</h2>
                    <label for="name">Customer Name:</label>
                    <input type="text" id="name"/><br/>
                    <label for="environment">Envionment</label>
                    <select id="environment">
                        <option value="dev">Dev</option>
                        <option value="test">Test</option>
                        <option value="prod">Prod</option>
                    </select><br/>
                    <label for="dbUrl">Database URL: </label>
                    <input type="text" id="dbUrl"/><br/>
                    <label for="dbUser">Database username: </label>
                    <input type="text" id="dbUser"/><br/>
                    <label for="dbPassword">Database Password: </label>
                    <input type="text" id="dbPassword"/><br/>
                    <input type="submit"/>
                </form>
            </div>
        );
    }
}

export default CreateCustomer