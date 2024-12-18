import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { NextResponse } from "next/server";
import { createReview, checkReviewExists, getUserData, updateReview } from "@/libs/apis";

export async function GET(req: Request, res: Response) {
    const session = await getServerSession(authOptions)
    
    if(!session) {
        new NextResponse("Authentication Required", { status: 500});
    }

    const userId = session?.user?.id;
    try {
        const data = await getUserData(userId);
        return NextResponse.json(data, { status: 200, statusText: "Successful"}) 
    } catch (error) {
        return new NextResponse("Unable to fetch", { status: 400 })
    }
};

export async function POST(req: Request, res: Response) {
    const session = await getServerSession(authOptions)
    
    if(!session) {
        new NextResponse("Authentication Required", { status: 500});
    }
    
    const { roomId, reviewText, ratingValue } = await req.json();

    if(!roomId || !reviewText || !ratingValue) {
        new NextResponse("All fields are Required", { status: 400});
    }
    const userId = session?.user?.id

    try{
        const alreadyExists = await checkReviewExists(userId, roomId);
        
        let data;

        if (alreadyExists) {
            data = await updateReview({
                reviewId: alreadyExists._id, reviewText, userRating: ratingValue
            });
        } else {
            data = await createReview({
                hotelRoomId: roomId, reviewText, userId, userRating: ratingValue
            });
        }
        return NextResponse.json(data, {status: 200, statusText: "Succesful"});
    } catch (error: any) {
        console.log("Error updating", error)
        return new NextResponse("Unable to create review", {status: 400})
    }
};