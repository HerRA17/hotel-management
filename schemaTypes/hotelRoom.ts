import { defineField } from "sanity";

const roomTypes = [
    { title: "Basic", value: "basic" },
    { title: "Luxury", value: "luxury" },
    { title: "Suite", value: "suite" },
];

const hotelRoom = {
    name: "hotelRoom",
    title: "Hotel Room",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "title",
            type: "string",
            validation: Rule => Rule.required().max(50).error("Maximum 50 characters"),
        }),
        defineField({
            name: "slug",
            type: "slug",
            options: {
                source: "name"
            },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "description",
            title: "description",
            type: "text",
            validation: Rule => Rule.required().min(100).error("Minimum 100 characters") 
        }),
        defineField({
            name: "price",
            title: "Price",
            type: "number",
            validation: Rule => Rule.required().min(100) 
        }),
        defineField({
            name: "discount",
            title: "Discount",
            type: "number",
            initialValue: 0,
            validation: Rule => Rule.required().min(0) 
        }),
        defineField({
            name: "images",
            title: "Images",
            type: "array",
            of: [
                { type: "object", 
                  fields: [
                    { name: "url", title: "URL", type: "url"},
                    { name: "file", title: "File", type: "file" },
                  ],
                },
            ],
            validation: Rule => Rule.required().min(3).error("Minimum of 3 images required")
        }),
        defineField({
            name: "coverImage",
            title: "Cover Image",
            type: "object",
            fields : [
                { name: "url", title:"URL", type: "url"},
                { name: "file", title:"File", type: "file"},
            ],
            validation: Rule => Rule.required().error("Cover Image is required")
        }),
        defineField({
            name: "type",
            title: "Room Type",
            type: "string",
            options: {
                list: roomTypes,
            },
            validation: Rule => Rule.required(),
            initialValue: "basic"
        }),
        defineField({
            name: "specialNote",
            title: "Special Note",
            type: "text",
            validation: Rule => Rule.required(),
            initialValue: 
            "Check-in time is 12:00 pm, checkout time is before 12:00 pm. If you forget or leave any items behind please contact the Reception."
        }),
        defineField({
            name: "dimension",
            title: "Dimension",
            type: "string"
        }),
        defineField({
            name: "numberOfBeds",
            title: "number of Beds",
            type: "number",
            validation: Rule => Rule.min(1),
            initialValue: 1
        }),
        defineField({
            name: "offeredAmenities",
            title: "Offered Amenities",
            type: "array",
            of : [
                { type: "object", 
                  fields: [ 
                    { name: "icon", title: "Icon", type: "string" },
                    { name: "amenity", title: "Amenity", type: "string" }
                  ],
                },
            ],
        }),
        defineField({
            name: "isBooked",
            title: "Is Booked?",
            type:"boolean",
            initialValue: false
        }),
        defineField({
            name: "isFeatured",
            title: "Is Featured?",
            type:"boolean",
            initialValue: false
        }),
        defineField({
            name: "reviews",
            title: "Reviews",
            type:"array",
            of: [{ type: "review"}]
        }),
    ],
};

export default hotelRoom;