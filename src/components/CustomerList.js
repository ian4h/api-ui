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

    /**
     *                 <Griddle
     results={this.props.customers}
     showSettings={true}
     resultsPerPage={25}
     columns={columns}
     columnMetadata={columnMeta}
     testProp="test"
     />
     * @param e
     */

    showCreateCustomer(e){
        this.props.showList(false)
    }

    deleteCustomer(e){
        console.log("Delete Customer")
        console.log(e)
        console.log(e.currentTarget.id)
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
            this.props.updateCustomers()
        })
        request.fail((response) => {
            console.log("Failure")
            console.log(response)
        })
    }

    render(){
        var columns = ['id', 'name', 'environment', 'dbUrl', 'dbUser', 'dbPassword', 'delete'];
        var columnMeta = [{
            "columnName": "delete",
            "visible": true,
            "customComponent": LinkComponent
        }]

        console.log("THIS CUST LENGTH > " + this.props.customers.length)

        //console.log("Customerss >>")
        //console.log(this.props.customers)
        //var customers = this.props.customers.map(function(elem){
        //    console.log("map")
        //    console.log(typeof elem)
        //    console.log(elem)
        //    return(
        //        <li key={elem.id}>{elem.name}</li>
        //    )
        //})
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
                        width={100}
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
                        cell={<TextCell data={this.props.customers} col="dbUrl" />}
                    />
                    <Column
                        width={200}
                        header={<Cell>dbUser</Cell>}
                        cell={<TextCell data={this.props.customers} col="dbUser" />}
                    />
                    <Column
                        width={200}
                        header={<Cell>dbPassword</Cell>}
                        cell={<TextCell data={this.props.customers} col="dbPassword" />}
                    />
                    <Column
                        width={200}
                        header={<Cell>Delete</Cell>}
                        cell={<DeleteButton data={this.props.customers} deleteCustomer={this.deleteCustomer.bind(this)} col="delete" />}
                    />
                </Table>
            </div>
        )
    }
}

const TextCell = ({rowIndex, data, col, ...props}) => (
    <Cell {...props}>
        {data[rowIndex][col]}
    </Cell>
);

const DeleteButton = ({rowIndex, data, col, ...props}) => (
    <Cell {...props}>
        <button id={data[rowIndex].id} onClick={props.deleteCustomer}>Delete {data[rowIndex].id}</button>
    </Cell>
)

class LinkComponent extends React.Component {
    render(){
        console.log(this.props)
        return(
            <button>Delete {this.props.rowData.id}</button>
        )
    }
}

export default CustomerList