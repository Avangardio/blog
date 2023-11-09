import { useState} from "react";

export default function CreateTags() {
    const [inputs, setInputs] = useState(['']); // Инициализируем массив с одним пустым инпутом

    const handleAddInput = () => {
        if (inputs.length < 3) {
            setInputs([...inputs, '']); // Добавляем новый пустой инпут
        }
    };

    const handleInputChange = (index: number, value: string) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
    };

    const handleRemoveInput = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); // Остановка всплытия события
        const newInputs = [...inputs];
        newInputs.splice(index, 1);
        setInputs(newInputs);
    };

    return (
        <div onClick={event => event.stopPropagation()}>
            {inputs.length < 3 && (
                <button onClick={handleAddInput}>Добавить</button>
            )}
            {
                inputs.map((input, index) => (
                        <div key={index}>
                            <input className={'p-1 my-2 w-[6em] focus:outline-cyan-600'}
                                type="text"
                                value={input}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                placeholder={String(index)}
                            />
                            {inputs.length > 1 && (
                                <button onClick={(event ) => handleRemoveInput(index, event)}>Удалить</button>
                            )}
                        </div>
                    )
                )
            }
        </div>
    );
}