import React from 'react';

import {
  // httpClient,
  falcorModel
} from './client-data';

import { Table } from './fixedTable.jsx';
import sortBy from 'lodash/collection/sortBy';

let App = React.createClass({
  getInitialState () {
    return {
      sortColumn: 'name',
      sortDirection: 'az',
      sorted: []
    };
  },
  componentDidMount () {
    // httpClient({
    //   path: '/api/users.json'
    // }).then((res) => {
    //   this.setState({
    //     sorted: sortBy(res.entity, this.state.sortColumn)
    //   });
    // });
    falcorModel.get('users[0..9]["name","email","is_enabled","company","office","uid"]').then((d) => {
      this.setState({
        sorted: sortBy(d.json.users, this.state.sortColumn)
      });
    });
  },
  handleColumnToggle (newColumn) {
    let newDirection = (this.state.sortDirection === 'az' && this.state.sortColumn === newColumn) ? 'za' : 'az';
    // TODO consider special casing the `is_enabled` sort
    let sorted;
    if (newDirection === 'az') {
      sorted = sortBy(this.state.sorted, newColumn);
    } else {
      sorted = sortBy(this.state.sorted, newColumn).reverse();
    }
    this.setState({
      sortColumn: newColumn,
      sortDirection: newDirection,
      sorted: sorted
    });
  },
  render () {
    return (
      <div>
        <h1>Welcome to the Jungle</h1>
        <p>There are { this.state.sorted.length } users in the system.</p>
        <Table
          onColumnToggle={ this.handleColumnToggle }
          column={ this.state.sortColumn }
          direction={ this.state.sortDirection }
          rows={ this.state.sorted }/>
      </div>
    );
  }
});

React.render(<App/>, document.body);
