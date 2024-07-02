import { jwtVerify } from "jose";
    const SECRET_KEY = "learning";
    export const getJwtSecretKey = () => {
    const secret = SECRET_KEY;
    if (!secret || secret.length === 0) {
        throw new Error("The environment variable JWT_SECRET is not set.");
    }
    return secret;
    };
    export async function verifyJwtToken(token:string) {
    try {
        const verified = await jwtVerify(
            token,
            new TextEncoder().encode(getJwtSecretKey())
        );
        return verified.payload;
    } catch (error) {
        throw new Error("Your token is expired");
    }
    }