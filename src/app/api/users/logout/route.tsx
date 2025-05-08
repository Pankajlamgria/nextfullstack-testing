import { NextResponse, NextRequest } from "next/server";
export async function GET() {
    try {
        console.log("Entered");
        const response = NextResponse.json({ message: "logout successfull", success: true });
        // response.cookies.delete('token');
        response.cookies.set('token', '', {
            httpOnly: true, expires: new Date(0)
        });
        return response;
    }
    catch (error: any) {
        return NextResponse.json({ error: error, success: false });
    }
}