import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
export async function getIdfromToken(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value || '';
        const tokenData = await jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;
        return tokenData.id;
    }
    catch (error: any) {
        throw new Error(error.message);
    }
}