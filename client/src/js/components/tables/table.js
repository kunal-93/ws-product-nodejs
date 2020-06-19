import React from "react";
import { v4 as uuidv4 } from 'uuid';

import Row from "./row";

const Table = ({searchMatches, searchWord}) => {

    const columns = searchMatches.length > 0 ? Object.keys(searchMatches[0]).filter(column=>column!="key") : [];

    const className = searchWord.length <= 0 ? "normal-row" : "highlighted-row";

    return (
        <div>
            <table>
                <thead className="table-body">
                    <tr className="normal-row">
                        {
                            columns.map(column =><th key={uuidv4()}>{column}</th>)
                        }
                    </tr>
                </thead>
                <tbody className="table-body">
                    {
                        searchMatches.map(match => (
                            <Row className={className} key={match.key} columns={columns} {...match} />
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Table;