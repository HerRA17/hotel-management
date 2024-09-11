"use client"

import { getUserBookings } from "@/libs/apis";
import useSWR from "swr";
import axios from "axios";
import { User } from "@/app/models/user";

 const UserDetails = (props: {params: { id:string }}) => {
  
  const { params: {id: userId} } = props;

  const fetchUserBooking = async () => getUserBookings(userId);
  const fetchUserData = async () => {
  const { data } = await axios.get<User>("/api/users"); 
    return data;  
    }
  
  const {data: userBookings, error, isLoading} = useSWR("/api/userbooking", fetchUserBooking);

  const {data: userData, isLoading: loadingUserData, error: errorGettingUserData} = useSWR("/api/users", fetchUserData);
    
    if(error || errorGettingUserData) throw new Error("Can't fetch data");
    if(typeof userBookings === "undefined" && !isLoading) 
        throw new Error("Can't fetch data");
    console.log(userBookings)

  return (
    <div>UserDetails</div>
  )
};

export default UserDetails