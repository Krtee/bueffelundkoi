import {
  Button,
  Input,
  Loading,
  Modal,
  Spacer,
  useModal,
} from "@nextui-org/react";
import { addSeconds, format } from "date-fns";
import de from "date-fns/locale/de";
import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import Select, { SingleValue } from "react-select";
import Footer from "../../components/Footer";
import NavigationBar from "../../components/NavigationBar";
import {
  customSelectStyles,
  customTheme,
  Option,
  Reservation,
  selectHourOptionsEvening,
  selectOptionMinutes,
  selectOptionPersonCount,
  SuggestionResponse,
} from "../../utils/booking/Booking.types";
import {
  emptyReservation,
  fetchSuggestions,
  mapNumberToOption,
  postNewReservation,
  validateEmail,
} from "../../utils/booking/BookingUtils";
import restaurantImage from "./../../public/assets/images/bildergalerie_2.jpg";

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

const NewReservation: NextPage = () => {
  const { t } = useTranslation("common");
  const [reservation, setReservation] = useState<Reservation>(emptyReservation);
  const reservationTimeInSeconds: number = 7200;
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<FormStep>(
    FormStep.CHOOSE_DATE
  );
  const { setVisible, bindings } = useModal();
  const [suggestionRequest, setsuggestionRequest] = useState<{
    date: Date;
    personCount: number;
  }>({
    date: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
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

  /**
   * returns the current step of the form
   *
   */
  const renderRightFormStep = (): JSX.Element => {
    switch (currentStep) {
      case FormStep.CHOOSE_DATE:
        return (
          <div className="md:w-1/2  relative	border-t-2 border-b-2 max-w-lg min-h-form flex w-full flex-col">
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
                withPortal
                locale={router.locale}
                portalId="__next"
                dateFormat={router.locale === "de" ? "dd.MM.yyyy" : undefined}
                minDate={new Date()}
              />
            </div>
            <p className="py-10 text-justify whitespace-pre-line josefin  leading-4	">
              {t("booking.experimental")}
            </p>
            <div className={"w-full py-20"}>
              <Button
                color="primary"
                className="text-dark  rig-shaded w-full"
                onClick={() => setCurrentStep(FormStep.CHOOSE_TIME)}
                auto
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
                  menuPortalTarget={document.getElementById("main")}
                  onChange={(newValue: SingleValue<Option>) => {
                    if (!newValue) return;
                    let currentReservationDate = new Date(
                      suggestionRequest.date
                    );

                    currentReservationDate.setHours(newValue.value);
                    setsuggestionRequest({
                      ...suggestionRequest,
                      date: currentReservationDate,
                    });
                  }}
                  defaultValue={selectHourOptionsEvening.find(
                    (option) =>
                      option.value === suggestionRequest.date.getHours()
                  )}
                  className="rig-shaded"
                  styles={customSelectStyles()}
                  theme={customTheme}
                  getOptionValue={(option: Option) => option.value.toString()}
                  getOptionLabel={(option: Option) => option.label}
                  options={selectHourOptionsEvening}
                />
                <p className="rig-shaded h-full align-middle px-5">:</p>
                <Select
                  key={"bookingMinutes"}
                  menuPortalTarget={document.getElementById("main")}
                  value={mapNumberToOption(suggestionRequest.date.getMinutes())}
                  onChange={(newValue: SingleValue<Option>) => {
                    if (!newValue) return;
                    let currentReservationDate = new Date(
                      suggestionRequest.date
                    );
                    currentReservationDate.setMinutes(newValue.value);
                    setsuggestionRequest({
                      ...reservation,
                      date: currentReservationDate,
                    });
                  }}
                  defaultValue={selectHourOptionsEvening.find(
                    (option) =>
                      option.value === suggestionRequest.date.getMinutes()
                  )}
                  className="rig-shaded"
                  styles={customSelectStyles()}
                  theme={customTheme}
                  options={selectOptionMinutes}
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
                        reservationEnd: addSeconds(
                          new Date(suggestions[0].startTime),
                          6300
                        ),
                        personCount: suggestionRequest.personCount,
                        tableNumbers: [suggestions[0].tableNumber],
                      }));
                      setCurrentStep(FormStep.FILL_INFORMATION);
                    } else {
                      setSuggestions(suggestions);
                      setVisible(true);
                      setCurrentStep(FormStep.CHOOSE_PERSON_COUNT);
                    }
                  });
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
                clearable
                underlined
                label={t("booking.firstname.label")}
                placeholder={t("booking.firstname.placeholder")}
                value={reservation.firstNameOfReservator}
                onChange={(e) =>
                  setReservation({
                    ...reservation,
                    firstNameOfReservator: e.target.value,
                  })
                }
              />
              <Input
                clearable
                underlined
                label={t("booking.lastname.label")}
                placeholder={t("booking.lastname.placeholder")}
                value={reservation.lastNameOfReservator}
                onChange={(e) =>
                  setReservation({
                    ...reservation,
                    lastNameOfReservator: e.target.value,
                  })
                }
              />
              <Input
                clearable
                underlined
                label={t("booking.email.label")}
                placeholder={t("booking.email.placeholder")}
                value={reservation.emailOfReservator}
                onChange={(e) =>
                  setReservation({
                    ...reservation,
                    emailOfReservator: e.target.value,
                  })
                }
              />
              <Input
                clearable
                underlined
                label={t("booking.phone.label")}
                placeholder={t("booking.phone.placeholder")}
                value={reservation.phoneOfReservator}
                onChange={(e) =>
                  setReservation({
                    ...reservation,
                    phoneOfReservator: e.target.value,
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
            <Loading />
          </div>
        );
    }
  };
  return (
    <div className="overflow-y-auto h-screen">
      <Head>
        <title>Büffel &amp; Koi</title>
        <meta name="description" content="Büffel und Koi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Modal
        scroll
        fullScreen
        closeButton
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Modal.Header className="rig-shaded text-2xl">
          {t("booking.modal.header")}
        </Modal.Header>
        <Modal.Body className="md:p-5 max-w-screen-2xl m-auto w-full">
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
                    setReservation((prevReservation) => ({
                      ...prevReservation,
                      reservationStart: new Date(suggestion.startTime),
                      reservationEnd: addSeconds(
                        new Date(suggestions[0].startTime),
                        6300
                      ),
                      personCount: suggestionRequest.personCount,
                      tableNumbers: [suggestion.tableNumber],
                    }));
                    setVisible(false);
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
        </Modal.Body>
        <Modal.Footer className="justify-center py-10">
          <Button
            light
            auto
            onClick={() => setVisible(false)}
            className={"rig-shaded"}
          >
            {t("general.buttons.close")}
          </Button>
        </Modal.Footer>
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
                layout={"fill"}
                objectFit="cover"
              />
            </div>
          </div>
          <Footer />
        </div>
      </main>
    </div>
  );
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "footer"])),
  },
});

export default NewReservation;
