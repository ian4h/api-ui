/**
 * Created by ian on 08/03/16.
 */

import React from 'react'
import {Table, Column, Cell} from 'fixed-data-table'

class CustomerList extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            customers: [],
            columnWidths: {
                id: 50,
                name: 200,
                environment: 200,
                dbUrl: 200,
                dbUser: 100,
                dbPassword: 100
            }
        };
        this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
    }

    deleteCustomer(e){
        var id = e.currentTarget.id;
        console.log(id);
        var request = $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8080/customers/'+id,
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
            console.log('#deleteFailed_'+id);
            $('#deleteFailed_'+id).show().delay(5000).fadeOut()
        })
    }

    handleInputChange(field, e){
        console.log("On input Change")
        this.props.updateCustomer(field, e)
    }

    _onColumnResizeEndCallback(newColumnWidth, columnKey){
        console.log("_onColumnResizeEndCallback")
        console.log("newColumnWidth : ", newColumnWidth)
        console.log("ColumnKeY : ", columnKey)
        console.log(this.state.columnWidths)
        this.setState(({columnWidths}) => ({
            columnWidths: {
                ...columnWidths,
                [columnKey]: newColumnWidth
            }
        }));
        console.log(this.state.columnWidths)
    }

    render(){
        var windowWidth = window.innerWidth;
        var {columnWidths} = this.state;
        console.log("Render");
        return(
            <div>
                <h2>Customer List</h2>
                <Table
                    rowHeight={50}
                    headerHeight={50}
                    rowsCount={this.props.customers.length}
                    width={windowWidth - 250}
                    height={1000}
                    onColumnResizeEndCallback={this._onColumnResizeEndCallback}
                    isColumnResizing={false}
                    {...this.props}>
                    <Column
                        header={<Cell>id</Cell>}
                        cell={<TextCell data={this.props.customers} col="id" />}
                        columnKey="id"
                        fixed={true}
                        width={columnWidths.id}
                        isResizable={true}
                    />
                    <Column
                        header={<Cell>name</Cell>}
                        columnKey="name"
                        cell={<InputCell data={this.props.customers} handleChange={this.handleInputChange.bind(this, 'name')} col="name" />}
                        width={columnWidths.name}
                        isResizable={true}
                    />
                    <Column
                        header={<Cell>environment</Cell>}
                        columnKey="environment"
                        cell={<SelectCell data={this.props.customers} handleChange={this.handleInputChange.bind(this, 'environment')} col="environment" />}
                        width={columnWidths.environment}
                        isResizable={true}
                    />
                    <Column
                        width={columnWidths.dbUrl}
                        header={<Cell>dbUrl</Cell>}
                        columnKey="dbUrl"
                        flexGrow={1}
                        cell={<InputCell data={this.props.customers} handleChange={this.handleInputChange.bind(this, 'dbUrl')} col="dbUrl" />}
                        isResizable={true}
                    />
                    <Column
                        width={columnWidths.dbUser}
                        columnKey="dbUser"
                        header={<Cell>dbUser</Cell>}
                        flexGrow={1}
                        cell={<InputCell data={this.props.customers} handleChange={this.handleInputChange.bind(this, 'dbUser')} col="dbUser" />}
                        isResizable={true}
                    />
                    <Column
                        width={columnWidths.dbPassword}
                        header={<Cell>dbPassword</Cell>}
                        columnKey="dbPassword"
                        flexGrow={1}
                        cell={<InputCell data={this.props.customers} handleChange={this.handleInputChange.bind(this, 'dbPassword')} col="dbPassword" />}
                        isResizable={true}
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
        <input style={{width: props.width-20}} type="text" onChange={props.handleChange} value={data[rowIndex][col]} name={data[rowIndex].id}/>
    </Cell>
);

const SelectCell = ({rowIndex, data, col, ...props}) => (
    <Cell {...props} >
        <select id="environment" onChange={props.handleChange} name={data[rowIndex].id} value={data[rowIndex][col]}>
            <option value="dev">Dev</option>
            <option value="test">Test</option>
            <option value="prod">Prod</option>
        </select>
    </Cell>
);

const OptionsCell = ({rowIndex, data, col, ...props}) => (
    <Cell {...props}>
        <button id={data[rowIndex].id} onClick={props.updateCustomer}>Update</button>
        <button id={data[rowIndex].id} onClick={props.deleteCustomer}>Delete</button>
        <span id={'updating_'+data[rowIndex].id} style={{display: 'none'}}>Updating...</span>
        <span id={'updateOk_'+data[rowIndex].id} style={{display: 'none'}}>Update ok</span>
        <span id={'updateFailed_'+data[rowIndex].id} style={{display: 'none'}}>Update Failed</span>
        <span id={'deleteFailed_'+data[rowIndex].id} style={{display: 'none'}}>Delete Failed</span>
    </Cell>
);


export default CustomerList