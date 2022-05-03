import {useEffect, useState} from 'react';
import Head from 'next/head';

// Components
import Header from '../components/Header';
import DeckComponent, {Deck} from '../components/DeckComponent';
import CreateDeckModal from '../components/CreateDeckModal';


export default function Decks() {
    const [decks, setDecks] = useState<Deck[]>([]);
    const [open, setOpen] = useState(false);

    // Update state from saved localStorage decks
    useEffect(() => {
        const decks = localStorage.getItem('decks');
        if (!decks) return;
        setDecks(JSON.parse(decks));
    }, []);

    // Save new decks in localStorage
    useEffect(() => {
        localStorage.setItem('decks', JSON.stringify(decks));
    }, [decks]);

    function addDeck(deck: Deck) {
        decks.push(deck);
        setDecks([...decks]);
    }

    return (
        <div>
            <Head>
                <title>Decks | Capstone</title>
                <meta name="description" content="Decks. -Kepler" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <main className="container">
                <h1 className="text-3xl font-bold mb-4">Decks</h1>

                <section className="flex flex-col gap-2 mb-4 divide-y">
                    {decks.map(deck => <DeckComponent key={deck.name} {...deck} />)}
                </section>

                <button onClick={() => setOpen(true)}>Add deck</button>
                <CreateDeckModal isOpen={open} setIsOpen={setOpen} callback={addDeck} />
            </main>
        </div>
    )
}
