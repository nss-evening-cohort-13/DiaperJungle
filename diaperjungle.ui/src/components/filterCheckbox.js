import React from 'react';

export default class FilterCheckbox extends React.Component {
  render() {
    const { category, quantity, filterProducts } = this.props;
    return (
            <div className="checkbox-component">
            <input type="checkbox" className="checkbox" value={category.category} onChange={(e) => filterProducts(e)}></input>
            <label>{category.category} ({quantity})</label>
            </div>
    );
  }
}
