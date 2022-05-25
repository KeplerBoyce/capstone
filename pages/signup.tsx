import {useState} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import InputGroup from '../components/InputGroup';
import axios from 'axios';
import Router from 'next/router';
import { logIn } from '../util/helpers';
import bcrypt from 'bcryptjs';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [error, setError] = useState('');

    const submit = async () => {
        if (username === '' || password === '' || confirmPass === '') {
            setError("Fields cannot be blank");
            return;
        } else if (password !== confirmPass) {
            setError("Passwords do not match");
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const res = await axios.post("/api/createUser", {
            username,
            password: hash,
        });
        if (res.data.success) {
            logIn(username);
            Router.push("/decks");
        } else {
            setError(res.data.message);
        }
    }

    return (
        <div className="flex h-screen items-center justify-center bg-gradient-to-br from-orange-400 via-red-500 to-pink-600">
            <Head>
                <title>Sign up | Capstone</title>
                <meta name="description" content="Log in. -Kepler" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="w-80 p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Sign up</h1>

                <section className="flex flex-col gap-2 mb-2">
                    <InputGroup name="Username" type="text" value={username} callback={setUsername} />
                    <InputGroup name="Password" type="password" value={password} callback={setPassword} />
                    <InputGroup name="Confirm Password" type="password" value={confirmPass} callback={setConfirmPass} />
                </section>

                <p className="italic text-red-500 mb-4">{error}</p>

                <section className="flex gap-2 mb-2">
                    <button onClick={submit} className="px-2.5 py-1.5 rounded-md bg-gray-500 text-white font-medium">
                        Sign up
                    </button>
                    <Link href="/">
                        <a>
                            <button className="px-2.5 py-1.5 rounded-md bg-gradient-to-r from-red-500 to-[#eb144c] text-white font-medium">
                                Cancel
                            </button>
                        </a>
                    </Link>
                </section>
                <Link href="/login">
                    <a className="italic underline text-blue-500">
                        Log into an existing account
                    </a>
                </Link>
            </main>
        </div>
    )
}
