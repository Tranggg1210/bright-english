type CookieStorageKey = "access-token" | "refresh-token"; 

const isBrowser = typeof window !== "undefined";

const cookieExpires = 30; 

const CookieStorage = {
    getCookie: <T = any>(key: CookieStorageKey, defaultValue: T = "" as any) => {
        if (!isBrowser) return defaultValue;

        try {
            const cookieValue = document.cookie
                .split('; ')
                .find(row => row.startsWith(key))
                ?.split('=')[1];

            if (cookieValue  && cookieValue !== 'undefined' && cookieValue !== 'null') {
                return JSON.parse(decodeURIComponent(cookieValue)) as T;
            }
        } catch (error) {
            console.error(error);
        }

        return defaultValue;
    },

    setCookie: (key: CookieStorageKey, value: any) => {
        if (!isBrowser) return;

        try {
            const expires = new Date();
            expires.setDate(expires.getDate() + cookieExpires);

            document.cookie = `${key}=${encodeURIComponent(JSON.stringify(value))}; expires=${expires.toUTCString()}; path=/`;
        } catch (error) {
            console.error(error);
        }
    },

    removeCookie: (key?: CookieStorageKey, all = false, listKey?: CookieStorageKey[]) => {
        if (!isBrowser) return;

        if (all) {
            const cookies = document.cookie.split("; ");
            cookies.forEach(cookie => {
                const cookieName = cookie.split("=")[0];
                document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
            });
            return;
        }

        if (key) {
            document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
        } else if (listKey?.length) {
            listKey.forEach((item) => {
                document.cookie = `${item}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
            });
        }
    }
};

export default CookieStorage;
