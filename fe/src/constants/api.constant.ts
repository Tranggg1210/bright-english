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
    },
    topics: {
        init: "/topics",
        id: (id: string) => `/topics/${id}`
    },
    vocabularys: {
        init: "/vocabularies",
        id: (id: string) => `/vocabularies/${id}`
    },
    contact: "/contact",
    studyTrackingTime: {
        post: "/study-trackingtime",
        id: (id: string) => `/study-trackingtime/${id}`

    }
}
export default apiConstant;
