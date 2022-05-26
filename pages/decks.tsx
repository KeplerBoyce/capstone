import {useEffect, useState} from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import DeckComponent, {Deck} from '../components/DeckComponent';
import CreateDeckModal from '../components/CreateDeckModal';
import axios from 'axios';
import { currentUser } from '../util/helpers';
import prisma from '../lib/prisma';
import Link from 'next/link';

export async function getServerSideProps() {
    const serverDecks = await prisma.deck.findMany();
    return {
        props: { serverDecks }
    }
}

export default ({serverDecks}) => {
    const [decks, setDecks] = useState<Deck[]>([]);
    const [open, setOpen] = useState(false);

    // Update state from saved localStorage decks
    useEffect(() => {
        const decks = localStorage.getItem('decks');
        if (!decks) return;
        setDecks(JSON.parse(decks));
    }, []);

    const addDeck = async (deck: Deck) => {
        setDecks([...decks, deck]);
        localStorage.setItem('decks', JSON.stringify(decks));
        if (currentUser()) {
            await axios.post("/api/createDeck", {...deck});
        }
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
                <h1 className="text-3xl font-bold mb-6">Decks</h1>

                <button onClick={() => setOpen(true)} className="px-2.5 py-1 font-medium bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg mb-4">Add deck</button>
                <CreateDeckModal
                    isNew={true}
                    isOpen={open}
                    setIsOpen={setOpen}
                    callback={addDeck}
                />

                <section className="flex flex-col mb-4 divide-y">
                    {serverDecks.map(deck => {
                        return (
                            <Link href={"/deck/"+deck.id}>
                                <button>
                                    <DeckComponent key={deck.id} {...deck} />
                                </button>
                            </Link>
                        )
                    })}
                </section>
            </main>
        </div>
    )
}
