import { RootState } from "@src/services";
import { AppDispatch } from "@src/services";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import Request from "@src/helpers/request";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const RequestMethod = new Request(
    process.env.NEXT_PUBLIC_APP_API_URL || ""
);
