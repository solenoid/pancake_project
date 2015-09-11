import React from 'react';

import compact from 'lodash/array/compact';
import map from 'lodash/collection/map';

// Loosely based on but much simpler than
// https://facebook.github.io/fixed-data-table/

let Cell = React.createClass({
  propTypes: {
    row: React.PropTypes.object.isRequired,
    name: React.PropTypes.string.isRequired
  },
  render () {
    let { row, name } = this.props;
    let cssClass = compact(['cell', name]).join(' ');
    let value = row[name];
    return (
      <span
        className={ cssClass }>
        { name === 'is_enabled' ? (value ? '\u2714' : '\u2718') : value }
      </span>
    );
  }
});

let ColumnHeader = React.createClass({
  propTypes: {
    onColumnToggle: React.PropTypes.func.isRequired,
    name: React.PropTypes.string.isRequired,
    active: React.PropTypes.bool.isRequired,
    direction: React.PropTypes.string.isRequired
  },
  handleClick () {
    this.props.onColumnToggle(this.props.name);
  },
  render () {
    let { name, active, direction } = this.props;
    let cssClass = compact(['cell', name, active ? 'active' : null]).join(' ');
    return (
      <span
        onClick={ this.handleClick }
        className={ cssClass }>
        { name === 'is_enabled' ? 'E' : name }
        { active ? <span className='direction'>{ direction.split('').join(' ') }</span> : null }
      </span>
    );
  }
});

let COLUMN_NAMES = ['name', 'email', 'is_enabled', 'company', 'office', 'uid'];
export let Table = React.createClass({
  propTypes: {
    onColumnToggle: React.PropTypes.func.isRequired,
    column: React.PropTypes.string.isRequired,
    direction: React.PropTypes.string.isRequired,
    rows: React.PropTypes.array.isRequired
  },
  render () {
    return (
      <div className='flip-the-table'>
        <div className='row header'>
          { map(COLUMN_NAMES, (name) => (
              <ColumnHeader
                onColumnToggle={ this.props.onColumnToggle }
                active={ this.props.column === name }
                direction={ this.props.direction }
                key={ name }
                name={ name } />
            )
          )}
        </div>
        { map(this.props.rows, (row) => (
            <div className='row' key={ row.uid }>
              { map(COLUMN_NAMES, (name) => (
                  <Cell
                    row={ row }
                    key={ name }
                    name={ name } />
                )
              )}
            </div>
          )
        )}
      </div>
    );
  }
});
