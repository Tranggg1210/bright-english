import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./useHookReducers";
import { getProgressUser } from "@src/services/users";

const useGetProgress = () => {
    const dispatch = useAppDispatch();
    const { userInfor }: any = useAppSelector(state => state.auth);
    const [progressData, setProgressData] = useState(null);
    const [loading, setLoading] = useState(false);
    

    const loaderProgressByUserId = async () => {
        if (!userInfor?._id) return;

        try {
            setLoading(true);
            const res = await dispatch(getProgressUser({
                id: userInfor._id,
                parmas: {}
            })).unwrap();
            setProgressData(res?.data);
        } catch (err) {
            console.error(err);
        }finally{
            setLoading(false)
        }
    };

    useEffect(() => {
        loaderProgressByUserId();
    }, [userInfor]);

    return {
        progressData,
        loading
    };
};

export { useGetProgress };
