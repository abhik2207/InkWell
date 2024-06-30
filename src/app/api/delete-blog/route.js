import connectToDB from "@/database";
import BlogModel from "@/models/Blog";
import { NextResponse } from "next/server";

export async function DELETE(req) {
    try {
        await connectToDB();

        const { searchParams } = new URL(req.url);
        const getCurrentBlogID = searchParams.get('id');

        if (!getCurrentBlogID) {
            return NextResponse.json({
                success: false,
                message: 'Blog ID is required! :('
            }, { status: 400 });
        }

        const deletedBlog = await BlogModel.findByIdAndDelete(getCurrentBlogID);

        if (deletedBlog) {
            return NextResponse.json({
                success: true,
                message: 'Blog deleted successfully! :)'
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
