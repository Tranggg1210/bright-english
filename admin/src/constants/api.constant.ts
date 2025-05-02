const apiConstant = {
    auth: {
        login: "/auth/login",
        getMe: "/auth/me"
    },
    users: {
        init: "/users",
        id: (id: string) => `/users/${id}`  
    },
    topics: {
        init: "/topics",
        id: (id: string) => `/topics/${id}` 
    }
}
export default apiConstant;
