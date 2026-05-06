const API_URL = `${import.meta.env.VITE_API_BASE}/api/admin/users`;
const UserService = {
    async getUsers() {
        const res = await fetch(API_URL, {
            credentials: "include",
        });
        if (!res.ok)
            throw new Error("Failed to fetch users");
        return res.json();
    },
    async getUser(id) {
        const res = await fetch(`${API_URL}/${id}`, {
            credentials: "include",
        });
        if (!res.ok)
            throw new Error("Failed to fetch user");
        return res.json();
    },
    async createUser(user) {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(user),
        });
        if (!res.ok)
            throw new Error("Create failed");
        return res.json();
    },
    async updateUser(id, user) {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(user),
        });
        if (!res.ok)
            throw new Error("Update failed");
        return res.json();
    },
    async deleteUser(id) {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            credentials: "include",
        });
        if (!res.ok)
            throw new Error("Delete failed");
        return res.json();
    },
};
export default UserService;
