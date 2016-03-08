/**
 * Created by ian on 08/03/16.
 */

import React from 'react'

class CustomerList extends React.Component {

    constructor(){
        super()
    }

    showCreateCustomer(e){
        this.props.showList(false)
    }

    render(){
        //this.props.showList(false)
        return(
            <div>
                <button onClick={this.showCreateCustomer.bind(this)}>Create New Customer</button>
                <h2>Customer List</h2>
            </div>
        )
    }
}

export default CustomerList