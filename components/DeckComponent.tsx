type Card = {
    front: string,
    back: string
}
export type Deck = {
    name: string,
    desc: string,
    cards: Card[],
    creator: string,
    saves: number
}

export default function DeckComponent(props: Deck) {
    const {name, desc, cards, creator, saves} = props;

    return (
        <div className="flex gap-4 p-1.5">
            <span>{name}</span>
            <span className="text-gray-400">{desc}</span>
        </div>
    )
}
