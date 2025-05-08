import { connect } from "@/dbConfig/dbConfig"
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

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
            return NextResponse.json({ message: "Login succesfully", success: true, userFind });
        }
        else {
            return NextResponse.json({ error: "mail , password not matched", success: false })
        }

    }
    catch (error) {
        return NextResponse.json({ error: "Error Occured in logIn backend", succes: 'false' });
    }
}

