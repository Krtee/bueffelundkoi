"use client";

import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { confirmReservation } from "../utils/booking/BookingUtils";

// Rename the component to reflect its role
const ConfirmReservationContent: React.FC = () => {
  const { t } = useTranslation();
  // router.query can be undefined on initial render
  //const confirmationId = router.query.confirmationId as string | undefined;
  const router = useRouter();
  const { confirmationId } = router.query;
  const [confirmationResponse, setConfirmationResponse] = useState(-1);

  useEffect(() => {
    // 💡 FIX 1: Only run if confirmationId is present (router is ready)
    if (confirmationId && typeof confirmationId === "string") {
      // 💡 FIX 2: Only use confirmationId in the dependency array
      confirmReservation(confirmationId).then(setConfirmationResponse);
    }
  }, [confirmationId]);

  const renderCorrectContent = () => {
    // ... (Your switch statement logic is correct and remains the same)
    switch (confirmationResponse) {
      case 200:
        return (
          <div
            className={
              "flex-1 p-10 flex flex-col gap-5  min-h-screen md:px-40  "
            }
          >
            <h1 className="text-2xl">{t("booking.accept.title")}</h1>
            <p className="josefin text-xl">{t("booking.accept.body")}</p>
          </div>
        );
      case 208:
        return (
          <div
            className={
              "flex-1 p-10 flex flex-col gap-5  min-h-screen md:px-40  "
            }
          >
            <h1 className="text-2xl">{t("booking.alreadyConfirmed.title")}</h1>
            <p className="josefin text-xl">
              {t("booking.alreadyConfirmed.body")}
            </p>
          </div>
        );
      case -1:
        return (
          <div
            className={
              "flex-1 p-10 flex flex-col gap-5  min-h-screen md:px-40  "
            }
          >
            <div className="max-w-sm animate-pulse">
              <div className="h-6 bg-gray-600 rounded-full w-64 mb-10"></div>
              <div className="h-4 bg-gray-600 rounded-full max-w-[360px] mb-2.5"></div>
              <div className="h-4 bg-gray-600 rounded-full mb-2.5"></div>
              <div className="h-4 bg-gray-600 rounded-full max-w-[330px] mb-2.5"></div>
            </div>
          </div>
        );
      default:
        return (
          <div
            className={
              "flex-1 p-10 flex flex-col gap-5  min-h-screen md:px-40  "
            }
          >
            <h1 className="text-2xl">{t("booking.failed.title")}</h1>
            <p className="josefin text-xl">{t("booking.failed.body")}</p>
          </div>
        );
    }
  };

  return renderCorrectContent();
};

export default ConfirmReservationContent;
