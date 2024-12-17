import React, { ReactNode } from "react";
import Image from "next/image";

interface ICardEvent {
  eventTitle: string;
  eventImg: string;
  eventStartDate: string;
  eventOrganizerName: string;
  eventOrganizerProfile: string;
  eventPrice: string;
}

const EventCard: React.FC<ICardEvent> = ({
  eventTitle,
  eventImg,
  eventStartDate,
  eventPrice,
  eventOrganizerName,
  eventOrganizerProfile,
}) => {
  return (
    <div className="flex flex-col justify-between border-none shadow-lg rounded-lg bg-white max-w-xs">
      <img src={eventImg} className="rounded-tr-lg rounded-tl-lg h-36" />
      <div className="py-3 px-5 md:py-4 ">
        <h1 className="text-lg font-extrabold">{eventTitle}</h1>
        <h1 className="text-sm font-medium text-gray-400">{eventStartDate}</h1>
        <h1 className="text-sm font-medium">{eventPrice}</h1>
      </div>
      <hr></hr>
      <div className="flex gap-3 items-center py-3 px-5 ">
        <img
          src={eventOrganizerProfile}
          className="rounded-full w-7 h-7 lg:w-9 lg:h-9"
        />
        <h1 className="text-sm font-bold">{eventOrganizerName}</h1>
      </div>
    </div>
  );
};

export default EventCard;
