import React, { useState } from 'react';
import {useTable} from "@/context/table_context";
import form from "@/components/form";

export type FormState = {
    subject: string;
    object: string;
    predicate: string;
};

const Form = (props: {open: boolean ,onSubmit:
() => void
}) => {
    const {table, insertToTable, deleteFromTable} = useTable()
    const [formState, setFormState] = useState<FormState>({
        subject: '',
        object: '',
        predicate: ''
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleClose = () => {
        props.onSubmit();
    };


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle form submission here
        if (formState.subject==='' || formState.object==='' || formState.predicate===''){
            alert("Please fill the details correctly")
        }
        else {
            setFormState({subject: '', object: '', predicate: ''})
            insertToTable(formState.subject, formState.object, formState.predicate)
            handleClose()
        }
    };

    return ( <>
            {props.open &&
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className={"text-xl text-black font-bold px-10 py-10 m-2 "}
                               htmlFor="name">Subject</label>
                        <input
                            className={"text-black px-1 py-1 m-2 "}
                            id="subject"
                            type="text"
                            name="subject"
                            value={formState.subject}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className={"text-xl text-black font-bold px-10 py-10 m-2  "}
                               htmlFor="classType">Object</label>
                        <input
                            className={" text-black px-1 py-1 m-2 justify-end"}
                            id="object"
                            type="text"
                            name="object"
                            value={formState.object}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className={"text-xl text-black font-bold px-10 py-10 m-2  "}
                               htmlFor="classType">Predicate</label>
                        <input
                            className={" text-black px-1 py-1 m-2 justify-end"}
                            id="predicate"
                            type="text"
                            name="predicate"
                            value={formState.predicate}
                            onChange={handleInputChange}
                        />
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
