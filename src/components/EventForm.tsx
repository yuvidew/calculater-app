// src/components/EventForm.tsx
import React, { useState } from 'react';
import { Event } from '@/Event/type';
import { format } from 'date-fns/format';


interface EventFormProps {
    onSubmit: (event: Event) => void;
    initialEvent?: Event;
    onClose: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit, initialEvent, onClose }) => {
    const [title, setTitle] = useState(initialEvent?.title || '');
    const [date, setDate] = useState(initialEvent?.date ? format(initialEvent.date, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'));
    const [category, setCategory] = useState(initialEvent?.category || 'Work');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newEvent = {
            id: initialEvent?.id || Date.now().toString(),
            title,
            date: new Date(date),
            category,
        };
        onSubmit(newEvent);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white">
            <input
                type="text"
                placeholder="Event Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full p-2 border mb-4"
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="block w-full p-2 border mb-4"
            />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="block w-full p-2 border mb-4"
            >
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
            </select>
            <button type="submit" className="bg-blue-500 text-white p-2 w-full">
                {initialEvent ? 'Edit' : 'Add'} Event
            </button>
        </form>
    );
};

export default EventForm;
