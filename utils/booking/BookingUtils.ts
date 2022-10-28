import axios from "axios";
import { Reservation, SuggestionResponse } from "./Booking.types";

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
    .get(process.env.REACT_APP_SERVICE_URL + "/api/reservation/suggestions", {
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
    .post(process.env.REACT_APP_SERVICE_URL + "/api/reservation/", reservation)
    .then(({ data }) => data)
    .catch((error) => {
      return undefined;
    });

export const confirmReservation = async (
  confirmationID: string
): Promise<number> =>
  axios
    .post(
      process.env.REACT_APP_SERVICE_URL + "/api/reservation/confirm",
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
