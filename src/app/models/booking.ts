export type Booking = {
    _id: string,
    adults: number; 
    children: number; 
    checkInDate: string;
    checkOutDate: string;
    discount: number;
    hotelRoom: { _id: string, name: string, price: number, slug: {current: string} }; 
    numberOfDays: number;
    totalPrice: number
};