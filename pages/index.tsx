import { Prisma } from '@prisma/client';
import Head from 'next/head'
import Link from 'next/link';
import Header from '../components/Header';

export default function Home() {
    return (
        <div>
            <Head>
                <title>Capstone</title>
                <meta name="description" content="Capstone. -Kepler" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <main className="container">
                <h1 className="text-7xl font-bold text-center mb-4">[Insert Name at the End]</h1>
                <p className="text-center mb-8">The best card game since sliced poker.</p>
                <div className="flex justify-center">
                    <Link href="/decks">
                        <button className="px-8 py-3 font-medium bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg">
                            Decks
                        </button>
                    </Link>
                </div>
            </main>
        </div>
    )
}
