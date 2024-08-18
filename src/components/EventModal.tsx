// src/components/EventModal.tsx
import React from 'react';
import { Event } from "@/Event/type"
import { format } from 'date-fns/format';

interface EventModalProps {
    event: Event;
    onClose: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, onClose, onEdit, onDelete }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded">
                <h2 className="text-xl font-bold">{event.title}</h2>
                <p>{event.category}</p>
                <p>{format(event.date, 'PPP')}</p>
                <div className="flex justify-end mt-4">
                    <button onClick={onEdit} className="bg-blue-500 text-white px-4 py-2 mr-2">Edit</button>
                    <button onClick={onDelete} className="bg-red-500 text-white px-4 py-2">Delete</button>
                    <button onClick={onClose} className="ml-4">Close</button>
                </div>
            </div>
        </div>
    );
};

export default EventModal;
