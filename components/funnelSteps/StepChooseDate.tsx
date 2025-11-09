"use client";

import { DatePicker, DateValue } from "@heroui/react";
import { CalendarDate, parseDate } from "@internationalized/date";
import { isSameDay } from "date-fns";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  fetchExcludeDates,
  getMinDate,
  numberToString,
} from "../../utils/booking/BookingUtils";
import FunnelStepLayout from "./FunnelStepLayout";

interface StepChooseDateProps {
  onNext: (date: Date) => void;
  date: Date;
  locale: string;
  visited?: boolean;
}

const StepChooseDate: React.FC<StepChooseDateProps> = ({ onNext, date }) => {
  const [tempDate, setTempDate] = React.useState<CalendarDate>(
    parseDate(date.toISOString().substring(0, 10))
  );
  const [excludeDates, setExcludeDates] = React.useState<Date[]>();

  const tempDateAsDate: Date = new Date(
    tempDate.toString() +
      "T" +
      numberToString(date.getHours()) +
      ":" +
      numberToString(date.getMinutes()) +
      ":00"
  );
  const { t } = useTranslation("common");

  useEffect(() => {
    fetchExcludeDates().then(setExcludeDates);
  }, []);

  const checkIfNextDisabled = () => {
    // Check if the next button should be disabled
    // if date is null, then the next button should be disabled
    if (!date) return true;
    // if the date is today and the time is after 5pm, then the next button should be disabled
    if (isSameDay(tempDateAsDate, new Date()) && new Date().getHours() >= 17)
      return true;
    // if the choosen date is excluded, then the next button should be disabled
    if (
      excludeDates?.some(
        (excludedDate) =>
          excludedDate.getDate() === tempDateAsDate.getDate() &&
          excludedDate.getMonth() === tempDateAsDate.getMonth() &&
          excludedDate.getFullYear() === tempDateAsDate.getFullYear()
      )
    )
      return true;

    return false;
  };

  return (
    <FunnelStepLayout
      onNext={() => {
        onNext(tempDateAsDate);
      }}
      subTitle={t("booking.date")}
      nextDisabled={checkIfNextDisabled()}
    >
      <div className={"react-datepicker__wrapper flex-1 flex justify-center	"}>
        <DatePicker
          aria-label="Choose date"
          value={tempDate}
          onChange={(newDate) => {
            if (!newDate) return;
            setTempDate(newDate);
          }}
          minValue={parseDate(
            getMinDate(excludeDates).toISOString().substring(0, 10)
          )}
          isDateUnavailable={(dateToCheck: DateValue) =>
            excludeDates?.some(
              (excludedDate) =>
                excludedDate.getDate() ===
                  dateToCheck.toDate("Europe/Berlin").getDate() &&
                excludedDate.getMonth() ===
                  dateToCheck.toDate("Europe/Berlin").getMonth() &&
                excludedDate.getFullYear() ===
                  dateToCheck.toDate("Europe/Berlin").getFullYear()
            ) ?? false
          }
        />
      </div>
      <p className="py-10 text-justify whitespace-pre-line josefin leading-4">
        {t("booking.experimental")}
      </p>
    </FunnelStepLayout>
  );
};

export default StepChooseDate;
