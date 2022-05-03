import {useEffect, useState} from 'react';
import Head from 'next/head';
import Header from '../components/Header';


export default function Decks() {
    const [decks, setDecks] = useState(['deck']);

    useEffect(() => {
        localStorage.setItem('decks', JSON.stringify(decks));
    }, [decks]);

    function addDeck(name: string) {
        decks.push(name);
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
                    {decks.map(deck => <p>{deck}</p>)}
                </section>

                <button onClick={() => addDeck('kepler boyce')}>Add deck</button>
            </main>
        </div>
    )
}
