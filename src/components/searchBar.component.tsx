
import React, { useState, ChangeEvent, KeyboardEvent, MouseEvent } from 'react';
import ImageUploader from './imageUpload.component';
import PredictionApp from './textRecognition.component';

interface AutocompleteProps {
    options: string[];
}

const Autocomplete: React.FC<AutocompleteProps> = ({ options }) => {
    const [activeOption, setActiveOption] = useState<number>(0);
    const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const [userInput, setUserInput] = useState<string>('');

    // Manejador del cambio de input
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const userInput = e.currentTarget.value;

        const filteredOptions = options.filter((optionName) =>
            optionName.toLowerCase().includes(userInput.toLowerCase())
        );

        setActiveOption(0);
        setFilteredOptions(filteredOptions);
        setShowOptions(true);
        setUserInput(userInput);
    };

    // Manejador de click en una opción
    const onClick = (e: MouseEvent<HTMLLIElement>) => {
        setActiveOption(0);
        setFilteredOptions([]);
        setShowOptions(false);
        setUserInput(e.currentTarget.innerText);
    };

    // Manejador de eventos del teclado (Enter, flechas arriba/abajo)
    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setActiveOption(0);
            setShowOptions(false);
            setUserInput(filteredOptions[activeOption]);
        } else if (e.key === 'ArrowUp') {
            if (activeOption === 0) return;
            setActiveOption(activeOption - 1);
        } else if (e.key === 'ArrowDown') {
            if (activeOption === filteredOptions.length - 1) return;
            setActiveOption(activeOption + 1);
        }
    };

    // Generación de la lista de opciones filtradas
    let optionList;
    if (showOptions && userInput) {
        if (filteredOptions.length) {
            optionList = (
                <ul className="options">
                    {filteredOptions.map((optionName, index) => {
                        const className = index === activeOption ? 'option-active' : '';
                        return (
                            <li className={className} key={optionName} onClick={onClick}>
                                {optionName}
                            </li>
                        );
                    })}
                </ul>
            );
        } else {
            optionList = (
                <div className="no-options">
                    <em>No Option!</em>
                </div>
            );
        }
    }

    return (
        <div className='autoCompleteSection'>
            <div className="search">
                <input type="submit" value="" className="search-btn" />
                <input
                    type="text"
                    placeholder='Search... Example: OP01-001'
                    className="search-box"
                    onFocus={()=>setShowOptions(true)}
                    onBlur={()=>setShowOptions(false)}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput}
                />
            </div>
            {optionList}
            <PredictionApp/>
        </div>
    );
};

export default Autocomplete;
