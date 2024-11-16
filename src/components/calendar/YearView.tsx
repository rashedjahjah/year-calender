import { useState } from "react";
import { add, eachMonthOfInterval, format, startOfYear, endOfYear } from "date-fns";
import { ChevronLeft24Regular, ChevronRight24Regular } from "@fluentui/react-icons";
import { 
  Button,
  Title1,
  makeStyles,
  tokens,
  shorthands
} from "@fluentui/react-components";
import { Event } from "@/types/calendar";
import { Calendar } from "./Calendar";

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXXL,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: tokens.spacingHorizontalL,
    '@media (min-width: 768px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '@media (min-width: 1024px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    '@media (min-width: 1280px)': {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
  monthCard: {
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke1),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    boxShadow: tokens.shadow4,
  },
});

interface YearViewProps {
  events: Event[];
  onEventChange: (events: Event[]) => void;
}

export function YearView({ events, onEventChange }: YearViewProps) {
  const styles = useStyles();
  const [selectedYear, setSelectedYear] = useState(new Date());
  
  const months = eachMonthOfInterval({
    start: startOfYear(selectedYear),
    end: endOfYear(selectedYear),
  });

  const handlePreviousYear = () => {
    setSelectedYear(add(selectedYear, { years: -1 }));
  };

  const handleNextYear = () => {
    setSelectedYear(add(selectedYear, { years: 1 }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title1>{format(selectedYear, "yyyy")}</Title1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            appearance="subtle"
            icon={<ChevronLeft24Regular />}
            onClick={handlePreviousYear}
          />
          <Button
            appearance="subtle"
            icon={<ChevronRight24Regular />}
            onClick={handleNextYear}
          />
        </div>
      </div>

      <div className={styles.grid}>
        {months.map((month) => (
          <div key={month.toString()} className={styles.monthCard}>
            <Calendar
              key={month.toString()}
              initialDate={month}
              events={events}
              onEventChange={onEventChange}
              compact
            />
          </div>
        ))}
      </div>
    </div>
  );
}