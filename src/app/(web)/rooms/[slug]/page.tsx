"use client"

import { getRoom } from "@/libs/apis";
import useSWR from "swr";
import LoadingSpiner from "../../loading";
import HotelGallery from "@/components/HotelGallery/HotelGallery";
import { MdOutlineCleaningServices } from "react-icons/md";
import {LiaFireExtinguisherSolid} from "react-icons/lia";
import {AiOutlineMedicineBox} from "react-icons/ai";
import {GiSmokeBomb} from "react-icons/gi";
import BookRoomCta from "@/components/BookRoomCta/BookRoomCta";
import { Children, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { getStripe } from "@/libs/stripe";
import RoomReview from "@/components/RoomReview/RoomReview";

const RoomDetails  = (props: {params: {slug: string}}) => {
    const {params: { slug }} = props;
    
    const [checkInDate, setCheckInDate] = useState<Date | null>(null);
    const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
    const [adults, setAdults] = useState(1);
    const [amountChildren, setAmountChildren] = useState(0);

    const fetchRoom = async () => getRoom(slug);
    
    const { data: room, error, isLoading } = useSWR(slug ? `/api/room${slug}`: null, fetchRoom);
    if(error) throw new Error("Can't fetch data");
    if(typeof room === "undefined" && !isLoading) throw new Error("Can't fetch data");

    if(!room) return <LoadingSpiner/>;
  
    const calcMinCheckOutDate = () => {
      if (checkInDate) {
        const nextDay = new Date(checkInDate);
        nextDay.setDate(nextDay.getDate() + 1);
        return nextDay;
      }
      return null;
    };

    const handleBookNowClick = async () => {
      if(!checkInDate || !checkOutDate) return toast.error("Please provide check in / check out");
      if(checkInDate > checkOutDate) return toast.error("Please provide check in / check out");
      
      const numberOfDays = calcNumOfDays(); 
      const hotelRoomSlug = room.slug.current;
      const stripe = await getStripe();

      try {
        const { data: stripeSession} = await axios.post("/api/stripe", {
          adults,
          checkInDate,
          checkOutDate,
          children: amountChildren,
          numberOfDays,
          hotelRoomSlug
        });
        
        if(stripe) {
          const result = await stripe.redirectToCheckout({
            sessionId: stripeSession.id
          });

        if(result.error) {
          toast.error("payment Failed");
        }
        }
      } catch (error){
        console.log("Error: ", error);
        toast.error("An error ocurred");
      }
      };

      const calcNumOfDays = () => {
        if (!checkInDate || !checkOutDate) return;
        const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
        const numOfDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
        return numOfDays;
      };

  return (
    <div> 
        <HotelGallery photos={room.images}/>
        <div className="container mx-auto mt-20">
          <div className="md:grid md:grid-cols-12 gap-10 px-3">
            <div className="md:col-span-8 w-full">
              <div>
                <h2 className="font-bold text-left text-lg md:text-2xl">
                  {room.name} ({room.dimesion})
                </h2>
                <div className="flex my-11">
                  {room.offeredAmenities.map(amenity => (
                    <div key={amenity._key} 
                    className="md:w-44 w-fit text-center px-2 md:px-o h-20 md:h-40 mr-3 bg-[#eff0f2] dark:bg-gray-800 rounded-lg grid place-content-center">
                      <i className={`fa-solid ${amenity.icon} md:text-2xl`}></i>
                      <p className="text-xs md:text-base pt-3">{amenity.amenity}</p>
                    </div>
                    ))}
                </div>
                <div className="mb-11">
                  <h2 className="font-bold text-3xl mb-2">Description</h2>
                  <p>{room.description}</p>
                </div>
                <div className="mb-11">
                  <h2 className="font-bold text-3xl mb-2">Offered Amenities</h2>
                  <div className="grid grid-cols-2">
                    {room.offeredAmenities.map(amenity => (
                      <div key={amenity._key} 
                      className="flex items-center md:my-0 my-1">
                        <i className={`fa-solid ${amenity.icon}`} ></i>
                        <p className="text-xs md:text-base ml-2">{amenity.amenity}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-11">
                  <h2 className="font-bold text-3xl mb-2">Safety & Hygiene</h2>
                  <div className="grid grid-cols-2">
                    <div className="flex items-center my-1 md:my-0">
                      <MdOutlineCleaningServices />
                      <p className="ml-2 md:text-base text-xs">Daily Cleaning</p>
                    </div>
                    <div className="flex items-center my-1 md:my-0">
                      <LiaFireExtinguisherSolid />
                      <p className="ml-2 md:text-base text-xs">Fire Extinguisher</p>
                    </div>
                    <div className="flex items-center my-1 md:my-0">
                      <AiOutlineMedicineBox />
                      <p className="ml-2 md:text-base text-xs">Disinfection and Sterilizations</p>
                    </div>
                    <div className="flex items-center my-1 md:my-0">
                      <GiSmokeBomb />
                      <p className="ml-2 md:text-base text-xs">Smoke Detector</p>
                    </div>
                  </div>
                </div>
                <div className="shadow dark:shadow-wite rounded-lg p-6">
                  <div className="items-center mb-4 ">
                    <p className="md:text-lg font-semibold">Customer Reviews</p>
                  </div>
                  <div className="grid griD-cols-1 md:grid-cols-2 gap-4">
                  <RoomReview roomId={room._id} />
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-4 rounded-xl shadow-lg dark:shadow shadow-white sticky top-10 h-fit overflow-auto">
              <BookRoomCta 
              adults={adults}
              discount={room.discount} 
              amountChildren={amountChildren}
              calcMinCheckOutDate={calcMinCheckOutDate}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              isBooked={room.isBooked}
              handleBookNowClick={handleBookNowClick}
              setAdults={setAdults}
              setAmountChildren={setAmountChildren}
              setCheckInDate={setCheckInDate}
              setCheckOutDate={setCheckOutDate}
              specialNote={room.specialNote}
              price={room.price} 
              />
            </div>
          </div>
          
        </div>
    </div>
  )
};

export default RoomDetails;