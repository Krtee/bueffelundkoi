"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";

import { Spacer } from "@nextui-org/spacer";
import { Spinner } from "@nextui-org/spinner";
import { addSeconds, format } from "date-fns";
import de from "date-fns/locale/de";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import Select, { SingleValue } from "react-select";
import {
  ExcludedTimeInterval,
  Option,
  Reservation,
  SuggestionResponse,
  customSelectStyles,
  customTheme,
  selectHourOptionsEvening,
  selectOptionMinutes,
  selectOptionPersonCount,
} from "../utils/booking/Booking.types";
import {
  emptyReservation,
  fetchExcludeDates,
  fetchExcludeTimeIntervals,
  fetchSuggestions,
  getMinDate,
  getNextValidMinutes,
  mapGetDayToDayOfWeek,
  mapNumberToOption,
  postNewReservation,
  validateEmail,
} from "../utils/booking/BookingUtils";
import restaurantImage from "./../public/assets/images/bildergalerie_2.jpg";
import Footer from "./Footer";
import NavigationBar from "./NavigationBar";

registerLocale("de", de);

enum FormStep {
  CHOOSE_DATE,
  CHOOSE_TIME,
  CHOOSE_PERSON_COUNT,
  FILL_INFORMATION,
  RESERVATION_SAVED,
  RESERVATION_ERROR,
  LOADING,
}
const ReservationForm = () => {
  const { t } = useTranslation("common");
  const [reservation, setReservation] = useState<Reservation>(emptyReservation);
  const reservationTimeInSeconds: number = 7200;
  const router = useRouter();
  const [excludeDates, setExcludeDates] = useState<Date[]>();
  const [excludeTimeIntervals, setExcludeTimeIntervals] =
    useState<ExcludedTimeInterval[]>();
  const [minDate, setMinDate] = useState<Date>(getMinDate(excludeDates));
  const [currentStep, setCurrentStep] = useState<FormStep>(
    FormStep.CHOOSE_TIME
  );
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [suggestionRequest, setsuggestionRequest] = useState<{
    date: Date;
    personCount: number;
  }>({
    date: new Date(
      minDate.getFullYear(),
      minDate.getMonth(),
      minDate.getDate(),
      18,
      0
    ),
    personCount: 2,
  });
  const [suggestions, setSuggestions] = useState<
    SuggestionResponse[] | undefined
  >([]);
  const [error, setError] = useState<"email" | undefined>();
  const saveReservation = () => {
    if (!validateEmail(reservation.emailOfReservator)) {
      setError("email");
    }
    setCurrentStep(FormStep.LOADING);
    postNewReservation(reservation).then((savedReservation) => {
      if (!savedReservation) {
        setCurrentStep(FormStep.RESERVATION_ERROR);
      } else {
        setCurrentStep(FormStep.RESERVATION_SAVED);
        setReservation(savedReservation);
      }
    });
  };

  const [doc, setDoc] = useState<HTMLElement | null>();
  const [selectBookingHour, setSelectBookingHour] = useState<Option>();
  const [selectBookingMinutes, setSelectBookingMinutes] = useState<Option>();
  const [fetchSuggestionsLoading, setFetchSuggestionsLoading] = useState(false);
  const [chosenSuggestion, setChosenSuggestion] =
    useState<SuggestionResponse>();
  /**
   * fetches the excluded dates from the backend
   */
  useEffect(() => {
    fetchExcludeDates().then((excludeDates) => {
      const currentMinDate = getMinDate(excludeDates);
      setMinDate(currentMinDate);
      setExcludeDates(excludeDates);
    });
    fetchExcludeTimeIntervals().then((excludeTimeIntervals) => {
      setExcludeTimeIntervals(excludeTimeIntervals);
    });
    setDoc(document.getElementById("main"));
  }, []);

  useEffect(() => {
    if (excludeDates && excludeTimeIntervals) {
      const currentMinDate = getMinDate(excludeDates);

      const minDateExcludeInterval = excludeTimeIntervals.find(
        (interval) =>
          interval.dayOfWeek === mapGetDayToDayOfWeek(currentMinDate.getDay())
      );

      const defaultHour = minDateExcludeInterval
        ? selectHourOptionsEvening(minDateExcludeInterval).find(
            (value) => !value.isDisabled
          )?.value || 18
        : 18;
      const defaultMinute = minDateExcludeInterval
        ? selectOptionMinutes(defaultHour, minDateExcludeInterval).find(
            (value) => !value.isDisabled
          )?.value || 0
        : 0;
      setsuggestionRequest((prev) => ({
        ...prev,
        date: new Date(
          currentMinDate.getFullYear(),
          currentMinDate.getMonth(),
          currentMinDate.getDate(),
          defaultHour,
          defaultMinute
        ),
      }));
      setCurrentStep(FormStep.CHOOSE_DATE);
    }
  }, [excludeDates, excludeTimeIntervals]);

  /**
   * updates the date when the hour changes
   */
  useEffect(() => {
    if (!selectBookingHour) return;
    let currentReservationDate = new Date(suggestionRequest.date);

    currentReservationDate.setHours(selectBookingHour.value);
    currentReservationDate.setMinutes(
      getNextValidMinutes(
        selectBookingHour.value,
        suggestionRequest.date.getMinutes(),
        excludeTimeIntervals?.find(
          (interval) =>
            interval.dayOfWeek ===
            mapGetDayToDayOfWeek(suggestionRequest.date.getDay())
        )
      )
    ),
      setsuggestionRequest({
        ...suggestionRequest,
        date: currentReservationDate,
      });
  }, [selectBookingHour]);

  /**
   * updates the date when the minute changes
   * */
  useEffect(() => {
    if (!selectBookingMinutes) return;
    let currentReservationDate = new Date(suggestionRequest.date);
    currentReservationDate.setMinutes(selectBookingMinutes.value);
    setsuggestionRequest({
      ...suggestionRequest,
      date: currentReservationDate,
    });
  }, [selectBookingMinutes]);

  useEffect(() => {
    if (!fetchSuggestionsLoading) return;
    fetchSuggestions(
      suggestionRequest.date,
      reservationTimeInSeconds,
      suggestionRequest.personCount
    ).then((suggestions) => {
      if (
        suggestions &&
        suggestions.length === 1 &&
        suggestions[0].startTime.getHours() ===
          suggestionRequest.date.getHours() &&
        suggestions[0].startTime.getMinutes() ===
          suggestionRequest.date.getMinutes()
      ) {
        setReservation((prevReservation) => ({
          ...prevReservation,
          reservationStart: new Date(suggestions[0].startTime),
          reservationEnd: addSeconds(new Date(suggestions[0].startTime), 6300),
          personCount: suggestionRequest.personCount,
          tableNumbers: [suggestions[0].tableNumber],
        }));
        setCurrentStep(FormStep.FILL_INFORMATION);
      } else {
        setSuggestions(suggestions);
        onOpen();
        setCurrentStep(FormStep.CHOOSE_PERSON_COUNT);
      }
      setFetchSuggestionsLoading(false);
    });
  }, [fetchSuggestionsLoading]);

  useEffect(() => {
    if (!chosenSuggestion) return;
    setReservation((prevReservation) => ({
      ...prevReservation,
      reservationStart: new Date(chosenSuggestion.startTime),
      reservationEnd: addSeconds(new Date(chosenSuggestion.startTime), 6300),
      personCount: suggestionRequest.personCount,
      tableNumbers: [chosenSuggestion.tableNumber],
    }));
  }, [chosenSuggestion]);

  /**
   * returns the current step of the form
   *
   */
  const renderRightFormStep = (): JSX.Element => {
    switch (currentStep) {
      case FormStep.CHOOSE_DATE:
        return (
          <div className="md:w-1/2  relative	border-t-2 border-b-2 max-w-lg min-h-form flex w-full flex-col dark">
            <p className="py-5 text-2xl leading-5 font-bold rig-shaded">
              {t("booking.title").toUpperCase()}
            </p>
            <p className="py-10 text-justify whitespace-pre-line josefin text-xl">
              {t("booking.date")}
            </p>
            <div
              className={"react-datepicker__wrapper flex-1 flex justify-center	"}
            >
              <DatePicker
                selected={suggestionRequest.date}
                onChange={(date: Date) =>
                  setsuggestionRequest({
                    ...suggestionRequest,
                    date,
                  })
                }
                excludeDates={excludeDates}
                withPortal
                locale={router.locale}
                portalId="__next"
                dateFormat={router.locale === "de" ? "dd.MM.yyyy" : undefined}
                minDate={minDate}
              />
            </div>
            <p className="py-10 text-justify whitespace-pre-line josefin  leading-4	">
              {t("booking.experimental")}
            </p>
            <div className={"w-full py-20"}>
              <Button
                color="primary"
                className="text-dark rig-shaded w-full"
                onClick={() => setCurrentStep(FormStep.CHOOSE_TIME)}
              >
                {t("general.buttons.next")}
              </Button>
            </div>
          </div>
        );
      case FormStep.CHOOSE_TIME:
        return (
          <div className="md:w-1/2  relative	border-t-2 border-b-2 max-w-lg min-h-form flex w-full flex-col">
            <div className={"flex-1"}>
              <p className="py-5 text-2xl leading-5 font-bold rig-shaded">
                {t("booking.title").toUpperCase()}
              </p>
              <p className="py-10 text-justify whitespace-pre-line josefin text-xl">
                {t("booking.time")}
              </p>
              <div className="flex flex-row z-10	justify-center items-center w-fit m-auto border-b-2	pb-px	">
                <Select
                  key={"bookingHours"}
                  menuPortalTarget={doc}
                  onChange={(newValue: SingleValue<Option>) => {
                    if (!newValue) return;
                    setSelectBookingHour(newValue);
                  }}
                  defaultValue={selectHourOptionsEvening().find(
                    (option) =>
                      option.value === suggestionRequest.date.getHours()
                  )}
                  className="rig-shaded"
                  styles={customSelectStyles()}
                  theme={customTheme}
                  getOptionValue={(option: Option) => option.value.toString()}
                  getOptionLabel={(option: Option) => option.label}
                  options={selectHourOptionsEvening(
                    excludeTimeIntervals?.find(
                      (interval) =>
                        interval.dayOfWeek ===
                        mapGetDayToDayOfWeek(suggestionRequest.date.getDay())
                    )
                  )}
                />
                <p className="rig-shaded h-full align-middle px-5">:</p>
                <Select
                  key={"bookingMinutes"}
                  menuPortalTarget={doc}
                  value={mapNumberToOption(suggestionRequest.date.getMinutes())}
                  onChange={(newValue: SingleValue<Option>) => {
                    if (!newValue) return;
                    setSelectBookingMinutes(newValue);
                  }}
                  className="rig-shaded"
                  styles={customSelectStyles()}
                  theme={customTheme}
                  options={selectOptionMinutes(
                    suggestionRequest.date.getHours(),
                    excludeTimeIntervals?.find(
                      (interval) =>
                        interval.dayOfWeek ===
                        mapGetDayToDayOfWeek(suggestionRequest.date.getDay())
                    )
                  )}
                  getOptionValue={(option: Option) => option.value.toString()}
                  getOptionLabel={(option: Option) => option.label}
                />
              </div>
            </div>

            <div className={"flex flex-col w-full py-20 rig-shaded"}>
              <Button
                color="secondary"
                onClick={() => setCurrentStep(FormStep.CHOOSE_DATE)}
              >
                {t("general.buttons.back")}
              </Button>
              <Spacer y={1} />
              <Button
                color="primary"
                className=" text-dark  rig-shaded"
                onClick={() => setCurrentStep(FormStep.CHOOSE_PERSON_COUNT)}
              >
                {t("general.buttons.next")}
              </Button>
            </div>
          </div>
        );
      case FormStep.CHOOSE_PERSON_COUNT:
        return (
          <div className="md:w-1/2  relative	border-t-2 border-b-2 max-w-lg min-h-form flex w-full flex-col">
            <div className={"flex-1"}>
              <p className="py-5 text-2xl leading-5 font-bold rig-shaded">
                {t("booking.title").toUpperCase()}
              </p>
              <p className="py-10 text-justify whitespace-pre-line josefin text-xl ">
                {t("booking.personCount.subtitle")}
              </p>
              <div className="w-fit border-b-2 m-auto">
                <Select
                  key={"bookingPersonCount"}
                  menuPortalTarget={document.getElementById("main")}
                  value={mapNumberToOption(suggestionRequest.personCount)}
                  onChange={(newValue: SingleValue<Option>) => {
                    if (!newValue) return;
                    setsuggestionRequest((prevRequest) => ({
                      ...prevRequest,
                      personCount: newValue.value,
                    }));
                  }}
                  isSearchable={false}
                  defaultValue={selectOptionPersonCount[1]}
                  className="rig-shaded"
                  styles={customSelectStyles(200)}
                  theme={customTheme}
                  getOptionValue={(option: Option) => option.value.toString()}
                  getOptionLabel={(option: Option) => option.label}
                  options={selectOptionPersonCount}
                />
              </div>
            </div>

            <div className={"flex flex-col w-full py-20 rig-shaded"}>
              <Button
                color="secondary"
                onClick={() => setCurrentStep(FormStep.CHOOSE_TIME)}
              >
                {t("general.buttons.back")}
              </Button>
              <Spacer y={1} />
              <Button
                color="primary"
                className=" text-dark rig-shaded"
                onClick={() => {
                  setCurrentStep(FormStep.LOADING);
                  setFetchSuggestionsLoading(true);
                }}
              >
                {t("general.buttons.next")}
              </Button>
            </div>
          </div>
        );
      case FormStep.FILL_INFORMATION:
        return (
          <div className="md:w-1/2  relative	border-t-2 border-b-2 max-w-lg min-h-form flex w-full flex-col">
            <div className={"flex-1 flex flex-col gap-5  px-5"}>
              <div>
                <p className="py-5 text-2xl leading-5 font-bold rig-shaded">
                  {t("booking.title").toUpperCase()}
                </p>
                <p className=" text-justify whitespace-pre-line josefin text-xl pt-10">
                  {t("booking.fillInformation.subtitle")}
                </p>
              </div>
              <div>
                <p className=" text-justify whitespace-pre-line josefin text-xl">
                  {t("booking.fillInformation.date", {
                    date: format(
                      reservation.reservationStart,
                      router.locale === "de" ? "dd.MM.yyyy" : "yyyy-MM-dd"
                    ),
                    time: format(reservation.reservationStart, "HH:mm"),
                  })}
                </p>
                <p className=" text-justify whitespace-pre-line josefin text-xl">
                  {t("booking.fillInformation.perconCount", {
                    personCount: reservation.personCount,
                  })}
                </p>
              </div>

              <Input
                isClearable
                label={t("booking.firstname.label")}
                placeholder={t("booking.firstname.placeholder")}
                value={reservation.firstNameOfReservator}
                onClear={() =>
                  setReservation({
                    ...reservation,
                    firstNameOfReservator: "",
                  })
                }
                onChange={(e) =>
                  setReservation({
                    ...reservation,
                    firstNameOfReservator: e.target.value,
                  })
                }
              />
              <Input
                isClearable
                label={t("booking.lastname.label")}
                placeholder={t("booking.lastname.placeholder")}
                value={reservation.lastNameOfReservator}
                onClear={() =>
                  setReservation({
                    ...reservation,
                    lastNameOfReservator: "",
                  })
                }
                onChange={(e) =>
                  setReservation({
                    ...reservation,
                    lastNameOfReservator: e.target.value,
                  })
                }
              />
              <Input
                isClearable
                label={t("booking.email.label")}
                placeholder={t("booking.email.placeholder")}
                value={reservation.emailOfReservator}
                onClear={() =>
                  setReservation({
                    ...reservation,
                    emailOfReservator: "",
                  })
                }
                onChange={(e) =>
                  setReservation({
                    ...reservation,
                    emailOfReservator: e.target.value,
                  })
                }
              />
              <Input
                isClearable
                label={t("booking.phone.label")}
                placeholder={t("booking.phone.placeholder")}
                value={reservation.phoneOfReservator}
                onClear={() =>
                  setReservation({
                    ...reservation,
                    phoneOfReservator: "",
                  })
                }
                onChange={(e) =>
                  setReservation({
                    ...reservation,
                    phoneOfReservator: e.target.value,
                  })
                }
              />
              <Input
                isClearable
                label={t("booking.notes.label")}
                placeholder={t("booking.notes.placeholder")}
                value={reservation.note || ""}
                onClear={() =>
                  setReservation({
                    ...reservation,
                    note: "",
                  })
                }
                onChange={(e) =>
                  setReservation({
                    ...reservation,
                    note: e.target.value,
                  })
                }
              />
              {error === "email" && (
                <p className="text-rose-300	">{t("booking.error.email")}</p>
              )}
            </div>

            <div className={"flex flex-col w-full py-20 rig-shaded"}>
              <Button
                color="secondary"
                onClick={() => setCurrentStep(FormStep.CHOOSE_PERSON_COUNT)}
              >
                {t("general.buttons.back")}
              </Button>
              <Spacer y={1} />
              <Button
                color="primary"
                className=" text-dark  rig-shaded"
                onClick={() => saveReservation()}
              >
                {t("general.buttons.send")}
              </Button>
            </div>
          </div>
        );
      case FormStep.RESERVATION_SAVED:
        return (
          <div className="md:w-1/2  relative	border-t-2 border-b-2 max-w-lg min-h-form flex w-full flex-col">
            <div className={"flex-1 flex flex-col gap-5 pt-10 px-5"}>
              <div>
                <p className="py-5 text-2xl leading-5 font-bold rig-shaded">
                  {t("booking.title").toUpperCase()}
                </p>
                <p className=" text-justify whitespace-pre-line josefin text-xl ">
                  {t("booking.reservationSaved")}
                </p>
              </div>
            </div>
          </div>
        );
      case FormStep.RESERVATION_ERROR:
        return (
          <div className="md:w-1/2  relative	border-t-2 border-b-2 max-w-lg min-h-form flex w-full flex-col">
            <div className={"flex-1 flex flex-col gap-5 pt-10 px-5"}>
              <div>
                <p className="py-5 text-2xl leading-5 font-bold rig-shaded">
                  {t("booking.title").toUpperCase()}
                </p>
                <p className=" text-justify whitespace-pre-line josefin text-xl ">
                  {t("booking.reservationError")}
                </p>
              </div>
            </div>
            <div className={"flex flex-col w-full py-20 rig-shaded"}>
              <Button
                color="secondary"
                onClick={() => setCurrentStep(FormStep.FILL_INFORMATION)}
              >
                {t("general.buttons.back")}
              </Button>
            </div>
          </div>
        );
      default:
        return (
          <div className="md:w-1/2  relative	border-t-2 border-b-2 max-w-lg min-h-form flex w-full flex-col justify-center items-center">
            <Spinner />
          </div>
        );
    }
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: "backdrop",
          wrapper: "modal-content",
        }}
        size="5xl"
        backdrop="blur"
      >
        <ModalContent className="ye">
          {(onClose) => (
            <>
              <ModalHeader className="rig-shaded text-2xl">
                {t("booking.modal.header")}
              </ModalHeader>
              <ModalBody className="md:p-5 max-w-screen-2xl m-auto w-full">
                <p className="whitespace-pre-line josefin text-xl">
                  {t("booking.modal.body.availableTimes")}
                </p>
                <div className="flex md:flex-row justify-center h-full gap-4 flex-col">
                  {!suggestions && (
                    <p className="font-bold whitespace-pre-line josefin text-xl">
                      {t("booking.modal.body.suggestionsError")}
                    </p>
                  )}
                  {suggestions && suggestions.length > 0 ? (
                    suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        onClick={() => {
                          setChosenSuggestion(suggestion);
                          onClose();
                          setCurrentStep(FormStep.FILL_INFORMATION);
                        }}
                        color="primary"
                        className=" text-dark  rig-shaded"
                      >
                        {suggestion.startTime.getHours() +
                          ":" +
                          (!suggestion.startTime.getMinutes()
                            ? "00"
                            : suggestion.startTime.getMinutes())}
                      </Button>
                    ))
                  ) : (
                    <p className="font-bold whitespace-pre-line josefin text-xl">
                      {t("booking.modal.body.noSuggestions")}
                    </p>
                  )}
                </div>
              </ModalBody>
              <ModalFooter className="justify-center py-10">
                <Button onPress={onClose} className={"rig-shaded"}>
                  {t("general.buttons.close")}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <main
        className="flex flex-col  w-full text-white m-auto overflow-hidden"
        id="main"
      >
        <div className={"  w-full text-white max-w-screen-2xl m-auto	"}>
          <NavigationBar />
          <div className={"flex-1 p-10 flex flex-row gap-5 justify-center	"}>
            {renderRightFormStep()}
            <div className="hidden md:block md:w-full">
              <Image
                src={restaurantImage}
                alt={"Restaurant"}
                fill
                objectFit={"cover"}
              />
            </div>
          </div>
          <Footer />
        </div>
      </main>
    </>
  );
};

export default ReservationForm;
