import Link from 'next/link';
import { currentUser, logOut } from '../util/helpers';

export default function Header() {
    return (
        <header className="sticky top-0 bg-white h-14 hover:shadow-md grid grid-cols-2 transition-shadow duration-200 mb-8 px-5 border-b">
            <Link href="/">
                <button className="flex justify-start items-center text-2xl font-bold w-min">Capstone</button>
            </Link>
            {currentUser() ? (
                <div className="flex gap-3 justify-end items-center">
                    <span className="font-bold">Logged in as {currentUser()}</span>
                    <Link href="/decks">
                        <button onClick={logOut} className="px-2.5 py-1 font-medium bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg">
                            Log out
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="flex justify-end items-center">
                    <Link href="/login">
                        <button className="px-2.5 py-1 font-medium bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg">
                            Log in
                        </button>
                    </Link>
                </div>
            )}
        </header>
    )
}
