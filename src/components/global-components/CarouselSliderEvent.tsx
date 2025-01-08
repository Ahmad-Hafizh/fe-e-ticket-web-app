import { ReactNode } from 'react';

interface ICarouselEvent {
  children: ReactNode;
}

export const carouselEventSlider: React.FC<ICarouselEvent> = ({ children }) => {
  return <div className="Pembungkus carousel">{children}</div>;
};
