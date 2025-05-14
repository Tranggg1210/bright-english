const apiConstant = {
    auth: {
        login: "/auth/login",
        getMe: "/auth/me",
        loginWithGG: "/auth/login-google",
        register: "/auth/register",
    },
    users: {
        init: "/users",
        id: (id: string) => `/users/${id}`  
    },
    topics: {
        init: "/topics",
        id: (id: string) => `/topics/${id}` 
    },
    vocabularys: {
        init: "/vocabularies",
        id: (id: string) => `/vocabularies/${id}` 
    }
}
export default apiConstant;
