import connectToDB from "@/database";
import BlogModel from "@/models/Blog";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewBlog = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    author: Joi.string().required()
});

export async function POST(req) {
    try {
        await connectToDB();

        const extractedBlogData = await req.json();
        const { title, description, author } = extractedBlogData;

        const { error } = AddNewBlog.validate({
            title, description, author
        });

        if (error) {
            return NextResponse.json({
                success: false,
                message: error.details[0].message
            }, { status: 400 });
        }

        const createdBlog = await BlogModel.create(extractedBlogData);

        if (createdBlog) {
            return NextResponse.json({
                success: true,
                message: 'Blog added successfully! :)'
            }, { status: 201 });
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

