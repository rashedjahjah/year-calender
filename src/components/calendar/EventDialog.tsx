import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogContent,
  DialogActions,
  Button,
  Input,
  Textarea,
  Select,
  Option,
  Label,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { Event, EventFormData } from "@/types/calendar";
import { useState } from "react";

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },
  dateFields: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: tokens.spacingHorizontalM,
  },
});

interface EventDialogProps {
  event?: Event;
  selectedDate?: Date;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EventFormData) => void;
  onDelete?: () => void;
}

export function EventDialog({
  event,
  selectedDate,
  isOpen,
  onClose,
  onSave,
  onDelete,
}: EventDialogProps) {
  const styles = useStyles();
  const [formData, setFormData] = useState<EventFormData>({
    title: event?.title || "",
    description: event?.description || "",
    category: event?.category || "personal",
    startDate: event?.startDate || selectedDate || new Date(),
    endDate: event?.endDate || selectedDate || new Date(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(_, { open }) => !open && onClose()}>
      <DialogSurface>
        <form onSubmit={handleSubmit}>
          <DialogBody>
            <DialogTitle>{event ? "Edit Event" : "Create Event"}</DialogTitle>
            <DialogContent>
              <div className={styles.form}>
                <div className={styles.field}>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => 
                      setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className={styles.field}>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => 
                      setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className={styles.field}>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    id="category"
                    value={formData.category}
                    onChange={(_, data) => 
                      setFormData({ ...formData, category: data.value as Event["category"] })}
                  >
                    <Option value="work">Work</Option>
                    <Option value="personal">Personal</Option>
                    <Option value="holiday">Holiday</Option>
                    <Option value="meeting">Meeting</Option>
                  </Select>
                </div>

                <div className={styles.dateFields}>
                  <div className={styles.field}>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      type="datetime-local"
                      id="startDate"
                      value={formData.startDate.toISOString().slice(0, 16)}
                      onChange={(e) => 
                        setFormData({ ...formData, startDate: new Date(e.target.value) })}
                    />
                  </div>

                  <div className={styles.field}>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      type="datetime-local"
                      id="endDate"
                      value={formData.endDate.toISOString().slice(0, 16)}
                      onChange={(e) => 
                        setFormData({ ...formData, endDate: new Date(e.target.value) })}
                    />
                  </div>
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              {event && (
                <Button
                  appearance="secondary"
                  onClick={onDelete}
                >
                  Delete
                </Button>
              )}
              <Button appearance="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button appearance="primary" type="submit">
                {event ? "Save changes" : "Create"}
              </Button>
            </DialogActions>
          </DialogBody>
        </form>
      </DialogSurface>
    </Dialog>
  );
}