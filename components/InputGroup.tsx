import { ReactNode } from 'react';


type InputGroupProps = {
    name: string, type: string, value: string, 
    invalid?: boolean, callback: (value: string) => void
};
export default function InputGroup(props: InputGroupProps) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={props.name} className="text-sm text-gray-500">{props.name}</label>
            <input
                id={props.name}
                type={props.type}
                value={props.value}
                className={"border border-gray-300 rounded px-2.5 py-1" + (props.invalid ? " border-red-500 border-2" : '')}
                autoComplete="off"
                onChange={(e) => props.callback(e.target.value)}
            />
        </div>
    )
}

export function InputErrorMessage(props: {children: ReactNode}) {
    return <p className="italic text-red-500 text-sm">{props.children}</p>;
}
