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
    },
    vocabularys: {
        init: "/vocabularies",
        id: (id: string) => `/vocabularies/${id}` 
    },
    contact: {
        init: "/contact",
        id: (id: string) => `/contact/${id}` 
    },
    report: {
        init: "/report",
        id: (id: string) => `/report/${id}` 
    }
}
export default apiConstant;
