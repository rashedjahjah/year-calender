import {
  Tooltip,
  makeStyles,
  tokens,
  Caption1,
  Body1,
  Text,
} from "@fluentui/react-components";
import { Event } from "@/types/calendar";
import { format } from "date-fns";

const useStyles = makeStyles({
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },
  event: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
    paddingLeft: tokens.spacingHorizontalS,
    borderLeftWidth: '2px',
    borderLeftStyle: 'solid',
  },
  time: {
    display: 'flex',
    gap: tokens.spacingHorizontalXS,
    color: tokens.colorNeutralForeground3,
  },
});

interface EventHoverCardProps {
  events: Event[];
  children: React.ReactNode;
}

export function EventHoverCard({ events, children }: EventHoverCardProps) {
  const styles = useStyles();

  if (events.length === 0) return <>{children}</>;

  return (
    <Tooltip
      content={
        <div className={styles.content}>
          <Body1 strong>Events</Body1>
          {events.map((event) => (
            <div
              key={event.id}
              className={styles.event}
              style={{ borderLeftColor: event.color }}
            >
              <Text weight="semibold">{event.title}</Text>
              <Caption1>{event.description}</Caption1>
              <div className={styles.time}>
                <Caption1>{format(event.startDate, "HH:mm")}</Caption1>
                {!isSameTime(event.startDate, event.endDate) && (
                  <>
                    <Caption1>-</Caption1>
                    <Caption1>{format(event.endDate, "HH:mm")}</Caption1>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      }
      relationship="label"
      positioning="above"
    >
      {children}
    </Tooltip>
  );
}

function isSameTime(date1: Date, date2: Date) {
  return (
    date1.getHours() === date2.getHours() &&
    date1.getMinutes() === date2.getMinutes()
  );
}