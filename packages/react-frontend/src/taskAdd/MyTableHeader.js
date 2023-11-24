// src/myTableHeader.js
import React from "react";
import Table from "react-bootstrap/Table";

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
function MyTable() {
    return (
        <Table>
            <TableHeader />
        </Table>
    );
}

export default MyTable;
