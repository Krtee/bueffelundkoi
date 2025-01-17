import axios from "axios";
import { addDays, isSameDay } from "date-fns";
import {
  DayOfWeek,
  ExcludedTimeInterval,
  Reservation,
  SuggestionResponse,
} from "./Booking.types";

export const emptyReservation: Reservation = {
  createDate: new Date(),
  reservationEnd: new Date(),
  reservationStart: new Date(),
  updateDate: new Date(),
  emailOfReservator: "",
  confirmed: false,
  tableNumbers: [],
  personCount: 0,
};

export const fetchSuggestions = async (
  reservationStart: Date,
  duration: number,
  personCount: number
): Promise<SuggestionResponse[] | undefined> =>
  axios
    .get(process.env.NEXT_PUBLIC_SERVICE_URL + "/reservation/suggestions", {
      params: {
        reservationStart,
        duration,
        personCount,
      },
    })
    .then(({ data }) =>
      data.map((suggestionResponse: SuggestionResponse) => ({
        ...suggestionResponse,
        startTime: new Date(suggestionResponse.startTime),
      }))
    )
    .catch((error) => {
      return undefined;
    });

export const postNewReservation = async (
  reservation: Reservation
): Promise<Reservation> =>
  axios
    .post(process.env.NEXT_PUBLIC_SERVICE_URL + "/reservation/", reservation)
    .then(({ data }) => data)
    .catch((error) => {
      return undefined;
    });

export const confirmReservation = async (
  confirmationID: string
): Promise<number> =>
  axios
    .post(
      process.env.NEXT_PUBLIC_SERVICE_URL + "/reservation/confirm",
      confirmationID,
      {
        headers: { "Content-Type": "text/plain", accept: "text/plain" },
      }
    )
    .then((res) => res.status)
    .catch((error) => {
      return 500;
    });

export const mapNumberToOption = (value: number) => ({
  label: value === 0 ? "00" : value.toString(),
  value: value,
});

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const fetchExcludeDates = async (): Promise<Date[]> =>
  axios
    .get(process.env.NEXT_PUBLIC_SERVICE_URL + "/reservation/excludedate/all")
    .then(({ data }) =>
      data.map(({ date }: { date: string }) => new Date(date))
    )
    .catch(() => {
      return undefined;
    });

// get next valid date
export const getMinDate = (excludeDates?: Date[]) => {
  const currentDate = new Date();

  if (!excludeDates) {
    return currentDate.getHours() >= 17 ? addDays(currentDate, 1) : currentDate;
  }

  let dateIsOkay = false;

  while (!dateIsOkay) {
    if (
      excludeDates?.find((excludedDate) => isSameDay(excludedDate, currentDate))
    ) {
      currentDate.setDate(currentDate.getDate() + 1);
    } else {
      dateIsOkay = true;
    }
  }
  return currentDate;
};

export const fetchExcludeTimeIntervals = async (): Promise<
  ExcludedTimeInterval[]
> =>
  axios
    .get(process.env.NEXT_PUBLIC_SERVICE_URL + "/reservation/excludetime/all")
    .then(({ data }) =>
      data.map((timeInterval: any) => {
        return {
          ...timeInterval,
          startTime: {
            hour: parseInt(timeInterval.startTime.split(":")[0]),
            minute: parseInt(timeInterval.startTime.split(":")[1]),
          },
          endTime: {
            hour: parseInt(timeInterval.endTime.split(":")[0]),
            minute: parseInt(timeInterval.endTime.split(":")[1]),
          },
        };
      })
    )
    .catch(() => {
      return undefined;
    });

export const mapGetDayToDayOfWeek = (index: number): DayOfWeek => {
  switch (index) {
    case 1:
      return DayOfWeek.MONDAY;
    case 2:
      return DayOfWeek.TUESDAY;
    case 3:
      return DayOfWeek.WEDNESDAY;
    case 4:
      return DayOfWeek.THURSDAY;
    case 5:
      return DayOfWeek.FRIDAY;
    case 6:
      return DayOfWeek.SATURDAY;
    case 0:
      return DayOfWeek.SUNDAY;
    default:
      throw new Error("Invalid index");
  }
};
/**
 *  Get the next valid minute
 * @param hour
 * @param minutes
 * @param excludedTimeInterval
 * @returns
 */
export const getNextValidMinutes = (
  hour: number,
  minutes: number,
  excludedTimeInterval?: ExcludedTimeInterval
): number => {
  if (!excludedTimeInterval) {
    return minutes;
  }
  if (
    excludedTimeInterval.startTime.hour === hour &&
    excludedTimeInterval.startTime.minute <= minutes
  ) {
    return excludedTimeInterval.startTime.minute;
  }
  if (
    excludedTimeInterval.endTime.hour === hour &&
    excludedTimeInterval.endTime.minute > minutes
  ) {
    return excludedTimeInterval.endTime.minute;
  }
  return minutes;
};

/**
 *  Check if time is valid
 * @param selectedReservationHour
 * @param selectedReservationMinute
 * @param dayOfWeek
 * @param excludeTimeIntervals
 * @returns  true if time is valid
 */
export const checkIfTimeIsValid = (
  selectedReservationHour: number,
  selectedReservationMinute: number,
  dayOfWeek: DayOfWeek,
  excludeTimeIntervals?: ExcludedTimeInterval[]
): boolean => {
  if (!excludeTimeIntervals) return true;

  const allExcludedTimeIntervalForThisDay: ExcludedTimeInterval[] =
    excludeTimeIntervals.filter((interval) => interval.dayOfWeek === dayOfWeek);

  if (allExcludedTimeIntervalForThisDay.length === 0) return true;

  allExcludedTimeIntervalForThisDay.forEach(
    (excludedTimeIntervalForThisDay) => {
      if (
        selectedReservationHour >
          excludedTimeIntervalForThisDay.startTime.hour &&
        selectedReservationHour < excludedTimeIntervalForThisDay.endTime.hour
      ) {
        return false;
      }

      if (
        selectedReservationHour ===
          excludedTimeIntervalForThisDay.startTime.hour &&
        selectedReservationMinute <=
          excludedTimeIntervalForThisDay.startTime.minute
      ) {
        return false;
      }

      if (
        selectedReservationHour ===
          excludedTimeIntervalForThisDay.endTime.hour &&
        selectedReservationMinute >
          excludedTimeIntervalForThisDay.endTime.minute
      ) {
        return false;
      }
    }
  );

  return true;
};

export const numberToString = (number: number): string => {
  return number < 10 ? `0${number}` : number.toString();
};
