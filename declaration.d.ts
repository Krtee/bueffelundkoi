// Type definitions for react-datetime-picker 3.4

declare module "react-datetime-picker/dist/entry.nostyle" {
  export default function DateTimePicker(
    props: DateTimePickerProps
  ): JSX.Element;

  export interface DateTimePickerProps {
    amPmAriaLabel?: string;
    autoFocus?: boolean;
    calendarAriaLabel?: string;
    calendarClassName?: string | string[];
    calendarIcon?: JSX.Element | null;
    className?: string | string[];
    clearAriaLabel?: string;
    clearIcon?: JSX.Element | null;
    clockClassName?: string | string[];
    closeWidgets?: boolean;
    dayAriaLabel?: string;
    dayPlaceholder?: string;
    disabled?: boolean;
    disableCalendar?: boolean;
    disableClock?: boolean;
    format?: string;
    hourAriaLabel?: string;
    hourPlaceholder?: string;
    isCalendarOpen?: boolean;
    isClockOpen?: boolean;
    locale?: string;
    maxDate?: Date;
    maxDetail?: "hour" | "minute" | "second";
    minDate?: Date;
    minDetail?: "month" | "year" | "decade" | "century";
    minuteAriaLabel?: string;
    minutePlaceholder?: string;
    monthAriaLabel?: string;
    monthPlaceholder?: string;
    name?: string;
    nativeInputAriaLabel?: string;
    onCalendarClose?: () => void;
    onCalendarOpen?: () => void;
    onChange?: (value: Date) => void;
    onClockClose?: () => void;
    onClockOpen?: () => void;
    openWidgetsOnFocus?: boolean;
    returnValue?: "start" | "end" | "range";
    required?: boolean;
    secondAriaLabel?: string;
    secondPlaceholder?: string;
    showLeadingZeros?: boolean;
    value?: Date | [Date, Date];
    yearAriaLabel?: string;
    yearPlaceholder?: string;
  }
}
