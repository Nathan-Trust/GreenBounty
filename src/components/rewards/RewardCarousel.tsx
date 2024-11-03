import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import carouselOne from "../../assets/rewards/carousel-one.svg";
import carouselTwo from "../../assets/rewards/carousel-two.svg";
import carouselThree from "../../assets/rewards/carousel-three.svg";

const RewardCarousel = () => {
  return (
    <div className="w-full col-span-12 rounded-lg overflow-hidden">
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          <CarouselItem
            className="h-72 w-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${carouselOne})` }}
          >
            <div className="absolute inset-0 bg-black opacity-50" />
          </CarouselItem>
          <CarouselItem
            className="h-72 w-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${carouselTwo})` }}
          >
            <div className="absolute inset-0 bg-black opacity-50" />
          </CarouselItem>
          <CarouselItem
            className="h-72 w-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${carouselThree})` }}
          >
            <div className="absolute inset-0 bg-black opacity-50" />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default RewardCarousel;
