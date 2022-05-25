export type Deck = {
    title: string,
    description: string,
    cards: string[],
    creatorName: string,
}

export default function DeckComponent(props: Deck) {
    const {title, description, cards, creatorName} = props;

    return (
        <div className="p-2 hover:bg-gray-100 duration-200 rounded-lg">
            <div className="flex text-left gap-4 px-1.5">
                <span className="max-w-[100%] whitespace-nowrap text-ellipsis overflow-hidden flex-none">{title}</span>
                <span className="text-gray-400 line-clamp-1">{description}</span>
            </div>
            <div className="flex gap-4 px-1.5">
                <span className="text-gray-400">{cards.length} {cards.length === 1 ? "card" : "cards"}</span>
                <span className="text-gray-400">created by {creatorName}</span>
            </div>
        </div>
    )
}
