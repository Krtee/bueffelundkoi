"use client";

import { parseDate } from "@internationalized/date";
import { DatePicker, DateValue } from "@nextui-org/react";
import { isBefore, isSameDay } from "date-fns";
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
  const [tempDate, setTempDate] = React.useState<DateValue>(
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

  return (
    <FunnelStepLayout
      onNext={() => {
        onNext(tempDateAsDate);
      }}
      subTitle={t("booking.date")}
      nextDisabled={
        !date ||
        (!isSameDay(tempDateAsDate, date) &&
          isBefore(tempDateAsDate, getMinDate(excludeDates))) ||
        excludeDates?.some(
          (excludedDate) =>
            excludedDate.getDate() === tempDateAsDate.getDate() &&
            excludedDate.getMonth() === tempDateAsDate.getMonth() &&
            excludedDate.getFullYear() === tempDateAsDate.getFullYear()
        )
      }
    >
      <div className={"react-datepicker__wrapper flex-1 flex justify-center	"}>
        <DatePicker
          aria-label="Choose date"
          value={tempDate}
          onChange={setTempDate}
          minValue={parseDate(
            getMinDate(excludeDates).toISOString().substring(0, 10)
          )}
          isDateUnavailable={(dateToCheck: DateValue) =>
            excludeDates?.some(
              (excludedDate) =>
                excludedDate.getDate() === dateToCheck.toDate("de").getDate() &&
                excludedDate.getMonth() ===
                  dateToCheck.toDate("de").getMonth() &&
                excludedDate.getFullYear() ===
                  dateToCheck.toDate("de").getFullYear()
            ) ?? false
          }
        />
      </div>
      <p className="py-10 text-justify whitespace-pre-line josefin  leading-4	">
        {t("booking.experimental")}
      </p>
    </FunnelStepLayout>
  );
};

export default StepChooseDate;
