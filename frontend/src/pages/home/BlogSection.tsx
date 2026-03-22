import { useEffect, useState } from "react";
import { apiGet } from "../../service/api";

interface Blog {
  id: number;
  title: string;
  cover_url: string;
  created_at: string;
}

export default function BlogSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    apiGet<Blog[]>("/blogs").then(setBlogs);
  }, []);

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Blog</h2>
        <a href="/blogs" className="text-blue-600 text-sm">
          See all
        </a>
      </div>

      <div className="space-y-4">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="flex gap-4 bg-white rounded-xl p-4 shadow"
          >
            <img
              src={blog.cover_url}
              className="w-28 h-20 object-cover rounded-lg"
              alt={blog.title}
            />
            <div>
              <h3 className="font-semibold">{blog.title}</h3>
              <p className="text-sm text-gray-500">
                {new Date(blog.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
