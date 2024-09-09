import Stripe from "stripe";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { getRoom } from "@/libs/apis";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20",
});

type RequestData = {
    checkInDate: string;
    checkOutDate: string;
    adults: number;
    children: number;
    numberOfDays: number;
    hotelRoomSlug: string;
}

export async function POST(req: Request, res: Response) {
    const { adults, checkInDate, checkOutDate, children,
         hotelRoomSlug, numberOfDays } : RequestData = await req.json();
    if(!adults || !checkInDate || !checkOutDate || !hotelRoomSlug || !numberOfDays) {
        return new NextResponse("All fields are required", {status: 400})
    }
    const origin = req.headers.get("origin");
    const session = await getServerSession(authOptions);
    
    if (!session) {
        return new NextResponse("Authentication required", {status: 400})
    }

    const userId = session.user.id;
    const formattedCheckOutDate = checkOutDate.split("T")[0];
    const formattedCheckInDate = checkInDate.split("T")[0];

    try {
        const room  = await getRoom(hotelRoomSlug);
        const discountPrice = room.price - (room.price / 100) * room.discount;
        const totalPrice = discountPrice * numberOfDays;
        // create stripe payment
        const stripeSession = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: [
                {
                    quantity: 1,
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: room.name,
                            images: room.images.map(image=> image.url)
                        },
                        unit_amount: parseInt((totalPrice * 100).toString())
                    }
                }
            ],
            payment_method_types: ["card"],
            success_url: `${origin}/users/${userId}`,
            metadata: {
                adults, checkInDate: formattedCheckInDate, checkOutDate: formattedCheckOutDate,
                children, discount: room.discount, hotelRoom: room._id, 
                numberOfDays, totalPrice, user: userId,
            }
        });

        return NextResponse.json(stripeSession, {
            status: 200,
            statusText: "Payment session created"
        })
    } catch (error: any) {
        console.log("Payment failed", error);
        return new NextResponse(error, {status: 500})
    }
};