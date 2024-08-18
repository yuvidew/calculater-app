
import React, { useState } from 'react';
import Calendar from './components/ui/CalendarComp'
import { Event } from './Event/type';
import useEvents from './hook/useEvent';
import EventForm from './components/EventForm';
import EventModal from './components/EventModal';
import EventFilter from './components/EventFilter';
import './App.css'
import { CalendarDays } from 'lucide-react';
import { Button } from './components/ui/button';

const App: React.FC = () => {
  const { events, addEvent, editEvent, deleteEvent } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [showForm, setShowForm] = useState<boolean>(false);

  const filteredEvents = events.filter(event => !filterCategory || event.category === filterCategory);

  console.log(filteredEvents);

  const handleAddEvent = (event: Event) => {
    addEvent(event);
    setShowForm(false);
  };

  const handleEditEvent = (event: Event) => {
    editEvent(event);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      deleteEvent(selectedEvent.id);
      setSelectedEvent(null);
    }
  };

  const handleDateClick = (date: Date) => {
    setShowForm(true);
    setSelectedEvent(null);
  };
  
  return (
    <div className=" h-[100vh] bg-stone-900">
      <section className='flex  items-center justify-center'>
        <div className='bg-stone-800 h-full  mt-[3rem] w-[50%] p-[3rem] rounded-md shadow-md'>
        
            <h1 className="text-left flex items-center justify-center gap-2 text-[1.2rem] text-stone-200 font-medium my-4">
              <CalendarDays/>
              Calendar App
            </h1>
            <div className="flex justify-between items-center mb-[2rem]">
              <EventFilter
                categories={['Work', 'Personal']}
                selectedCategory={filterCategory}
                onCategoryChange={setFilterCategory}
              />
              <Button
                variant={'blue'}
                onClick={() => setShowForm(true)}
                className="bg-blue-500 text-white  px-4 py-2"
              >
                Add Event
              </Button>
            </div>

            <Calendar
              currentMonth={new Date()}
              selectedDate={null}
              events={filteredEvents}
              onDateClick={handleDateClick}
              onEventClick={setSelectedEvent}
            />

            {showForm && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded">
                  <EventForm
                    onSubmit={handleAddEvent}
                    onClose={() => setShowForm(false)}
                  />
                </div>
              </div>
            )}

            {selectedEvent && (
              <EventModal
                event={selectedEvent}
                onClose={() => setSelectedEvent(null)}
                onEdit={() => setShowForm(true)}
                onDelete={handleDeleteEvent}
              />
            )}

        </div>
      </section>
    </div>
  );
};

export default App;
