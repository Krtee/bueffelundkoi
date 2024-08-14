"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import Select, { SingleValue } from "react-select";
import {
  customSelectStyles,
  customTheme,
  Option,
  selectOptionPersonCount,
} from "../../utils/booking/Booking.types";
import { mapNumberToOption } from "../../utils/booking/BookingUtils";
import FunnelStepLayout from "./FunnelStepLayout";

interface StepChoosePersonCountProps {
  onPrevious?: (personCount: number) => void;
  onNext: (personCount: number) => void;
  personCount?: number;
}

const StepChoosePersonCount: React.FC<StepChoosePersonCountProps> = ({
  onNext,
  onPrevious,
  personCount,
}) => {
  const [selectedPersonCount, setSelectedPersonCount] = React.useState<number>(
    personCount || 2
  );

  const { t } = useTranslation("common");

  return (
    <FunnelStepLayout
      onNext={() => {
        onNext(selectedPersonCount);
      }}
      subTitle={t("booking.personCount.subtitle")}
      nextDisabled={!selectedPersonCount}
      onPrevious={() => onPrevious?.(selectedPersonCount)}
    >
      <div className="w-fit border-b-2 m-auto">
        <Select
          key={"bookingPersonCount"}
          menuPortalTarget={document.getElementById("main")}
          value={mapNumberToOption(selectedPersonCount)}
          onChange={(newValue: SingleValue<Option>) => {
            if (!newValue) return;

            setSelectedPersonCount(newValue.value);
          }}
          isSearchable={false}
          className="rig-shaded"
          styles={customSelectStyles(200)}
          theme={customTheme}
          getOptionValue={(option: Option) => option.value.toString()}
          getOptionLabel={(option: Option) => option.label}
          options={selectOptionPersonCount}
        />
      </div>
    </FunnelStepLayout>
  );
};

export default StepChoosePersonCount;
