import {createContext, ReactNode, useContext, useState} from "react";
import {TableData} from "@/components/table";

type tableContextType = {
    table : TableData[]
    insertToTable : (subject: string, object: string, predicate: string) => void;
    deleteFromTable: (index: number) => void;
};

type Props = {
    children: ReactNode;
};

const tableContextDefaultValue: tableContextType = {
    table: [],
    insertToTable : () => {},
    deleteFromTable : () => {}
}

const tableContext = createContext<tableContextType>(tableContextDefaultValue);

export function useTable() {
    return useContext(tableContext);
}

export function TableProvider( {children}: Props) {
    const [table, setTable] = useState<TableData[]>([]);
    const insertToTable = (subject: string, object: string, predicate: string) => {
        setTable((prevState) => {
            const newArray = [...prevState];
            newArray.push({subject,object,predicate});
            return newArray;
        } );
    };

    const deleteFromTable = (index: number) => {
        setTable((prevState) => {
            const newArray = [...prevState];
            newArray.slice(index,1);
            return newArray;
        });
    };

    const value = {
        table,
        insertToTable,
        deleteFromTable
    }
    return (
        <>
            <tableContext.Provider value={value}>
                {children}
            </tableContext.Provider>
        </>
    );
}
