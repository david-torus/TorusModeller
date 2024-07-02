import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  DateField,
  DateInput,
  DatePicker,
  DateRangePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Label,
  Popover,
  RangeCalendar,
  TimeField,
} from "react-aria-components";
import { GrCaretPrevious } from "react-icons/gr";
import { GrCaretNext } from "react-icons/gr";

const TorusCalendar = () => {
  return (
    <Calendar aria-label="Appointment date">
      <header className="flex justify-center w-[100%]">
        <div className="flex justify-around gap-2">
          <Button slot="previous" className={"bg-blue-600 p-[3px] rounded-md"}>
            <GrCaretPrevious size={15} color="white" />
          </Button>
          <Heading />
          <Button slot="next" className={"bg-blue-600 p-[3px] rounded-md"}>
            <GrCaretNext size={15} color="white" />
          </Button>
        </div>
      </header>
      <CalendarGrid>
        {(date) => (
          <CalendarCell
            className={
              "bg-slate-300/80 rounded-full flex items-center justify-center p-2 torus-pressed:bg-blue-500 torus-hover:bg-blue-400 torus-focus:border-transparent torus-focus:bg-blue-700 torus-focus:text-white "
            }
            date={date}
          />
        )}
      </CalendarGrid>
    </Calendar>
  );
};

const TorusDateField = () => {
  return (
    <DateField>
      <Label>Birth date</Label>
      <DateInput>{(segment) => <DateSegment segment={segment} />}</DateInput>
    </DateField>
  );
};

const TorusDatePicker = () => {
  return (
    <DatePicker>
      <Label>Date</Label>
      <Group>
        <DateInput>{(segment) => <DateSegment segment={segment} />}</DateInput>
        <Button>▼</Button>
      </Group>
      <Popover>
        <Dialog>
          <Calendar>
            <header>
              <Button slot="previous">◀</Button>
              <Heading />
              <Button slot="next">▶</Button>
            </header>
            <CalendarGrid>
              {(date) => <CalendarCell date={date} />}
            </CalendarGrid>
          </Calendar>
        </Dialog>
      </Popover>
    </DatePicker>
  );
};


const TorusDateRangePicker = () => {
  return (
    <DateRangePicker>
      <Label>Trip dates</Label>
      <Group>
        <DateInput slot="start">
          {(segment) => <DateSegment segment={segment} />}
        </DateInput>
        <span aria-hidden="true">–</span>
        <DateInput slot="end">
          {(segment) => <DateSegment segment={segment} />}
        </DateInput>
        <Button>▼</Button>
      </Group>
      <Popover>
        <Dialog>
          <RangeCalendar>
            <header>
              <Button slot="previous">◀</Button>
              <Heading />
              <Button slot="next">▶</Button>
            </header>
            <CalendarGrid>
              {(date) => <CalendarCell date={date} />}
            </CalendarGrid>
          </RangeCalendar>
        </Dialog>
      </Popover>
    </DateRangePicker>
  );
};

const TorusRangeCalender = () => {
  return (
    <RangeCalendar aria-label="Trip dates">
      <header>
        <Button slot="previous">◀</Button>
        <Heading />
        <Button slot="next">▶</Button>
      </header>
      <CalendarGrid>{(date) => <CalendarCell date={date} />}</CalendarGrid>
    </RangeCalendar>
  );
};

const TorusTimeField = () => {
  return (
    <TimeField>
      <Label>Event time</Label>
      <DateInput>{(segment) => <DateSegment segment={segment} />}</DateInput>
    </TimeField>
  );
};

export default function TorusDateTimePickers({ onChange, value }) {
  return (
    <div>
      <TorusCalendar />
    </div>
  );
}
