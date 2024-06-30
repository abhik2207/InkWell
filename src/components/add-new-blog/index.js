"use client"

import { Fragment, useState } from "react";
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddNewBlog({ openBlogDialog, setOpenBlogDialog, loading, blogFormData, setBlogFormData, handleSaveBlogData, currentEditedBlogId, setCurrentEditedBlogId }) {
    return (
        <Fragment>
            <div>
                <Button onClick={() => setOpenBlogDialog(true)}>Add a new blog</Button>
            </div>

            <Dialog open={openBlogDialog} onOpenChange={() => {
                setBlogFormData({ title: '', description: '', author: '' });
                setCurrentEditedBlogId(null);
                setOpenBlogDialog(false);
            }}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{currentEditedBlogId ? 'Edit blog' : 'Add blog'}</DialogTitle>
                        <DialogDescription>
                            {currentEditedBlogId ? '' : "Create a new blog! Provide an appropriate title, description and author's name."}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                value={blogFormData.title}
                                onChange={(e) => setBlogFormData({ ...blogFormData, title: e.target.value })}
                                placeholder="Title here"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Input
                                id="description"
                                name="description"
                                value={blogFormData.description}
                                onChange={(e) => setBlogFormData({ ...blogFormData, description: e.target.value })}
                                placeholder="Description here"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="author" className="text-right">
                                Author
                            </Label>
                            <Input
                                id="author"
                                name="author"
                                value={blogFormData.author}
                                onChange={(e) => setBlogFormData({ ...blogFormData, author: e.target.value })}
                                placeholder="Author here"
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleSaveBlogData} type="button">{loading ? 'Saving...' : 'Submit'}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}
