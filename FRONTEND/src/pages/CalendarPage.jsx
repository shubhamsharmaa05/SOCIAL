import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const CalendarPage = () => {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Content Calendar</h1>
        <p className="text-[#A8A8A8] mt-1">Drag and drop to schedule your content.</p>
      </div>

      <div className="glass-panel p-4 rounded-xl flex-1 overflow-hidden custom-calendar">
        {/* Custom CSS overrides for fullcalendar to match the dark theme should go into index.css */}
        <FullCalendar
          plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          height="100%"
          events={[
            { title: 'IG Reel', date: '2026-06-12', backgroundColor: '#FF6B6B', borderColor: '#FF6B6B' },
            { title: 'X Thread', date: '2026-06-14', backgroundColor: '#27272a', borderColor: '#3f3f46' }
          ]}
          themeSystem="standard"
        />
      </div>
    </div>
  );
};

export default CalendarPage;
