type LocalStorageType = "access-token";

const isBrowser = typeof window !== "undefined";

const LocalStorage = {
    getLocalStorage: <T = any>(key: LocalStorageType, defaultValue: T = [] as any) => {
        if (!isBrowser) return defaultValue;

        try {
            const value = localStorage.getItem(key);
            if (value && value !== "undefined" && value !== "null") {
                return JSON.parse(value) as T;
            }
        } catch (error) {
            console.error(error);
        }

        return defaultValue;
    },

    setLocalStorage: (key: LocalStorageType, value: any) => {
        if (!isBrowser) return;
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(error);
        }
    },

    removeLocalStorage: (key?: LocalStorageType, all = false, listKey?: LocalStorageType[]) => {
        if (!isBrowser) return;

        if (all) {
            localStorage.clear();
            return;
        }

        if (listKey?.length) {
            listKey.forEach((item) => localStorage.removeItem(item));
            return;
        }

        if (key) {
            localStorage.removeItem(key);
        }
    }
};

export default LocalStorage;
