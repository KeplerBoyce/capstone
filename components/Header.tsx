export default function Header() {
    return (
        <header className="h-16 hover:shadow-md flex gap-4 items-center justify-end p-4 transition-shadow duration-200">
            <span>Logged in as bepler</span>
            <button className="px-2.5 py-1 font-medium bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg">
                Log out
            </button>
        </header>
    )
}
