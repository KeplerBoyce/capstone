import Head from 'next/head'
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
                <p className="text-center">The best card game since sliced poker.</p>
            </main>
        </div>
    )
}
