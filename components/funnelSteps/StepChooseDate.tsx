"use client";

import { parseDate } from "@internationalized/date";
import { DatePicker, DateValue } from "@nextui-org/react";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  fetchExcludeDates,
  getMinDate,
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
    parseDate(date.toISOString())
  );
  const [excludeDates, setExcludeDates] = React.useState<Date[]>([]);

  const { t } = useTranslation("common");

  useEffect(() => {
    fetchExcludeDates().then(setExcludeDates);
  }, []);

  return (
    <FunnelStepLayout
      onNext={() => onNext(tempDate.toDate("de"))}
      subTitle={t("booking.date")}
      nextDisabled={!date}
    >
      <div className={"react-datepicker__wrapper flex-1 flex justify-center	"}>
        <DatePicker
          value={tempDate}
          onChange={setTempDate}
          minValue={parseDate(getMinDate(excludeDates).toISOString())}
          isDateUnavailable={(dateToCheck: DateValue) =>
            excludeDates.some(
              (excludedDate) =>
                excludedDate.getDate() === dateToCheck.toDate("de").getDate() &&
                excludedDate.getMonth() ===
                  dateToCheck.toDate("de").getMonth() &&
                excludedDate.getFullYear() ===
                  dateToCheck.toDate("de").getFullYear()
            )
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
