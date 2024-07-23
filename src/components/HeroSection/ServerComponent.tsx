import Image from "next/image"

export const heading1 = (
    <>
        <h1 className="font-heading mb-6">Explore Our Exquisite Hotel</h1>
        <p className="text-[#4a4a4a] dark:text-[#ffffff] mb-12 max-w-lg">
            Experience an Exquisite Hotel Immersed in Rich History and Timeless Elegance.
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