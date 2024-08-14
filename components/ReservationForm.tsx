"use client";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";

import { Spinner } from "@nextui-org/spinner";
import { addSeconds } from "date-fns";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { Suspense, useEffect, useState } from "react";
import {
  Reservation,
  SuggestionRequest,
  SuggestionResponse,
} from "../utils/booking/Booking.types";
import {
  emptyReservation,
  fetchSuggestions,
  postNewReservation,
  validateEmail,
} from "../utils/booking/BookingUtils";
import restaurantImage from "./../public/assets/images/bildergalerie_2.jpg";
import Footer from "./Footer";
import NavigationBar from "./NavigationBar";

const DynamicStepChooseDate = dynamic(() =>
  import("./funnelSteps/StepChooseDate").then((mod) => mod.default)
);

const DynamicStepChooseTime = dynamic(() =>
  import("./funnelSteps/StepChooseTime").then((mod) => mod.default)
);

const DynamicStepChoosePersonCount = dynamic(() =>
  import("./funnelSteps/StepChoosePersonCount").then((mod) => mod.default)
);

const DynamicStepFillInformation = dynamic(() =>
  import("./funnelSteps/StepFillInformation").then((mod) => mod.default)
);

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

  const [currentStep, setCurrentStep] = useState<FormStep>(
    FormStep.CHOOSE_DATE
  );
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [suggestionRequest, setsuggestionRequest] = useState<SuggestionRequest>(
    {
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        18,
        0
      ),
      personCount: 2,
    }
  );
  const [suggestions, setSuggestions] = useState<
    SuggestionResponse[] | undefined
  >([]);
  const [error, setError] = useState<"email" | undefined>();
  const saveReservation = (reservationtoSend: Reservation) => {
    if (!validateEmail(reservationtoSend.emailOfReservator)) {
      setError("email");
    }
    setCurrentStep(FormStep.LOADING);
    postNewReservation(reservationtoSend).then((savedReservation) => {
      if (!savedReservation) {
        setCurrentStep(FormStep.RESERVATION_ERROR);
      } else {
        setCurrentStep(FormStep.RESERVATION_SAVED);
        setReservation(savedReservation);
      }
    });
  };
  const [visitedSteps, setVisitedSteps] = useState<FormStep[]>([]);

  const [chosenSuggestion, setChosenSuggestion] =
    useState<SuggestionResponse>();

  const onFetchSuggestions = (suggestionRequestToSend: SuggestionRequest) => {
    setCurrentStep(FormStep.LOADING);

    fetchSuggestions(
      suggestionRequestToSend.date,
      reservationTimeInSeconds,
      suggestionRequestToSend.personCount
    )
      .then((suggestions) => {
        if (
          suggestions &&
          suggestions.length === 1 &&
          suggestions[0].startTime.getHours() ===
            suggestionRequestToSend.date.getHours() &&
          suggestions[0].startTime.getMinutes() ===
            suggestionRequestToSend.date.getMinutes()
        ) {
          setReservation((prevReservation) => ({
            ...prevReservation,
            reservationStart: new Date(suggestions[0].startTime),
            reservationEnd: addSeconds(
              new Date(suggestions[0].startTime),
              6300
            ),
            personCount: suggestionRequestToSend.personCount,
            tableNumbers: [suggestions[0].tableNumber],
          }));
          setCurrentStep(FormStep.FILL_INFORMATION);
        } else {
          setSuggestions(suggestions);
          setCurrentStep(FormStep.CHOOSE_PERSON_COUNT);
          onOpen();
        }
      })
      .catch((error) => {
        setCurrentStep(FormStep.RESERVATION_ERROR);
      });
  };

  const addVisitedStep = (step: FormStep) => {
    if (!visitedSteps.includes(step)) setVisitedSteps([...visitedSteps, step]);
  };

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
          <Suspense
            fallback={
              <div>
                <Spinner />
              </div>
            }
          >
            <DynamicStepChooseDate
              onNext={(newDate: Date) => {
                setsuggestionRequest({ ...suggestionRequest, date: newDate });

                addVisitedStep(FormStep.CHOOSE_DATE);
                setCurrentStep(FormStep.CHOOSE_TIME);
              }}
              date={suggestionRequest.date}
              locale={router.locale || "de"}
              visited={visitedSteps.includes(FormStep.CHOOSE_DATE)}
            />
          </Suspense>
        );
      case FormStep.CHOOSE_TIME:
        return (
          <Suspense
            fallback={
              <div>
                <Spinner />
              </div>
            }
          >
            <DynamicStepChooseTime
              onNext={(newDate: Date) => {
                setsuggestionRequest({ ...suggestionRequest, date: newDate });
                addVisitedStep(FormStep.CHOOSE_TIME);
                setCurrentStep(FormStep.CHOOSE_PERSON_COUNT);
              }}
              onPrevious={(newTime: Date) => {
                setsuggestionRequest({ ...suggestionRequest, date: newTime });
                addVisitedStep(FormStep.CHOOSE_TIME);
                setCurrentStep(FormStep.CHOOSE_DATE);
              }}
              date={suggestionRequest.date || new Date()}
              visited={visitedSteps.includes(FormStep.CHOOSE_TIME)}
            />
          </Suspense>
        );
      case FormStep.CHOOSE_PERSON_COUNT:
        return (
          <Suspense
            fallback={
              <div>
                <Spinner />
              </div>
            }
          >
            <DynamicStepChoosePersonCount
              onNext={(personCount: number) => {
                const newSuggestionRequest = {
                  ...suggestionRequest,
                  personCount: personCount,
                };
                addVisitedStep(FormStep.CHOOSE_PERSON_COUNT);
                setsuggestionRequest(newSuggestionRequest);
                onFetchSuggestions(newSuggestionRequest);
              }}
              onPrevious={(personCount) => {
                addVisitedStep(FormStep.CHOOSE_PERSON_COUNT);
                setsuggestionRequest({
                  ...suggestionRequest,
                  personCount: personCount,
                });

                setCurrentStep(FormStep.CHOOSE_TIME);
              }}
              personCount={suggestionRequest.personCount}
            />
          </Suspense>
        );
      case FormStep.FILL_INFORMATION:
        return (
          <Suspense
            fallback={
              <div>
                <Spinner />
              </div>
            }
          >
            <DynamicStepFillInformation
              onPrevious={(newReservation) => {
                addVisitedStep(FormStep.FILL_INFORMATION);
                setCurrentStep(FormStep.CHOOSE_PERSON_COUNT);
                setReservation(newReservation);
              }}
              reservation={reservation}
              onNext={(newReservation: Reservation) => {
                addVisitedStep(FormStep.FILL_INFORMATION);
                setReservation(newReservation);
                saveReservation(newReservation);
              }}
              locale={router.locale || "de"}
              error={error}
            />
          </Suspense>
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
