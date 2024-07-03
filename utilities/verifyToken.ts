import { jwtVerify } from "jose";

const SECRET_KEY = "learning";

export const getJwtSecretKey = () => {
  const secret = SECRET_KEY;
  if (!secret || secret.length === 0) {
    throw new Error("The environment variable JWT_SECRET is not set.");
  }
  return secret;
};

export async function verifyJwtToken(token: string) {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey())
    );
    return verified.payload; // Return the entire payload from the token
  } catch (error) {
    throw new Error("Your token is expired");
  }
}

export async function getUserIdFromToken(token: string) {
  try {
    const payload = await verifyJwtToken(token);
    console.log(payload)
    return payload.id; // Assuming userid is a field in your JWT payload
  } catch (error) {
    throw new Error("Failed to get user ID from token");
  }
}
