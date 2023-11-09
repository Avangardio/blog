import { useState} from "react";
import useLocalization from "@/Components/Localization/Localization";
interface ICreateTags {
    changeAction: (event: string[]) => void;
}
export default function CreateTags({changeAction}: ICreateTags) {
    const {addTag, deleteTag} = useLocalization('new/create')
    const [inputs, setInputs] = useState(['']); // Инициализируем массив с одним пустым инпутом

    const handleAddInput = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        if (inputs.length <= 3) {
            setInputs([...inputs, '']); // Добавляем новый пустой инпут
        }
    };

    const handleInputChange = (index: number, value: string) => {
        const newInputs = [...inputs];
        newInputs[index] = value.trim();
        setInputs(newInputs);
        changeAction(newInputs);
    };

    const handleRemoveInput = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); // Остановка всплытия события
        const newInputs = [...inputs];
        newInputs.splice(index, 1);
        setInputs(newInputs);
    };

    return (
        <div>
            {
                inputs.length <= 3
                    ? <button className={'mt-2 transition-transform transform hover:scale-95 bg-cyan-600 rounded text-white p-2'} onClick={handleAddInput}>{addTag}</button>
                    : false
            }
            {
                inputs.map((input, index) => (
                        <div key={index}>
                            <input className={'p-1 my-2 w-[6em] focus:outline-cyan-600'}
                                type="text"
                                maxLength={7}
                                value={input}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                placeholder={String(index + 1)}
                            />
                            {inputs.length > 1 && (
                                <button
                                    className={'ml-2 transition-transform transform hover:scale-95 bg-cyan-600 rounded text-white p-2'}
                                    onClick={(event ) => handleRemoveInput(index, event)}
                                >
                                    {deleteTag}
                                </button>
                            )}
                        </div>
                    )
                )
            }
        </div>
    );
}