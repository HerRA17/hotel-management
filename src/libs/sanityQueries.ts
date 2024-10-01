import { groq } from "next-sanity";


export const getFeaturedRoomQuery = groq`*[_type == "hotelRoom" && isFeatured == true][0] {
_id, description, discount, images, isFeatured, name, price, slug, coverImage}`;

export const getRoomsQuery = groq`*[_type == "hotelRoom"] {
_id, coverImage, description, dimension, discount, isBooked, isFeatured, name, price, slug, type}`;

export const getRoom = groq`*[_type == "hotelRoom" && slug.current == $slug][0] {
    _id, coverImage, description, dimension, discount, images, isBooked, isFeatured,
    name, numberOfBeds, offeredAmenities, price, slug, specialNote, type}`;

export const getUserBookingsQuery = groq `*[_type == "booking" && user._ref == $userId] {
    _id, adults, children, checkInDate, checkOutDate, discount, hotelRoom -> { _id, name, price, slug }, numberOfDays,
    totalPrice}`;

export const getUserDataQuery = groq `*[_type == "user" && _id == $userId][0] {
    _id, about, email, image, isAdmin, name, _createdAt}`;

export const getRoomReviewsQuery = groq `*[_type == "review" && hotelRoom._ref == $roomId] {
    _id, text, user -> {name}, userRating, _createdAt}`;