import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


interface EventFilterProps {
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

const EventFilter: React.FC<EventFilterProps> = ({ categories, selectedCategory, onCategoryChange }) => {
    return (

        <Select defaultValue={selectedCategory} onValueChange={(e) => onCategoryChange(e)}>
            <SelectTrigger className="w-[180px] text-stone-200">
                <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
            {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
            </SelectContent>
        </Select>
    );
};

export default EventFilter;
