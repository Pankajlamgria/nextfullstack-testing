import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        console.log(reqBody);
        const { email, username, password } = reqBody;
        const userFind = await User.findOne({ email });
        if (userFind) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            email,
            username,
            password: hashedPassword
        })
        const savedUser = await newUser.save();
        console.log("user Details:", savedUser);
        return NextResponse.json({ message: 'User created successfully', success: true, savedUser });
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message, success: false });
    }
}