import { defineField } from "sanity";

const account = {
    name: "account",
    title: "account",
    type: "document",
    fields: [
        defineField({
            name: "providerType",
            type: "string"
        }),
        defineField({
            name: "providerID",
            type: "string"
        }),
        defineField({
            name: "providerAccount",
            type: "string"
        }),
        defineField({
            name: "refreshToken",
            type: "string"
        }),
        defineField({
            name: "accessToken",
            type: "string"
        }),
        defineField({
            name: "accessTokenExpires",
            type: "number"
        }),
        defineField({
            name:"user",
            title: "user",
            type:"reference",
            to: { type: "user" }
        })
    ]
}

export default account;