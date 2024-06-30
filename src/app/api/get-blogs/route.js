import connectToDB from "@/database";
import BlogModel from "@/models/Blog";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDB();

        const allBlogs = await BlogModel.find();
        if (allBlogs) {
            return NextResponse.json({
                success: true,
                message: 'All blogs fetched successfully! :)',
                data: allBlogs
            }, { status: 200 });
        }
        else {
            return NextResponse.json({
                success: false,
                message: 'Something went wrong while adding a blog! :('
            }, { status: 500 });
        }
    }
    catch (err) {
        console.log(err);
        return NextResponse.json({
            success: false,
            message: 'Something went wrong while adding a blog! :('
        }, { status: 500 });
    }
}
