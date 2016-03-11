/**
 * Created by ian on 08/03/16.
 */

import React from 'react'
//import {Table, Column, Cell} from 'fixed-data-table'
//import { Griddle } from 'griddle-react'
var FixedDataTable = require('fixed-data-table');
const {Table, Column, Cell} = FixedDataTable;
var Griddle = require('griddle-react');
//import tableStyle from '../../node_modules/fixed-data-table/dist/fixed-data-table.css'

class CustomerList extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            customers: []
        }
    }

    //componentWillReceiveProps(){
    //    console.log("componentWillReceiveProps *****************************************************")
    //    console.log(this.state)
    //    this.setState({customers: this.props.customers})
    //    console.log(this.state)
    //    console.log("Pros custmoers ? ", this.props.customers)
    //}

    showCreateCustomer(e){
        this.props.showList(false)
    }

    deleteCustomer(e){
        var request = $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8080/customers/'+e.currentTarget.id,
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Basic ' + btoa("username:password"))
            }
        });
        request.success((response) => {
            console.log("SuccessFul Delete >> " );
            console.log(response);
            this.props.getCustomers()
        })
        request.fail((response) => {
            console.log("Failure")
            console.log(response)
        })
    }

    handleInputChange(field, e){
        console.log("On input Change")
        this.props.updateCustomer(field, e)
    }

    render(){
        var windowWidth = window.innerWidth
        return(
            <div>
                <button onClick={this.showCreateCustomer.bind(this)}>Create New Customer</button>
                <h2>Customer List</h2>
                <Table
                    rowHeight={50}
                    headerHeight={50}
                    rowsCount={this.props.customers.length}
                    width={windowWidth - 250}
                    height={1000}
                    {...this.props}>
                    <Column
                        header={<Cell>id</Cell>}
                        cell={<TextCell data={this.props.customers} col="id" />}
                        fixed={true}
                        width={50}
                    />
                    <Column
                        header={<Cell>name</Cell>}
                        cell={<TextCell data={this.props.customers} col="name" />}
                        width={200}
                    />
                    <Column
                        header={<Cell>environment</Cell>}
                        cell={<TextCell data={this.props.customers} col="environment" />}
                        width={200}
                    />
                    <Column
                        width={300}
                        header={<Cell>dbUrl</Cell>}
                        cell={<InputCell data={this.props.customers} handleChange={this.handleInputChange.bind(this, 'dbUrl')} col="dbUrl" />}
                    />
                    <Column
                        width={100}
                        header={<Cell>dbUser</Cell>}
                        cell={<TextCell data={this.props.customers} col="dbUser" />}
                    />
                    <Column
                        width={100}
                        header={<Cell>dbPassword</Cell>}
                        cell={<TextCell data={this.props.customers} col="dbPassword" />}
                    />
                    <Column
                        width={200}
                        header={<Cell>Options</Cell>}
                        cell={
                                <OptionsCell
                                    data={this.props.customers}
                                    deleteCustomer={this.deleteCustomer.bind(this)}
                                    updateCustomer={this.props.putCustomer}
                                    col="delete"
                                />
                             }
                    />
                </Table>
            </div>
        )
    }
}

const TextCell = ({rowIndex, data, col, ...props}) => (
    <Cell {...props}>
        <span>{data[rowIndex][col]}</span>
    </Cell>
);

const InputCell = ({rowIndex, data, col, ...props}) => (
    <Cell {...props}>
        <input type="text" onChange={props.handleChange} value={data[rowIndex][col]} name={data[rowIndex].id}/>
    </Cell>
);

const OptionsCell = ({rowIndex, data, col, ...props}) => (
    <Cell {...props}>
        <button id={data[rowIndex].id} onClick={props.updateCustomer}>Update {data[rowIndex].id}</button>
        <button id={data[rowIndex].id} onClick={props.deleteCustomer}>Delete {data[rowIndex].id}</button>
    </Cell>
);

class LinkComponent extends React.Component {
    render(){
        console.log(this.props)
        return(
            <button>Delete {this.props.rowData.id}</button>
        )
    }
}

export default CustomerList