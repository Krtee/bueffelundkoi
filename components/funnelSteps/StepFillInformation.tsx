"use client";

import { Input } from "@heroui/react";
import { format } from "date-fns";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Reservation } from "../../utils/booking/Booking.types";
import FunnelStepLayout from "./FunnelStepLayout";

interface StepChooseReservationProps {
  onPrevious?: (reservation: Reservation) => void;
  onNext: (reservation: Reservation) => void;
  reservation: Reservation;
  locale: string;
  error: "email" | undefined;
}

const StepFillReservation: React.FC<StepChooseReservationProps> = ({
  onNext,
  onPrevious,
  reservation,
  locale,
  error,
}) => {
  const [tempReservation, setTempReservation] =
    useState<Reservation>(reservation);
  const { t } = useTranslation("common");

  const disableNext: boolean =
    !tempReservation.emailOfReservator &&
    (!!tempReservation.firstNameOfReservator ||
      !!tempReservation.lastNameOfReservator);

  return (
    <FunnelStepLayout
      onNext={() => {
        if (disableNext) return;

        onNext(tempReservation);
      }}
      subTitle={t("booking.fillInformation.subtitle")}
      nextDisabled={disableNext}
      onPrevious={() => onPrevious?.(tempReservation)}
    >
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
                tempReservation.reservationStart,
                locale === "de" ? "dd.MM.yyyy" : "yyyy-MM-dd"
              ),
              time: format(tempReservation.reservationStart, "HH:mm"),
            })}
          </p>
          <p className=" text-justify whitespace-pre-line josefin text-xl">
            {t("booking.fillInformation.perconCount", {
              personCount: tempReservation.personCount,
            })}
          </p>
        </div>

        <Input
          isClearable
          label={t("booking.firstname.label")}
          placeholder={t("booking.firstname.placeholder")}
          value={tempReservation.firstNameOfReservator}
          onClear={() =>
            setTempReservation({
              ...tempReservation,
              firstNameOfReservator: "",
            })
          }
          onValueChange={(newValue) =>
            setTempReservation({
              ...tempReservation,
              firstNameOfReservator: newValue,
            })
          }
        />
        <Input
          isClearable
          label={t("booking.lastname.label")}
          placeholder={t("booking.lastname.placeholder")}
          value={tempReservation.lastNameOfReservator}
          onClear={() =>
            setTempReservation({
              ...tempReservation,
              lastNameOfReservator: "",
            })
          }
          onValueChange={(newValue) =>
            setTempReservation({
              ...tempReservation,
              lastNameOfReservator: newValue,
            })
          }
        />
        <Input
          isClearable
          type="email"
          label={t("booking.email.label")}
          placeholder={t("booking.email.placeholder")}
          value={tempReservation.emailOfReservator}
          onClear={() =>
            setTempReservation({
              ...tempReservation,
              emailOfReservator: "",
            })
          }
          onValueChange={(newValue) =>
            setTempReservation({
              ...tempReservation,
              emailOfReservator: newValue,
            })
          }
        />
        <Input
          isClearable
          label={t("booking.phone.label")}
          placeholder={t("booking.phone.placeholder")}
          value={tempReservation.phoneOfReservator}
          onClear={() =>
            setTempReservation({
              ...tempReservation,
              phoneOfReservator: "",
            })
          }
          onValueChange={(newValue) =>
            setTempReservation({
              ...tempReservation,
              phoneOfReservator: newValue,
            })
          }
        />
        <Input
          isClearable
          label={t("booking.notes.label")}
          placeholder={t("booking.notes.placeholder")}
          value={tempReservation.note || ""}
          onClear={() =>
            setTempReservation({
              ...tempReservation,
              note: "",
            })
          }
          onValueChange={(newValue) =>
            setTempReservation({
              ...tempReservation,
              note: newValue,
            })
          }
        />
        {error === "email" && (
          <p className="text-rose-300	">{t("booking.error.email")}</p>
        )}
      </div>

      {error === "email" && (
        <p className="text-rose-300	">{t("booking.error.email")}</p>
      )}
    </FunnelStepLayout>
  );
};

export default StepFillReservation;
