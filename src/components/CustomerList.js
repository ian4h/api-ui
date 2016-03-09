/**
 * Created by ian on 08/03/16.
 */

import React from 'react'

class CustomerList extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            customers: []
        }
        console.log("PROPS!")
        console.log(this.props)
    }

    showCreateCustomer(e){
        this.props.showList(false)
    }

    render(){
        return(
            <div>
                <button onClick={this.showCreateCustomer.bind(this)}>Create New Customer</button>
                <h2>Customer List</h2>
                {this.props.customers}
            </div>
        )
    }
}

export default CustomerList