interface ICarouselJumbotron {
  children: string;
}

const carouselJumbotron: React.FC<ICarouselJumbotron> = ({ children }) => {
  return <div className="Pembungkus Carousel Jumbotron">{children}</div>;
};
