import {useState} from 'react';
import { currentUser } from '../util/helpers';
import CardInputGroup from './CardInputGroup';
import CenteredModal, {CenteredModalProps} from './CenteredModal';
import {Deck} from './DeckComponent';
import InputGroup, { InputErrorMessage } from "./InputGroup";


type Prefill = { title: string, description: string, cards: { front: string, back: string }[] }
type CreateDeckModalProps = Omit<CenteredModalProps, 'children'> & { callback: (deck: Deck) => void, isNew: boolean, prefill?: Prefill }
export default function CreateDeckModal(props: CreateDeckModalProps) {
    const {callback, isOpen, setIsOpen, isNew, prefill} = props;

    const [title, setTitle] = useState(prefill ? prefill.title : '');
    const [description, setDescription] = useState(prefill ? prefill.description : '');
    const [cards, setCards] = useState(prefill ? prefill.cards : [{ front: '', back: '' }]);

    const submit = () => {
        if (title.length > 50 || description.length > 100) return;
        let exit = false;
        cards.forEach(c => {
            if (c.front.length > 100 || c.back.length > 100) exit = true;
        });
        if (exit) return;
        callback({
            title,
            description,
            cards: cards.map(c => JSON.stringify(c)),
            creatorName: currentUser(),
        });
        setIsOpen(false);
    }

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...cards];
        list[index][name] = value;
        setCards(list);
    };

    const removeRow = index => {
        setCards(cards.filter((e, i) => i !== index));
    };

    const addRow = () => {
        setCards([...cards, { front: '', back: '' }]);
    };

    return (
        <CenteredModal isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="relative flex flex-col bg-white rounded-md w-120 max-h-[90%] mx-2 p-6 shadow-xl">
                <h1 className="text-2xl font-bold mb-4">
                    {isNew ? "New deck" : "Edit deck"}
                </h1>

                <section className="flex flex-col gap-2 mb-2">
                    <div>
                        <InputGroup 
                            name="Title" 
                            type="text" 
                            value={title} 
                            invalid={title.length > 50} 
                            callback={setTitle} 
                        />
                        {title.length > 50 && (
                            <InputErrorMessage>Title too long ({title.length}/50)</InputErrorMessage>
                        )}
                    </div>
                
                    <div>
                        <InputGroup 
                            name="Description" 
                            type="text" 
                            value={description} 
                            invalid={description.length > 100} 
                            callback={setDescription} 
                        />
                        {description.length > 100 && (
                            <InputErrorMessage>Description too long ({description.length}/100)</InputErrorMessage>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="Cards" className="text-sm text-gray-500">Cards</label>
                        <div className="flex flex-col gap-1.5 max-h-96 overflow-auto scrollbar-none">
                            {cards.map((x, i) => (
                                <CardInputGroup 
                                    index={i}
                                    value={x}
                                    callback={handleInputChange}
                                    remove={removeRow}
                                />
                            ))}
                        </div>
                        <button onClick={addRow} className="font-bold text-xl bg-gray-400 text-white rounded-lg pb-[2px]">
                            +
                        </button>
                    </div>
                </section>

                <section className="flex gap-2">
                    <button
                        className="px-2.5 py-1.5 rounded-md bg-gray-500 text-white font-medium disabled:bg-opacity-60 transition duration-200"
                        disabled={!title || !description}
                        onClick={submit}
                    >
                        {isNew ? "Create deck" : "Submit"}
                    </button>
                    <button className="px-2.5 py-1.5 rounded-md bg-gradient-to-r from-red-500 to-[#eb144c] text-white font-medium" onClick={() => setIsOpen(false)}>
                        Cancel
                    </button>
                </section>
            </div>
        </CenteredModal>
    )
}
