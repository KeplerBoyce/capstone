import {useState} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import InputGroup from '../components/InputGroup';


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="flex h-screen items-center justify-center bg-gradient-to-br from-orange-400 via-red-500 to-pink-600">
            <Head>
                <title>Login | Capstone</title>
                <meta name="description" content="Log in. -Kepler" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="w-80 p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Login</h1>

                <section className="flex flex-col gap-2 mb-6">
                    <InputGroup name="Username" value={username} callback={setUsername} />
                    <InputGroup name="Password" value={password} callback={setPassword} />
                </section>

                <section className="flex gap-2">
                    <button className="px-2.5 py-1.5 rounded-md bg-gray-500 text-white font-medium">
                        Log in
                    </button>
                    <Link href="/">
                        <a>
                            <button className="px-2.5 py-1.5 rounded-md bg-gradient-to-r from-red-500 to-[#eb144c] text-white font-medium">
                                Cancel
                            </button>
                        </a>
                    </Link>
                </section>
            </main>
        </div>
    )
}
