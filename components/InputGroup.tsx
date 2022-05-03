type InputGroupProps = {name: string, value: string, callback: (value: string) => void}
export default function InputGroup(props: InputGroupProps) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={props.name} className="text-sm text-gray-500">{props.name}</label>
            <input
                id={props.name}
                value={props.value}
                className="border border-gray-300 rounded px-2.5 py-1"
                onChange={(e) => props.callback(e.target.value)}
            />
        </div>
    )
}
