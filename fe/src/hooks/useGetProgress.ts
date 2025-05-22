import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./useHookReducers";
import { getProgressUser } from "@src/services/users";

const useGetProgress = () => {
    const dispatch = useAppDispatch();
    const { userInfor }: any = useAppSelector(state => state.auth);
    const [progress, setProgress] = useState(null);

    const loaderProgressByUserId = async () => {
        if (!userInfor?._id) return;

        try {
            const res = await dispatch(getProgressUser({
                id: userInfor._id,
                parmas: {}
            })).unwrap();
            setProgress(res?.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loaderProgressByUserId();
    }, [userInfor]);

    return progress;
};

export { useGetProgress };
