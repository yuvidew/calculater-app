// src/components/Calendar.tsx
import React from 'react';
import { format, addDays, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay } from 'date-fns';
import { Event } from '@/Event/type';
import { Hover } from '../Hover';


interface CalendarProps {
    currentMonth: Date;
    selectedDate: Date | null;
    events: Event[];
    onDateClick: (date: Date) => void;
    onEventClick: (event: Event) => void;
}

const Calendar: React.FC<CalendarProps> = ({ currentMonth, selectedDate, events, onDateClick, onEventClick }) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const renderCells = () => {
        const dateFormat = 'd';
        const rows = [];
        let days = [];
        let day = startDate;

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                const cloneDay = day;
                const dayEvents = events.filter(event => isSameDay(event.date, day));

                days.push(
                    <div
                        key={day.toString()}
                        className={` rounded-sm text-center flex flex-col py-1  ${!isSameMonth(day, monthStart) ? 'bg-gray-100' : ' text-stone-200'} ${isSameDay(day, selectedDate || new Date()) ? 'bg-blue-500 text-white' : ''}`}
                        onClick={() => onDateClick(cloneDay)}
                    >
                        <span className='p-3'>{format(day, dateFormat)}</span>
                        {dayEvents.map(event => (
                            <Hover text = {event.title} key={event.id} >
                                <div onClick={(e) => { e.stopPropagation(); onEventClick(event); }} className="text-sm bg-stone-100 rounded-sm px-2 py-1 m-auto text-[.8rem] text-stone-400 mb-1  truncate w-[50%]">
                                    {event.title}
                                </div>
                            </Hover>
                        ))}
                    </div>
                );

                day = addDays(day, 1);
            }
            rows.push(<div className="grid grid-cols-7 gap-1" key={day.toString()}>{days}</div>);
            days = [];
        }

        return <div>{rows}</div>;
    };

    const renderHeader = () => (
        <div className="flex justify-between items-center my-4 text-stone-100">
            <div>{format(currentMonth, 'MMMM yyyy')}</div>
        </div>
    );

    return (
        <div className="h-full">
            {renderHeader()}
            {renderCells()}
        </div>
    );
};

export default Calendar;
