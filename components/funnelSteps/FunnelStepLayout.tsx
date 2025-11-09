import { Button, Spacer } from "@heroui/react";
import { useTranslation } from "next-i18next";
import React from "react";

interface FunnelStepLayoutProps {
  onPrevious?: () => void;
  onNext: () => void;
  subTitle: string;
  children: React.ReactNode;
  nextDisabled?: boolean;
  nextIsSend?: boolean;
}
const FunnelStepLayout: React.FC<FunnelStepLayoutProps> = ({
  onPrevious,
  onNext,
  subTitle,
  children,
  nextDisabled,
  nextIsSend,
}) => {
  const { t } = useTranslation();
  return (
    <div className="md:w-1/2  relative	border-t-2 border-b-2 max-w-lg min-h-full flex w-full flex-col dark">
      <p className="py-5 text-2xl leading-5 font-bold rig-shaded">
        {t("booking.title").toUpperCase()}
      </p>
      <p className="py-10 text-justify whitespace-pre-line josefin text-xl">
        {subTitle}
      </p>

      {children}
      <div className={"flex flex-col w-full py-20 rig-shaded"}>
        {onPrevious && (
          <Button onClick={onPrevious} color="secondary">
            {t("general.buttons.back")}
          </Button>
        )}
        <Spacer y={1} />
        <Button
          color="primary"
          className="text-dark rig-shaded w-full"
          onClick={onNext}
          isDisabled={nextDisabled}
        >
          {nextIsSend ? t("general.buttons.send") : t("general.buttons.next")}
        </Button>
      </div>
    </div>
  );
};

export default FunnelStepLayout;
