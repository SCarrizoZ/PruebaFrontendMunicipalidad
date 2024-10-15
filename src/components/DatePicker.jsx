import { useState } from 'react'
import { format, set } from 'date-fns'
import { es } from 'date-fns/locale'
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"

const DatePicker = ({selectedDate, setSelectedDate}) => {
  // i want this format "dd-MM-yyyy"
  const handleDateSelect = (date) => {
    console.log(date)
    setSelectedDate(date)
  }

  return (
    <div className="flex">
      <input value={selectedDate ? format(selectedDate,"yyyy-MM-dd", {locale: es}).toString() : ""} type="text" className="border rounded-l px-2 py-1 w-full" placeholder="Ej: 31-10-2024" />

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            // className={`   font-normal ${!selectedDate && "text-muted-foreground"}`}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {/* {selectedDate ? format(selectedDate, "PPP", { locale: es }) : ""} */}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>

    </div>

  )
}

export default DatePicker