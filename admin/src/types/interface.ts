import { UploadFile } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { FormInstance } from "antd/lib";
import { ReactNode } from "react";

interface UserType {
    _id: string;
    email: string;
    fullname: string;
    dob: any;
    isLocked: string;
    googleId?: string;
    avatar?: string;
    password?: string;
    role: "user" | 'admin'
}

interface UserManagementProps {
    handleAddUser: () => void;
    handleEdit: (value: UserType) => void;
    handleDelete: (value: UserType) => void;
    handleLockOrUnLock: (value: UserType) => void;
    users: UserType[];
    page: number;
    handlePageChange: (page: number) => void;
    totalUsers: number;
    handleCancel: () => void;
    handleOk: () => void;
    isModalOpen: boolean;
    currentUser: UserType | null;
    fileList: UploadFile[];
    handleChange: (info: UploadChangeParam<UploadFile<any>>) => void;
    form: FormInstance<UserType>;
    uploadButton: ReactNode;
    isConfirmOpen: boolean;
    setIsConfirmOpen: (open: boolean) => void;
    confirmTitle: {
        title: string,
        subTitle: string,
        isDelete: boolean
    };
    confirmAction: () => void;
}

interface TopicType {
    _id: string;
    name: string;
}

interface TopicManagementProps {
    handleAddTopic: () => void;
    handleEdit: (value: TopicType) => void;
    handleDelete: (value: TopicType) => void;
    topics: TopicType[];
    handleCancel: () => void;
    handleOk: () => void;
    isModalOpen: boolean;
    currentTopic: TopicType | null;
    form: FormInstance<TopicType>;
    isConfirmOpen: boolean;
    setIsConfirmOpen: (open: boolean) => void;
    confirmTitle: {
        title: string,
        subTitle: string,
        isDelete: boolean
    };
    confirmAction: () => void;
}

export type {
    UserType,
    UserManagementProps,
    TopicType,
    TopicManagementProps
}
