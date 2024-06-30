import connectToDB from "@/database";
import BlogModel from "@/models/Blog";
import Joi from "joi";
import { NextResponse } from "next/server";

const EditBlog = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    author: Joi.string().required()
});

export async function PUT(req) {
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

        const extractedBlogData = await req.json();
        const { title, description, author } = extractedBlogData;

        const { error } = EditBlog.validate({
            title, description, author
        });

        if (error) {
            return NextResponse.json({
                success: false,
                message: error.details[0].message
            }, { status: 400 });
        }

        const updatedBlog = await BlogModel.findOneAndUpdate({ _id: getCurrentBlogID }, {
            title, description, author
        }, { new: true });

        if (updatedBlog) {
            return NextResponse.json({
                success: true,
                message: 'Blog updated successfully! :)'
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