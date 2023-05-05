import React, { useState, useEffect } from 'react';
import {relation} from "@/data/types";

interface DropdownOption {
    id: string;
    relation: relation;
}

const dropdownOptions: DropdownOption[] = [
    {
        id: 'teaches',
        relation: {name: "teaches", domain: {name: "teacher"}, range: {name: "class"}}
    },
    {
        id: "studies",
        relation:  {name: "studies", domain: {name: "student"}, range: {name: "subject"}}
    },
    {
        id: "owns",
        relation: {name: "owns", domain: {name: "student"}, range: {name: "laptop"}}
    }
];

const DropdownMenu = (props: {relation: relation, handleRelationShipChange : (relation: relation) => void}) => {
    const [selectedOption, setSelectedOption] = useState<DropdownOption>({
        id: 'teaches',
        relation: {name: "teaches", domain: {name: "teacher"}, range: {name: "class"}}
    });

    useEffect(() => {
        const cachedOptionsString = localStorage.getItem('selectedOption');
        if (cachedOptionsString) {
            const cachedOptions = JSON.parse(cachedOptionsString);
            setSelectedOption(cachedOptions);
        }
    }, []);

    const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const optionId = event.target.value;
        const option = dropdownOptions.find((o) => o.id === optionId)!
        setSelectedOption(option);
        props.handleRelationShipChange(option.relation);
    };

    return (
        <div className={" flex-col px-5 text-lg text-black font-semibold "}>
            <select id="dropdown" value={selectedOption?.id ?? ''} onChange={handleOptionChange}>
                <option value="">--Select an option--</option>
                {dropdownOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.relation.name} ({option.relation.domain.name} - {option.relation.range.name})
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DropdownMenu;
