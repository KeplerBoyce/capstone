import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Card from '../../../components/Card';
import Header from '../../../components/Header';
import prisma from '../../../lib/prisma';

export async function getServerSideProps(context) {
    const id = Number(context.query.id);
    const deck = await prisma.deck.findUnique({
        where: {
            id: id,
        },
    });
    return {
        props: { deck }
    }
}

export default ({deck}) => {
    const cards = deck.cards.map(e => JSON.parse(e));
    const [index, setIndex] = useState(0);
    return (
        <div>
            <Head>
                <title>{deck.title} | Capstone</title>
                <meta name="description" content="Decks. -Kepler" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <main className="container">
                <div className="flex flex-col divide-y-2 divide-gray-400">
                    <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-bold">{deck.title}</span>
                        <span className="text-gray-500">Created by {deck.creatorName}</span>
                    </div>
                    <p className="text-gray-500 mb-6">{deck.description}</p>
                </div>

                <Link href={"/deck/"+deck.id}>
                    <button className="px-2.5 py-1 font-medium bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg">Back</button>
                </Link>

                <h1 className="flex justify-center text-2xl font-bold mb-2">{index+1} / {cards.length}</h1>
                <div className="flex justify-center">
                    {index === 0 ?
                        <button className="bg-gray-100 text-5xl text-gray-300 font-bold p-3 mr-3 rounded-lg">{"<"}</button>
                        :
                        <button onClick={() => setIndex(index-1)} className="bg-gray-200 text-5xl font-bold p-3 mr-3 rounded-lg">{"<"}</button>
                    }
                    <Card index={index} front={cards[index].front} back={cards[index].back} />
                    {index === cards.length-1 ?
                        <button className="bg-gray-100 text-5xl text-gray-300 font-bold p-3 ml-3 rounded-lg">{">"}</button>
                        :
                        <button onClick={() => setIndex(index+1)} className="bg-gray-200 text-5xl font-bold p-3 ml-3 rounded-lg">{">"}</button>
                    }
                </div>

            </main>
        </div>
    )
}
