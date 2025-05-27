type SessionType = "list-flashcard" | "word-count" | "list-exercise";

const isBrowser = typeof window !== "undefined";

const Session = {
    getSession: <T = any>(key: SessionType, defaultValue: T = [] as any) => {
        if (!isBrowser) return defaultValue;

        try {
            const value = sessionStorage.getItem(key);
            if (value && value !== "undefined" && value !== "null") {
                return JSON.parse(value) as T;
            }
        } catch (error) {
            console.error(error);
        }

        return defaultValue;
    },

    setSession: (key: SessionType, value: any) => {
        if (!isBrowser) return;
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(error);
        }
    },

    removeSession: (key?: SessionType, all = false, listKey?: SessionType[]) => {
        if (!isBrowser) return;

        if (all) {
            sessionStorage.clear();
            return;
        }

        if (listKey?.length) {
            listKey.forEach((item) => sessionStorage.removeItem(item));
            return;
        }

        if (key) {
            sessionStorage.removeItem(key);
        }
    }
};

export default Session;
