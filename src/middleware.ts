export {default} from "next-auth";

export const config = {
    matcher: ["/user/:path*"],
};