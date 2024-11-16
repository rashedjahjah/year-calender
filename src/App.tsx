import { useState } from 'react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { YearView } from '@/components/calendar/YearView';
import { Event } from '@/types/calendar';
import { sampleEvents } from '@/data/sample-events';

function App() {
  const [events, setEvents] = useState<Event[]>(sampleEvents);

  return (
    <FluentProvider theme={webLightTheme}>
      <div style={{ padding: '2rem' }}>
        <YearView events={events} onEventChange={setEvents} />
      </div>
    </FluentProvider>
  );
}

export default App;