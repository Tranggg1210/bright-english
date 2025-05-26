const apiConstant = {
    auth: {
        login: "/auth/login",
        getMe: "/auth/me",
        loginWithGG: "/auth/login-google",
        register: "/auth/register",
        forgotPassword: "/auth/forgot-password",
        vetifyOTP: "/auth/verify-otp",
        resetPassword: "/auth/reset-password"
    },
    users: {
        init: "/users",
        id: (id: string) => `/users/${id}`,
        progress: (id: string) => `/users/progress/${id}`,
        changeInfor: `/auth/change-profile`,
        changePassword: `/auth/change-password`
    },
    topics: {
        init: "/topics",
        id: (id: string) => `/topics/${id}`
    },
    vocabularys: {
        init: "/vocabularies",
        id: (id: string) => `/vocabularies/${id}`
    },
    userVocabulary: {
        topicId: (id: string) => `/user-vocabularies/status/${id}`,
        reset: (id: string) => `/user-vocabularies/reset-learned/${id}`,
        init: "/user-vocabularies"
    },
    contact: "/contact",
    studyTrackingTime: {
        init: "/study-trackingtime",
    },
    grammar: {
        init: "/grammar",
        id: (id: string) => `/grammar/${id}`
    },
    report: {
        init: "/report",
    },
    exercises: {
        init: "/exercises",
        id: (id: string) => `/exercises/${id}`,
        seachByTopicId: (id: string) => `/exercises/topic/${id}`
    },
    logs: {
        init: "/logs",
        id: (id: string) => `/logs/${id}`,
        exerId: (id: string) => `/logs/exercise/${id}`,
    },
}
export default apiConstant;
