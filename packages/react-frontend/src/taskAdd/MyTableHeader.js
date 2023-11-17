// src/myTableHeader.js
import React from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function TableHeader() {
    return (
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Tags</th>
          <th>Priority</th>
          <th>Date</th>
          <th>Duration</th>
        </tr>
      </thead>
    );
  }
  
  function TableBody(props) {
    const rows = props.characterData.map((row, index) => {
      return (
        <tr key={index}>
	        <td>{row.title}</td>
	        <td>{row.description}</td>
          <td>{row.tags}</td>
          <td>{row.priority}</td>
          <td>{row.date}</td>
          <td>{row.duration}</td>
	        <td>
			    <Button variant="primary" onClick={() => 
				    props.removeCharacter(index)}>
				    Delete
			    </Button>
	        </td>
	    </tr>
      );
     }
    );
    return (
        <tbody>
          {rows}
         </tbody>
     );
  }
  function MyTable() {
    return (
      <Table>
        <TableHeader />
      </Table>
    );
}

export default MyTable;