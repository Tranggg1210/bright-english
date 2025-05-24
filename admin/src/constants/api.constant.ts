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
    },
    exercises: {
        init: "/exercises",
        id: (id: string) => `/exercises/${id}`,
        seachByTopicId: (id: string) => `/exercises/topic/${id}` 
    },
    upload: {
        init: "/cloudianry"
    },
    conversations: {
        init: "/conversations",
        id: (id: string) => `/conversations/${id}`,
        seachByTopicId: (id: string) => `/conversations/topic/${id}` 
    },
    grammars: {
        init: "/grammar",
        id: (id: string) => `/grammar/${id}` 
    }
}
export default apiConstant;
