import Image from "next/image"

export const heading1 = (
    <>
        <h1 className="font-heading mb-6">Explore Our Exquisite Hotel</h1>
        <p className="text-[#4a4a4a] dark:text-[#ffffff] mb-12 max-w-lg">
        {`At our hotel management site, we understand that every traveler has unique needs and preferences. \
        That is why we offer a diverse selection of hotels, each tailored to different styles and requirements. \
        Whether you are in search of sleek, modern accommodations equipped with the latest technology, luxurious retreats rich with opulent amenities, \
        or cozy spots that blend comfort with charm, we have the perfect place for you. \
        Our modern hotels are ideal for tech-savvy travelers and business professionals, featuring state-of-the-art facilities, smart rooms, \
        and high-speed internet to ensure productivity and convenience. For those seeking a touch of luxury, our exquisite hotels offer a sanctuary of sophistication \
        and service, with sumptuous bedding, spa-like bathrooms, and gourmet dining options. \
        No matter your destination, we are here to help you find a hotel that truly fits your needs. From bustling city centers to quiet retreats, \
        each property is chosen to enhance your stay and enrich your travel experience. Discover your perfect hotel with us and make your next journey unforgettable.`}
        </p>
        <button className="btn-primary">Get Started</button>
    </>
);

export const section2 = (
    <>
        <div className="md:grid hidden gap-8 grid-cols-1">
                <div className="rounded-2xl overflow-hidden h-48">
                    <Image src="/images/Basic-Room-compressed.jpg" alt="Basic-Room" width={300} height={300} 
                    className="img scale-animation" />
                </div>
                <div className="rounded-2xl overflow-hidden">
                    <Image src="/images/Luxury-Room-compressed.jpg" alt="Luxury-Room" width={300} height={300} 
                    className="img scale-animation" />
                </div>
                <div className="rounded-2xl overflow-hidden">
                    <Image src="/images/Suite-compressed.jpg" alt="Suite" width={300} height={300} 
                    className="img scale-animation" />
                </div>
            </div>
    </>
);