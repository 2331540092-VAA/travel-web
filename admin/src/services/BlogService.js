const API_URL = `${import.meta.env.VITE_API_BASE}/api/admin/blogs`;
class BlogService {
    // Get all blogs
    async getBlogs() {
        const res = await fetch(API_URL);
        if (!res.ok) {
            throw new Error("Failed to fetch blogs");
        }
        return await res.json();
    }
    // Get single blog
    async getBlog(id) {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) {
            throw new Error("Failed to fetch blog");
        }
        return await res.json();
    }
    // Create blog
    async createBlog(blog) {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(blog),
        });
        if (!res.ok) {
            const errorText = await res.text();
            console.error("Create blog error:", errorText);
            throw new Error("Failed to create blog");
        }
        return await res.json();
    }
    // Update blog
    async updateBlog(id, blog) {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(blog),
        });
        if (!res.ok) {
            const errorText = await res.text();
            console.error("Update blog error:", errorText);
            throw new Error("Failed to update blog");
        }
        return await res.json();
    }
    // Delete blog
    async deleteBlog(id) {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });
        if (!res.ok) {
            const errorText = await res.text();
            console.error("Delete blog error:", errorText);
            throw new Error("Failed to delete blog");
        }
    }
}
export default new BlogService();
