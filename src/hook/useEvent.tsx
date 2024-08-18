import { useState } from 'react';

export interface Event {
    id: string;
    title: string;
    date: Date;
    category: string;
}


const useEvents = () => {
    const [events, setEvents] = useState<Event[]>([]);

    const addEvent = (event: Event) => setEvents([...events, event]);

    const editEvent = (updatedEvent: Event) =>
        setEvents(events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)));

    const deleteEvent = (eventId: string) =>
        setEvents(events.filter((event) => event.id !== eventId));

    return { events, addEvent, editEvent, deleteEvent };
};

export default useEvents;
