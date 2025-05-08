import { NextRequest, NextResponse } from "next/server";
import { getIdfromToken } from "@/helpers/getIdfromToken";
import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel";
connect();
export async function GET(request: NextRequest) {
    try {
        const userId = await getIdfromToken(request);
        const data = await User.findOne({ _id: userId }).select('-password');
        return NextResponse.json({ message: "user data returned successfully", success: true, data });
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message, success: false });
    }
}