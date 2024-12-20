import React, { ReactNode } from "react";
import Image from "next/image";

interface ICardEvent {
  title: string;
  pict: string;
}

const SquareRoundedCard: React.FC<ICardEvent> = ({ title, pict }) => {
  return (
    <div className="flex flex-col justify-between items-center gap-3 border-none max-w-xs">
      <img
        src={pict}
        className="rounded-xl h-20 w-20 md:h-28 md:w-28 lg:h-36 lg:w-36 shadow-lg"
      />
      <h1 className="text-sm md:text-lg font-bold">{title}</h1>
    </div>
  );
};

export default SquareRoundedCard;
