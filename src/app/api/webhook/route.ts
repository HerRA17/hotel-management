import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createBooking, updateHotelRoom } from "@/libs/apis";

const checkout_session_completed = "checkout.session.completed";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20",
});

export async function POST (req: Request, res: Response) {
    const reqBody = await req.text();
    const sig = req.headers.get("stripe-signature")
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event : Stripe.Event;
    try {
        if(!sig || !webhookSecret) return;
        event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);
    } catch (error: any) {
        return new NextResponse(`Webhook error: ${error.message}`, {status: 500});
    }

    switch (event.type) {
        case checkout_session_completed:
            const session = event.data.object;
            
            const {
                metadata: {
                    adults, checkInDate, checkOutDate,
                    children, discount, hotelRoom, 
                    numberOfDays, totalPrice, user
                }
            } = session;
        
        await createBooking({
            adults: Number(adults), checkInDate, checkOutDate,
            children: Number(children), discount: (discount), hotelRoom, 
            numberOfDays: Number(numberOfDays), totalPrice: Number(totalPrice),
            user});

        await updateHotelRoom(hotelRoom);
        
        return NextResponse.json("Booking successful", {
                status: 200,
                statusText: "Event Successful"
            });

        default:
            console.log(`Unhandled event type ${event.type}`)
    }
    
    return NextResponse.json("Event Received", {
        status: 200,
        statusText: "Event Received"
    });
};
