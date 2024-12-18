'use client';
import EventCard from '@/components/global-components/EventCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const EventCarousel = () => {
  const images = [
    {
      url: '/xample.jpg',
    },
    {
      url: '/xample.jpg',
    },
    {
      url: '/xample.jpg',
    },
    {
      url: '/xample.jpg',
    },
    {
      url: '/xample.jpg',
    },
  ];

  return (
    <div className="w-full ">
      <Carousel className="w-full relative">
        <CarouselContent>
          {images.map((e, index) => (
            <CarouselItem key={index} className="basis-1/4">
              <EventCard eventImg={e.url} eventOrganizerName="Organizer" eventPrice="Rp.10.000" eventOrganizerProfile={e.url} eventStartDate="18-12-2024" eventTitle="judul" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="opacity-0 hover:opacity-100 w-full h-full absolute top-0 transition-opacity">
          <CarouselPrevious className="left-3" />
          <CarouselNext className="right-3" />
        </div>
      </Carousel>
    </div>
  );
  //Carousel Event Pilihan (Picked for you)
  //Carousel Category
};
export default EventCarousel;
