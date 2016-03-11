/**
 * Created by ian on 08/03/16.
 */

import React from 'react'

import { IndexLink, Link } from 'react-router'

export default class Nav extends React.Component {

    constructor(){
        super();
        this.state = {}
        this.divStyle = {
            //float: 'left',
            border: '1px solid',
            height: '100%',
            width: '200px',
            position: 'fixed', /* Stay in place */
            //zIndex: '1',
            top: '0',
            left: '0'
        }
    }

    render(){
        return(
            <div style={this.divStyle}>
                <ul>
                    <li>
                        <IndexLink to="/">Home</IndexLink>
                    </li>
                    <li>
                        <Link to="createCustomer">create customer</Link>
                    </li>
                </ul>
            </div>
        )
    }
}