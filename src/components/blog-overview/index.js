"use client"

import { useEffect, useState } from 'react';
import AddNewBlog from '../add-new-blog';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

function BlogOverview({ allBlogs }) {
    const [openBlogDialog, setOpenBlogDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [blogFormData, setBlogFormData] = useState({ title: '', description: '', author: '' });
    const [currentEditedBlogId, setCurrentEditedBlogId] = useState(null);

    const router = useRouter();

    const handleSaveBlogData = async () => {
        try {
            setLoading(true);
            const apiResponse = currentEditedBlogId !== null
                ? await fetch(`/api/update-blog?id=${currentEditedBlogId}`, {
                    method: 'PUT',
                    body: JSON.stringify(blogFormData),
                    headers: { 'Content-Type': 'application/json' }
                })
                : await fetch('/api/add-blog', {
                    method: 'POST',
                    body: JSON.stringify(blogFormData),
                    headers: { 'Content-Type': 'application/json' }
                });
            const data = await apiResponse.json();

            if (data?.success) {
                setBlogFormData({ title: '', description: '', author: '' });
                setLoading(false);
                setOpenBlogDialog(false);
                setCurrentEditedBlogId(null);
                router.refresh();
            }
        }
        catch (err) {
            console.log(err);
            setLoading(false);
            setBlogFormData({ title: '', description: '', author: '' });
        }
    }

    const handleDeleteBlog = async (blogId) => {
        try {
            const apiResponse = await fetch(`/api/delete-blog?id=${blogId}`, {
                method: 'DELETE'
            });
            const data = await apiResponse.json();

            if (data?.success) {
                router.refresh();
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleEditBlog = async (blog) => {
        setCurrentEditedBlogId(blog._id);
        setBlogFormData({
            title: blog.title,
            author: blog.author,
            description: blog.description,
        });
        setOpenBlogDialog(true);
    }

    console.log(currentEditedBlogId);

    useEffect(() => {
        router.refresh();
    }, []);

    return (
        <div className="min-h-screen flex flex-col gap-10 p-12 bg-gradient-to-br from-purple-700 to-blue-700">
            <AddNewBlog openBlogDialog={openBlogDialog} setOpenBlogDialog={setOpenBlogDialog}
                loading={loading} handleSaveBlogData={handleSaveBlogData} currentEditedBlogId={currentEditedBlogId}
                blogFormData={blogFormData} setBlogFormData={setBlogFormData} setCurrentEditedBlogId={setCurrentEditedBlogId} />

            <h1 className='text-4xl font-semibold -mb-4 tracking-tight text-white'>Our blogs!</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    allBlogs && allBlogs.length > 0 ? (
                        allBlogs.map((blog) => (
                            <div className='p-6 rounded-lg shadow-xl bg-white flex flex-col'>
                                <div className='text-3xl font-semibold mb-4'>{blog?.title}</div>
                                <div className='text-lg leading-5 font-normal flex-1'>{blog?.description}</div>
                                <div className='flex items-end justify-end font-semibold pt-6'>~ {blog?.author}</div>
                                <div className="flex items-center justify-end gap-5 border-t-2 border-zinc-200 mt-6 pt-3">
                                    <Button variant="secondary" className='border-2 shadow-lg'
                                        onClick={() => handleEditBlog(blog)}>Edit</Button>
                                    <Button variant="destructive" className='shadow-lg'
                                        onClick={() => handleDeleteBlog(blog._id)}>Delete</Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='text-lg text-white font-semibold'>No blogs found!</p>
                    )
                }
            </div>
        </div>
    )
}

export default BlogOverview;
