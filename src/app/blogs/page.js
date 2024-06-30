import BlogOverview from "@/components/blog-overview";

export default async function Blogs() {
    const fetchAllBlogs = async () => {
        try {
            const apiResponse = await fetch('http://localhost:3000/api/get-blogs', {
                method: 'GET',
                cache: 'no-store'
            });
            const result = await apiResponse.json();

            return result?.data;
        }
        catch (err) {
            console.log(err);
        }
    }

    const allBlogs = await fetchAllBlogs();

    return (
        <BlogOverview allBlogs={allBlogs} />
    )
}
