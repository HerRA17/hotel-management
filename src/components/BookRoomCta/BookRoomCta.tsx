"use client"

import { FC } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
    adults: number;
    setAdults: Dispatch<SetStateAction<Date | null>>;
    amountChildren: number;
    setAmountChildren: Dispatch<SetStateAction<Date | null>>;
    checkInDate: Date | null;
    setCheckInDate: Dispatch<SetStateAction<Date | null>>;
    checkOutDate: Date | null;
    setCheckOutDate: Dispatch<SetStateAction<Date | null>>;
    calcMinCheckOutDate: () => Date | null;
    discount: number;
    specialNote: string;
    price: number;
    isBooked: boolean;
    handleBookNowClick: () => void;
}

const BookRoomCta: FC<Props> = (props) => {
    const { 
        adults, amountChildren, checkInDate, checkOutDate, discount, isBooked, specialNote, setAdults,
        setAmountChildren, setCheckInDate, setCheckOutDate, price, calcMinCheckOutDate } = props;

    const discountPrice = price - (price / 100) * discount;

    const calcAmountChildren = () => {
        if(!checkInDate || !checkOutDate) return 0;
        const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
        const numOfDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
        return numOfDays;
    };
    // calcNoOfDays
    return (
        <div className="px-7 py-6">
            <h3>
                <span className={`${discount ? 'text-gray-400' : ''} font-bold text-xl`}>
                    ${price}
                </span>
                {discount ? (
                    <span className="font-bold text-xl">
                        {''}| discount {discount}%. Now <span className="text-tertiary-dark">$ {discountPrice}</span>
                    </span>
                    ) : (
                        '' )}
            </h3>
            <div className="w-full border-b-2 border-b-secondary my-2"/>
            <h4 className="my-8">{specialNote}</h4>
            <div className="flex">
                <div className="w-1/2 pr-2">
                    <label htmlFor="check-in-date" className="block text-sm font-medium text-gray-900 dark:text-gray-400">
                        Check In Date
                    </label>
                    <DatePicker 
                    selected={checkInDate} 
                    onChange={date => setCheckInDate(date)} 
                    dateFormat="dd/MM/yyyy" 
                    minDate={new Date()}
                    id="check-in-date"
                    className="w-full border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary border-primary" />
                </div>
                <div className="w-1/2 pr-2">
                    <label htmlFor="check-out-date" className="block text-sm font-medium text-gray-900 dark:text-gray-400">
                        Check Out Date
                    </label>
                    <DatePicker 
                    selected={checkOutDate} 
                    onChange={date => setCheckOutDate(date)} 
                    dateFormat="dd/MM/yyyy"
                    disabled={!checkInDate} 
                    minDate={calcMinCheckOutDate()}
                    id="check-out-date"
                    className="w-full border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary border-primary" />
                </div>
            </div>
            <div className="flex mt-4">
                <div className="w-1/2 pr-2">
                    <label htmlFor="adults" 
                    className="block text-sm font-medium text-gray-900 dark:text-gray-400">
                        Adults
                    </label>
                    <input type="number" id="adults" value={adults} onChange={e => setAdults(e.target.value)}
                    min={1}
                    max={5}
                    className="w-full border border-gray-300 rounded-lg p-2.5" />
                </div>
                <div className="w-1/2 pr-2">    
                    <label htmlFor="children" 
                    className="block text-sm font-medium text-gray-900 dark:text-gray-400">
                        Children
                    </label>
                    <input type="number" id="adults" value={amountChildren} onChange={e => setAmountChildren(e.target.value)}
                    min={0}
                    max={4}
                    className="w-full border border-gray-300 rounded-lg p-2.5" />
                </div>
                {calcNumOfDays() > 0 ? ( 
                    <p className="mt-3">Total Price: $ {calcNumOfDays() * discountPrice}</p> 
                 ) : ( <></> )};
                 <button disabled={isBooked}
                 onClick={handleBookNowClick} 
                 className="btn-rpimary w-full mt-6 disabled:br-gray-500 disabled:cursor">
                    {isBooked ? "Booked" : "Book now"}
                 </button>
            </div>
        </div>
    )
};

export default BookRoomCta;