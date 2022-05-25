import { ChangeEvent } from 'react';
import { InputErrorMessage } from './InputGroup';


type CardInputGroupProps = {
    name: string, 
    index: number, 
    value: { front: string, back: string }, 
    callback: (e: ChangeEvent<HTMLInputElement>, index: number) => void, 
    remove: (index: number) => void 
};
export default function CardInputGroup(props: CardInputGroupProps) {
    const {name, index, value: {front, back}, callback, remove} = props;

    return (
        <div className="flex flex-col gap-1">
            <section className="flex gap-1.5 items-center -mr-1.5">
                <span className="font-mono text-gray-400">{index + 1}.</span>
                <div className="grid grid-cols-2 gap-1">
                    <input
                        name="front"
                        value={front}
                        className={"border border-gray-300 rounded px-2.5 py-1" + (front.length > 200 ? " border-red-500 border-2" : '')}
                        autoComplete="off"
                        placeholder="Front"
                        onChange={(e) => callback(e, index)}
                    />
                    <input
                        name="back"
                        value={back}
                        className={"border border-gray-300 rounded px-2.5 py-1" + (back.length > 200 ? " border-red-500 border-2" : '')}
                        autoComplete="off"
                        placeholder="Back"
                        onChange={(e) => callback(e, index)}
                    />
                </div>
                <div className="flex">
                    <button 
                        disabled={index == 0} 
                        onClick={() => remove(index)} 
                        className="px-2 font-bold text-2xl text-gray-400 disabled:text-gray-200 rounded-lg"
                    >
                        ×
                    </button>
                </div>
            </section>

            <section>
                {front.length > 100 && (
                    <InputErrorMessage>Front too long ({front.length}/100)</InputErrorMessage>
                )}
                {back.length > 100 && (
                    <InputErrorMessage>Back too long ({back.length}/100)</InputErrorMessage>
                )}
            </section>
        </div>
    )
}
