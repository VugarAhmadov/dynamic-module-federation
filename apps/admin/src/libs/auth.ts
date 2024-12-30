import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.AUTH_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

// export async function logout() {
//   // Destroy the session
//   cookies().set("session", "", { expires: new Date(0) });
// }

export async function getSession() {
  const cookiesAwait = await cookies();
  const session = cookiesAwait.get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}
