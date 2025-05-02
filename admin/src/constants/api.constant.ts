const apiConstant = {
    auth: {
        login: "/auth/login",
        getMe: "/auth/me"
    },
    users: {
        init: "/users",
        id: (id: string) => `/users/${id}`  
    }
}
export default apiConstant;
