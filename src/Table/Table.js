import React from 'react'

export default props => (

  <table className="table">
  <thead>
    <tr>
      <th onClick={props.onSort.bind(null, 'id')}>
        ID {props.Sorting === 'id' ? <small>{props.sort}</small> : null}
      </th>
      <th onClick={props.onSort.bind(null, 'firstName')}>
        First Name {props.Sorting === 'firstName' ? <small>{props.sort}</small> : null}
      </th>
      <th onClick={props.onSort.bind(null, 'lastName')}>
        Last Name {props.Sorting === 'lastName' ? <small>{props.sort}</small> : null}
      </th>
      <th onClick={props.onSort.bind(null, 'email')}>
        Email {props.Sorting === 'email' ? <small>{props.sort}</small> : null}
      </th>
      <th onClick={props.onSort.bind(null, 'phone')}>
        Phone {props.Sorting === 'phone' ? <small>{props.sort}</small> : null}
      </th>
    </tr>
  </thead>
    <tbody>
    {props.data.map(item =>(
      <tr key={item.id+item.lastName} onClick={props.onRowSelect.bind(null, item)}>
        <td>{item.id}</td>
        <td>{item.firstName}</td>
        <td>{item.lastName}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
      </tr>
    ))}
    </tbody>
    </table>

)
