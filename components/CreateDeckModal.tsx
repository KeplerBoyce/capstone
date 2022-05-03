import {useState} from 'react';
import CenteredModal, {CenteredModalProps} from './CenteredModal';
import {Deck} from './DeckComponent';
import InputGroup from "./InputGroup";


type CreateDeckModalProps = Omit<CenteredModalProps, 'children'> & {callback: (deck: Deck) => void}
export default function CreateDeckModal(props: CreateDeckModalProps) {
    const {callback, isOpen, setIsOpen} = props;

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    function createDeck() {
        callback({name: title, desc, cards: [], creator: 'Kepler Boyce', saves: 0});
        setTitle('');
        setDesc('');
        setIsOpen(false);
    }

    return (
        <CenteredModal isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="relative flex flex-col bg-white rounded-md w-96 max-h-[90%] mx-2 p-6 shadow-xl">
                <h1 className="text-2xl font-bold mb-4">New deck</h1>

                <section className="flex flex-col gap-2 mb-6">
                    <InputGroup name="Title" value={title} callback={setTitle} />
                    <InputGroup name="Description" value={desc} callback={setDesc} />
                </section>

                <section className="flex gap-2">
                    <button
                        className="px-2.5 py-1.5 rounded-md bg-gray-500 text-white font-medium disabled:bg-opacity-60 transition duration-200"
                        disabled={!title || !desc}
                        onClick={createDeck}
                    >
                        Create deck
                    </button>
                    <button className="px-2.5 py-1.5 rounded-md bg-gradient-to-r from-red-500 to-[#eb144c] text-white font-medium" onClick={() => setIsOpen(false)}>
                        Cancel
                    </button>
                </section>
            </div>
        </CenteredModal>
    )
}
