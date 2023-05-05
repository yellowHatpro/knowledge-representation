import React, { useState } from 'react';
import {useTable} from "@/context/table_context";
import form from "@/components/form";
import DropdownMenu from "@/components/dropdown";
import {relation} from "@/data/types";
import {createRelationship} from "@/lib/neo4j";

export type FormState = {
    subject: string;
    object: string;
    predicate: string;
};

const Form = (props: {switch:boolean, open: boolean}) => {
    const {table, insertToTable, deleteFromTable} = useTable()
    const [formState, setFormState] = useState<FormState>({
        subject: '',
        object: '',
        predicate: ''
    });
    const [currentRelation, setCurrentRelation] =
        useState({name:'studies', domain:{name:'student'}, range:{name:'subject'}})

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleClose = async () => {
        await insertToNeo(formState.subject, formState.predicate);
    };


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle form submission here
        if (formState.subject===''  || formState.predicate===''){
            alert("Please fill the details correctly")
        }
        else {
            setFormState({subject: '', object: '', predicate: ''})
            insertToTable(formState.subject, formState.object, formState.predicate)
            handleClose()
        }
    };

    const handleCurrentRelation = (relation:relation) => {
        setCurrentRelation(relation)
    }

    const insertToNeo = async (subject:string, predicate: string) => {
        await createRelationship(subject, predicate, currentRelation)
    }

    return ( <>
            {props.open &&
                <form onSubmit={handleSubmit}>
                    <div className={"flex"}>
                        <label className={"text-xl text-black font-bold px-10  m-2 "}
                               htmlFor="name">{props.switch ? "Subject" : "Relation"}</label>
                        <input
                            className={"text-black px-1 py-1 m-2 "}
                            id="subject"
                            type="text"
                            name="subject"
                            value={formState.subject}
                            onChange={handleInputChange}
                        />
                        {props.switch && <label className={"text-l text-black font-bold py-2"}
                                htmlFor="name">{currentRelation.domain.name}</label>}
                    </div>
                    <div className={"flex "}>
                        <label className={"text-xl text-black font-bold px-10  m-2 "}
                               htmlFor="classType">{props.switch ? "Object" : "Domain"}</label>
                        {!props.switch&& <input
                            className={" text-black px-1 py-1 m-2"}
                            id="object"
                            type="text"
                            name="object"
                            value={formState.object}
                            onChange={handleInputChange}
                        />}
                        {
                            props.switch && <DropdownMenu relation={currentRelation} handleRelationShipChange={handleCurrentRelation}/>
                        }
                    </div>
                    <div className={"flex"}>
                        <label className={"text-xl text-black font-bold px-10 m-2 "}
                               htmlFor="classType">{props.switch ? "Predicate" : "Range"}</label>
                        <input
                            className={" text-black px-1 py-1 m-2 justify-end"}
                            id="predicate"
                            type="text"
                            name="predicate"
                            value={formState.predicate}
                            onChange={handleInputChange}
                        />
                        {props.switch && <label className={"text-l text-black font-bold py-2"}
                                                htmlFor="name">{currentRelation.range.name}</label>}
                    </div>
                    <div className={"px-8"}>
                        <button className={"bg-blue-500 rounded text-xl text-black font-bold px-10 py-4 m-4"}
                                type="submit">Submit
                        </button>
                    </div>
                </form>}
        </>
    );
};

export default Form;
