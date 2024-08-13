"use client";

import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
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
}

const StepChooseDate: React.FC<StepChooseDateProps> = ({
  onNext,
  date,
  locale,
}) => {
  const [tempDate, setTempDate] = React.useState<Date>(date);
  const [excludeDates, setExcludeDates] = React.useState<Date[]>([]);

  const { t } = useTranslation("common");

  useEffect(() => {
    fetchExcludeDates().then(setExcludeDates);
  }, []);

  return (
    <FunnelStepLayout
      onNext={() => onNext(tempDate)}
      subTitle={t("booking.date")}
      nextDisabled={!date}
    >
      <div className={"react-datepicker__wrapper flex-1 flex justify-center	"}>
        <DatePicker
          selected={tempDate}
          onChange={(date: Date) => setTempDate(date)}
          excludeDates={excludeDates}
          withPortal
          locale={locale}
          portalId="__next"
          dateFormat={locale === "de" ? "dd.MM.yyyy" : undefined}
          minDate={getMinDate(excludeDates)}
        />
      </div>
      <p className="py-10 text-justify whitespace-pre-line josefin  leading-4	">
        {t("booking.experimental")}
      </p>
    </FunnelStepLayout>
  );
};

export default StepChooseDate;
