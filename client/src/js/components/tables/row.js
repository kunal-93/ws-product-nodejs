import React from "react";
import { v4 as uuidv4 } from 'uuid';

const Row = (props) =>{
    const {columns, className} = props;
    return (
        <tr className={className}>
            {
                columns.map(column => {
                    return (
                        <td className="table-data" key={uuidv4()} value={props[column]}>
                            {props[column]}
                        </td>
                    )
                    
                })
            }
        </tr>
    );
}

export default Row;