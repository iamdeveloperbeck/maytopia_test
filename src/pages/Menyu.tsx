import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import menu1 from "../assets/menuuz1.jpg";
import menu2 from "../assets/menuuz2.jpg";
import menu3 from "../assets/menuuz3.jpg";
import menu4 from "../assets/menuuz4.jpg";
import menu5 from "../assets/menuuz5.jpg";
import menu6 from "../assets/menuuz6.jpg";
import menu7 from "../assets/menuuz7.jpg";

const DISHES = [
  { id: 1, image: menu1 },
  { id: 2, image: menu2 },
  { id: 3, image: menu3 },
  { id: 4, image: menu4 },
  { id: 5, image: menu5 },
  { id: 6, image: menu6 },
  { id: 7, image: menu7 },
];

export default function Dishes() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openModal = (index: number) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Asosiy swiper (rasmlar) */}
      <section className="w-full py-8">
        <h1 className="text-center font-bold text-[32px] mb-3">Menu</h1>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={16}
          slidesPerView={1.2}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.2 },
          }}
          className="pb-10"
        >
          {DISHES.map(({ id, image }, index) => (
            <SwiperSlide key={id}>
              <button
                type="button"
                onClick={() => openModal(index)}
                className="w-full h-full block focus:outline-none"
              >
                <img
                  src={image}
                  alt="dish"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Popup (lightbox) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={closeModal}
        >
          {/* Ichki wrapper (click bubbleni to'xtatish uchun) */}
          <div
            className="relative w-full max-w-5xl px-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Yopish tugmasi */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute -top-10 right-2 text-white text-2xl md:text-3xl"
              aria-label="Close"
            >
              ×
            </button>

            <Swiper
              modules={[Navigation, Pagination, Keyboard]}
              spaceBetween={16}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              keyboard={{ enabled: true }}
              initialSlide={activeIndex}
              onSlideChange={(swiper: SwiperType) =>
                setActiveIndex(swiper.activeIndex)
              }
            >
              {DISHES.map(({ id, image }) => (
                <SwiperSlide key={id}>
                  <div className="w-full max-h-[80vh] flex items-center justify-center">
                    <img
                      src={image}
                      alt="dish big"
                      className="max-h-[80vh] w-auto object-contain rounded-2xl"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
}
