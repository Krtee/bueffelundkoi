"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Select, { SingleValue } from "react-select";
import {
  customSelectStyles,
  customTheme,
  ExcludedTimeInterval,
  Option,
  selectHourOptionsEvening,
  selectOptionMinutes,
} from "../../utils/booking/Booking.types";
import {
  checkIfTimeIsValid,
  fetchExcludeTimeIntervals,
  mapGetDayToDayOfWeek,
} from "../../utils/booking/BookingUtils";
import FunnelStepLayout from "./FunnelStepLayout";

interface StepChooseTimeProps {
  onPrevious?: (time: Date) => void;
  onNext: (time: Date) => void;
  date: Date;
  visited?: boolean;
}

const StepChooseTime: React.FC<StepChooseTimeProps> = ({
  onNext,
  date,
  onPrevious,
  visited,
}) => {
  const [minuteOptions, setMinuteOptions] = useState<Option[]>(
    selectOptionMinutes()
  );

  const [selectedReservationHour, setSelectBookingHour] = useState<Option>(
    visited
      ? selectHourOptionsEvening().find(
          (option) => option.value === date.getHours()
        )!
      : selectHourOptionsEvening()[1]
  );
  const [selectedReservationMinutes, setSelectBookingMinutes] =
    useState<Option>(
      visited
        ? selectOptionMinutes().find(
            (option) => option.value === date.getMinutes()
          )!
        : selectOptionMinutes()[0]
    );
  const [excludeTimeIntervals, setExcludeTimeIntervals] =
    useState<ExcludedTimeInterval[]>();
  const { t } = useTranslation("common");
  const [doc, setDoc] = useState<HTMLElement | null>();
  const [excludedTimeIntervalFetched, setExcludedTimeIntervalFetched] =
    useState(false);
  const updatedDate: Date = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    selectedReservationHour.value,
    selectedReservationMinutes.value
  );

  useEffect(() => {
    fetchExcludeTimeIntervals().then((excludeTimeIntervals) => {
      setExcludeTimeIntervals(excludeTimeIntervals);
      setExcludedTimeIntervalFetched(true);
    });
    setDoc(document.getElementById("main"));
  }, []);

  useEffect(() => {
    if (!excludeTimeIntervals || visited) return;

    if (
      checkIfTimeIsValid(
        selectedReservationHour?.value || 18,
        selectedReservationMinutes?.value || 0,
        mapGetDayToDayOfWeek(date.getDay()),
        excludeTimeIntervals
      )
    ) {
      return;
    }

    const defaultHour: Option | undefined = selectHourOptionsEvening().find(
      (value) => !value.isDisabled
    );

    const defaultMinute: Option | undefined = selectOptionMinutes(
      defaultHour?.value || 18
    ).find((value) => !value.isDisabled);

    if (defaultHour) setSelectBookingHour(defaultHour);
    if (defaultMinute) setSelectBookingMinutes(defaultMinute);
  }, [excludeTimeIntervals]);

  /**
   * updates the date when the hour changes
   */
  // useEffect(() => {
  //   if (!selectedReservationHour) return;

  //   const updatedMinuteOptions = selectOptionMinutes(
  //     selectedReservationHour.value,
  //     excludeTimeIntervals?.find(
  //       (interval) => interval.dayOfWeek === mapGetDayToDayOfWeek(date.getDay())
  //     )
  //   );

  //   setMinuteOptions(updatedMinuteOptions);
  //   const foundMinutes = selectOptionMinutes().find(
  //     (findOption) =>
  //       findOption.value ===
  //       getNextValidMinutes(
  //         selectedReservationHour.value,
  //         date.getMinutes(),
  //         excludeTimeIntervals?.find(
  //           (interval) =>
  //             interval.dayOfWeek === mapGetDayToDayOfWeek(date.getDay())
  //         )
  //       )
  //   );

  //   if (foundMinutes) setSelectBookingMinutes(foundMinutes);
  // }, [selectedReservationHour]);

  return (
    <FunnelStepLayout
      onPrevious={() => {
        onPrevious?.(updatedDate);
      }}
      onNext={() => {
        if (
          !checkIfTimeIsValid(
            updatedDate.getHours(),
            updatedDate.getMinutes(),
            mapGetDayToDayOfWeek(date.getDay()),
            excludeTimeIntervals
          )
        )
          return;
        onNext(updatedDate);
      }}
      subTitle={t("booking.time")}
      nextDisabled={
        !checkIfTimeIsValid(
          selectedReservationHour.value,
          selectedReservationMinutes.value,
          mapGetDayToDayOfWeek(date.getDay()),
          excludeTimeIntervals
        )
      }
    >
      <div className="flex flex-row z-10	justify-center items-center w-fit m-auto border-b-2	pb-px">
        <Select
          key={"bookingHours"}
          menuPortalTarget={doc}
          onChange={(newValue: SingleValue<Option>) => {
            if (!newValue) return;
            setSelectBookingHour(newValue);
          }}
          className="rig-shaded"
          styles={customSelectStyles()}
          theme={customTheme}
          getOptionValue={(option: Option) => option.value.toString()}
          getOptionLabel={(option: Option) => option.label}
          options={selectHourOptionsEvening()}
          isDisabled={!excludedTimeIntervalFetched}
          value={selectedReservationHour}
        />
        <p className="rig-shaded h-full align-middle px-5">:</p>
        <Select
          key={"bookingMinutes"}
          menuPortalTarget={doc}
          value={selectedReservationMinutes}
          onChange={(newValue: SingleValue<Option>) => {
            if (!newValue) return;
            setSelectBookingMinutes(newValue);
          }}
          className="rig-shaded"
          styles={customSelectStyles()}
          theme={customTheme}
          options={minuteOptions}
          getOptionValue={(option: Option) => option.value.toString()}
          getOptionLabel={(option: Option) => option.label}
          isDisabled={!excludedTimeIntervalFetched}
        />
      </div>
    </FunnelStepLayout>
  );
};

export default StepChooseTime;
