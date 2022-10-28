import { Theme } from "react-select";

export interface Reservation {
  id?: string;
  createDate: Date;
  updateDate: Date;
  reservationStart: Date;
  reservationEnd: Date;
  emailOfReservator: string;
  phoneOfReservator?: string;
  firstNameOfReservator?: string;
  lastNameOfReservator?: string;
  personCount: number;
  confirmed: boolean;
  tableNumbers: string[];
  [propertyKey: string]: any;
}

export interface SuggestionResponse {
  startTime: Date;
  tableNumber: string;
}

export interface Table {
  tableNumber: string;
  maxSeats: number;
}

export enum DayOfWeek {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}

export interface SuggestionResponse {
  startTime: Date;
  tableNumber: string;
}

export interface Option {
  label: string;
  value: number;
}

export const customSelectStyles = (width?: number) => ({
  option: (provided: any, state: { isSelected: boolean }) => ({
    ...provided,

    color: state.isSelected ? "black" : "white",
    backgroundColor: state.isSelected ? "white" : undefined,
    border: "none",
    borderRadius: "10px",
    padding: "10px",
    fontFamily: "rig-shaded-bold-face",
  }),
  control: (provided: any, state: { isFocused: boolean }) => ({
    ...provided,

    backgroundColor: state.isFocused ? "#1a1a1a" : "#232323",
    border: "none",
    boxShadow: "none",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    width: width ? `${width}px` : "90px",
  }),
  input: (provided: any) => ({
    ...provided,
    color: "white",
  }),
  singleValue: (provided: any, state: { isDisabled: boolean }) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return {
      ...provided,
      opacity,
      transition,
      color: "white",
    };
  },
  menuList: (provided: any) => {
    return {
      ...provided,
      color: "white",
      border: "none",
    };
  },
  menu: (provided: any) => {
    return {
      ...provided,
      background: "#1a1a1a",
      border: "none",
      boxShadow: "none",
      borderBottomLeftRadius: "10px",
      borderBottomRightRadius: "10px",
      overflow: "hidden",
      width: width ? `${width}px` : "80px",
    };
  },
});

export const customTheme = (theme: Theme) => ({
  ...theme,
  borderRadius: 0,
  colors: {
    ...theme.colors,
    primary25: "hotpink",
    primary: "black",
  },
});
export const selectHourOptionsEvening: Option[] = [
  { label: "17", value: 17 },
  { label: "18", value: 18 },
  { label: "19", value: 19 },
  { label: "20", value: 20 },
  { label: "21", value: 21 },
  { label: "22", value: 22 },
];
export const selectHourOptionsMorning: Option[] = [
  { label: "11", value: 11 },
  { label: "12", value: 12 },
  { label: "13", value: 13 },
  { label: "14", value: 14 },
];
export const selectOptionMinutes: Option[] = [
  { label: "00", value: 0 },
  { label: "15", value: 15 },
  { label: "30", value: 30 },
  { label: "45", value: 45 },
];

export const selectOptionPersonCount: Option[] = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
];
