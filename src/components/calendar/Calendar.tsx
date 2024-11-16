import { useState } from "react";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { 
  makeStyles,
  Body1,
  Caption1,
  Button,
  tokens,
  shorthands,
  Text,
} from "@fluentui/react-components";
import { ChevronLeft24Regular, ChevronRight24Regular } from "@fluentui/react-icons";
import { Event } from "@/types/calendar";
import { EventHoverCard } from "./EventHoverCard";
import { EventDialog } from "./EventDialog";

const useStyles = makeStyles({
  calendar: {
    padding: tokens.spacingVerticalM,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: tokens.spacingVerticalM,
  },
  weekdays: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '2px',
    textAlign: 'center',
    marginBottom: tokens.spacingVerticalXS,
  },
  days: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '2px',
  },
  day: {
    position: 'relative',
    minHeight: '100px',
    ...shorthands.padding(tokens.spacingVerticalXS),
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke1),
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  dayCompact: {
    minHeight: '64px',
  },
  dayOutside: {
    color: tokens.colorNeutralForeground3,
  },
  dayToday: {
    ...shorthands.border('2px', 'solid', tokens.colorBrandBackground),
  },
  dayNumber: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    ...shorthands.borderRadius('50%'),
  },
  dayNumberToday: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralBackground1,
  },
  events: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    marginTop: tokens.spacingVerticalXS,
  },
  event: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    ...shorthands.padding(tokens.spacingVerticalXXS, tokens.spacingHorizontalXS),
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  eventCompact: {
    fontSize: tokens.fontSizeBase100,
    lineHeight: tokens.lineHeightBase100,
  },
});

interface CalendarProps {
  events: Event[];
  onEventChange: (events: Event[]) => void;
  initialDate?: Date;
  compact?: boolean;
}

export function Calendar({ 
  events, 
  onEventChange, 
  initialDate = new Date(),
  compact = false 
}: CalendarProps) {
  const styles = useStyles();
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>();

  const firstDayCurrentMonth = startOfMonth(selectedDate);
  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfMonth(firstDayCurrentMonth),
  });

  const handlePreviousMonth = () => {
    setSelectedDate(add(firstDayCurrentMonth, { months: -1 }));
  };

  const handleNextMonth = () => {
    setSelectedDate(add(firstDayCurrentMonth, { months: 1 }));
  };

  const handleDateClick = (day: Date) => {
    setSelectedDate(day);
    setSelectedEvent(undefined);
    setIsEventDialogOpen(true);
  };

  const handleEventClick = (event: Event, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setIsEventDialogOpen(true);
  };

  const handleEventSave = (data: any) => {
    if (selectedEvent) {
      const updatedEvents = events.map((event) =>
        event.id === selectedEvent.id
          ? {
              ...event,
              ...data,
              color: getCategoryColor(data.category),
            }
          : event
      );
      onEventChange(updatedEvents);
    } else {
      const newEvent: Event = {
        id: crypto.randomUUID(),
        ...data,
        color: getCategoryColor(data.category),
      };
      onEventChange([...events, newEvent]);
    }
  };

  const handleEventDelete = () => {
    if (selectedEvent) {
      const updatedEvents = events.filter(
        (event) => event.id !== selectedEvent.id
      );
      onEventChange(updatedEvents);
      setIsEventDialogOpen(false);
    }
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <Body1 strong>
          {format(firstDayCurrentMonth, "MMMM yyyy")}
        </Body1>
        {!compact && (
          <div style={{ display: 'flex', gap: '4px' }}>
            <Button
              appearance="subtle"
              icon={<ChevronLeft24Regular />}
              onClick={handlePreviousMonth}
            />
            <Button
              appearance="subtle"
              icon={<ChevronRight24Regular />}
              onClick={handleNextMonth}
            />
          </div>
        )}
      </div>

      <div className={styles.weekdays}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <Caption1 key={day} strong>
            {compact ? day.charAt(0) : day}
          </Caption1>
        ))}
      </div>

      <div className={styles.days}>
        {days.map((day) => {
          const dayEvents = events.filter((event) =>
            isSameDay(day, event.startDate)
          );

          return (
            <EventHoverCard key={day.toString()} events={dayEvents}>
              <div
                className={`${styles.day} 
                  ${compact ? styles.dayCompact : ''} 
                  ${!isSameMonth(day, firstDayCurrentMonth) ? styles.dayOutside : ''}
                  ${isToday(day) ? styles.dayToday : ''}`}
                onClick={() => handleDateClick(day)}
              >
                <div className={`${styles.dayNumber} ${isToday(day) ? styles.dayNumberToday : ''}`}>
                  <Text>{format(day, "d")}</Text>
                </div>
                <div className={styles.events}>
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`${styles.event} ${compact ? styles.eventCompact : ''}`}
                      style={{ backgroundColor: event.color }}
                      onClick={(e) => handleEventClick(event, e)}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            </EventHoverCard>
          );
        })}
      </div>

      <EventDialog
        event={selectedEvent}
        selectedDate={selectedDate}
        isOpen={isEventDialogOpen}
        onClose={() => setIsEventDialogOpen(false)}
        onSave={handleEventSave}
        onDelete={handleEventDelete}
      />
    </div>
  );
}

function getCategoryColor(category: Event["category"]): string {
  switch (category) {
    case "work":
      return tokens.colorBrandBackground2;
    case "personal":
      return tokens.colorPaletteGreenBackground2;
    case "holiday":
      return tokens.colorPaletteYellowBackground2;
    case "meeting":
      return tokens.colorPalettePurpleBackground2;
    default:
      return tokens.colorNeutralBackground3;
  }
}