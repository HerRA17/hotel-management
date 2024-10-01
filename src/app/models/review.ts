export type UpdateReviewDto = {
    reviewId: string;
    reviewText: string;
    userRating: number;
};

export type CreateReviewDto = {
    hotelRoomId: string;
    reviewText: string;
    userId: string;
    userRating: number;
};

export type Review = {
    _createdAt: Date;
    _id: string;
    text: string;
    user: { name: string };
    userRating: number;
};