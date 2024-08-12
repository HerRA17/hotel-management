"use client"

import { getRoom } from "@/libs/apis";
import useSWR from "swr";
import LoadingSpiner from "../../loading";
import HotelGallery from "@/components/HotelGallery/HotelGallery";

const RoomDetails  = (props: {params: {slug: string}}) => {
    const {params: { slug }} = props;
    
    const fetchRoom = async () => getRoom(slug);
    
    const { data: room, error, isLoading } = useSWR(slug ? `/api/room${slug}`: null, fetchRoom);
    if(error) throw new Error("Can't fetch data");
    if(typeof room === "undefined" && !isLoading) throw new Error("Can't fetch data");

    if(!room) return <LoadingSpiner/>;
  
  return (
    <div> 
        <HotelGallery photos={room.images}/>
    </div>
  )
};

export default RoomDetails;