import { connect } from "@/dbConfig/dbConfig"
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        const userFind = await User.findOne({ email });
        if (!userFind) {
            return NextResponse.json({ error: "User not found" });
        }
        const response = await bcrypt.compare(password, userFind.password);
        if (response) {
            const tokenData = {
                id: userFind._id,
                username: userFind.username,
                email: userFind.email
            }
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' });
            const responseResult = NextResponse.json({ message: "login successfull", success: true })
            responseResult.cookies.set("token", token, {
                httpOnly: true,
                path: "/",
            })
            return responseResult;
        }
        else {
            return NextResponse.json({ error: "mail , password not matched", success: false })
        }
    }
    catch (error) {
        return NextResponse.json({ error: "Error Occured in logIn backend", succes: 'false' });
    }
}

