import React from "react";

export type TableData = {
    subject: string;
    predicate: string;
    object: string;
};

export type TableProps = {
    data: TableData[];
};

const Table = ({data} : TableProps) => {
    return (
        <table>
            <thead>
            <tr className={"text-xl rounded border-2"}>
                <th className={"p-2"}>Subject</th>
                <th className={"p-2"}>Object</th>
                <th className={"p-2"}>Predicate</th>
            </tr>
            </thead>
            <tbody>
            {data.map((row, index) => (
                <tr className={"rounded border-2"} key={index}>
                    <td className={"p-2 "}>{row.subject}</td>
                    <td className={"p-2 "}>{row.object}</td>
                    <td className={"p-2 "}>{row.predicate}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export  default Table;