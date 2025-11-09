declare module "*.scss" {
  // TypeScript will now recognize the import without type information.
}

// You may also need to do this for standard CSS files:
declare module "*.css" {
  // If you use CSS Modules, you might add:
  // const content: { [className: string]: string };
  // export default content;
}
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "@fontsource/*" {}
declare module "@fontsource-variable/*" {}
declare module "*.svg" {
  // SVG files often need to be treated as a URL string or sometimes a React component,
  // depending on your configuration. For a simple URL import, use:
  const content: string;
  export default content;
}

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
