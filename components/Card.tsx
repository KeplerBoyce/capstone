import { useEffect, useState } from "react";

export default function Card(props: {index: number, front: string, back: string}) {
    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        setFlipped(false);
    }, [props.index]);
    
    return (
        <button className="leading-7 w-96 h-56 px-6 py-3 bg-gray-300 text-2xl rounded-lg break-words" onClick={() => setFlipped(!flipped)}>
            {flipped ?
                props.back :
                props.front
            }
        </button>
    )
}
