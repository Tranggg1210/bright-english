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


interface VocabularyType {
    _id: string;
    topicId: string;
    word: string;
    translate: string;
    transcription: string;
    image: string;
    description: string;
}

interface VocabularyManagementProps {
    handleAdd: () => void;
    handleEdit: (value: VocabularyType) => void;
    handleDelete: (value: VocabularyType) => void;
    vocabularies: VocabularyType[];
    page: number;
    handlePageChange: (page: number) => void;
    total: number;
    handleCancel: () => void;
    handleOk: () => void;
    isModalOpen: boolean;
    currentVocabulary: VocabularyType | null;
    fileList: UploadFile[];
    handleChange: (info: UploadChangeParam<UploadFile<any>>) => void;
    form: FormInstance<VocabularyType>;
    uploadButton: ReactNode;
    isConfirmOpen: boolean;
    setIsConfirmOpen: (open: boolean) => void;
    confirmTitle: {
        title: string,
        subTitle: string,
        isDelete: boolean
    };
    confirmAction: () => void;
    topics: TopicType[]
}

interface ContactType {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    message: string;
    status: 'unread' | 'read' | 'replied'
}


interface ContactManagementProps {
    handleEdit: (value: ContactType) => void;
    contacts: ContactType[];
    handleCancel: () => void;
    handleOk: () => void;
    isModalOpen: boolean;
    form: FormInstance<ContactType>;
    page: number;
    handlePageChange: (page: number) => void;
    total: number;
}

interface ReportType {
    _id: string;
    userId: string;
    title: string;
    fullname: string;
    message: string;
    email: string;
    status: 'unread' | 'read' | 'replied'
}


interface ReportManagementProps {
    handleEdit: (value: ReportType) => void;
    reports: ReportType[];
    handleCancel: () => void;
    handleOk: () => void;
    isModalOpen: boolean;
    form: FormInstance<ReportType>;
    page: number;
    handlePageChange: (page: number) => void;
    total: number;
}

interface MatchItem {
    id: string;
    image: string;
    content: string;
    key: string;
    index: number;
}

interface ExerciseQuestion {
    _id?: string;
    id?: string;
    prompt?: string;
    audio?: string;
    dataLeft?: MatchItem[];
    dataRight?: MatchItem[];
    answer: any;
    content?: string[];
}

interface ExerciseType {
    _id?: string;
    topicId: string;
    type: 'write' | 'match' | 'dictation' | 'multiple_choice';
    name: string;
    text?: string;
    questions: ExerciseQuestion[];
    createdAt?: Date;
    updatedAt?: Date;
}

interface ExerciseManagementProps {
    handleEdit: (value: ExerciseType) => void;
    handleDelete: (value: ExerciseType) => void;
    exercises: ExerciseType[];
    page: number;
    handlePageChange: (page: number) => void;
    total: number;
    isConfirmOpen: boolean;
    setIsConfirmOpen: (open: boolean) => void;
    confirmAction: () => void;
}


interface ExerciseHeaderTopic {
    topicId: string;
    type: 'write' | 'match' | 'dictation' | 'multiple_choice',
    name: string;
    text?: string;
}
interface MatchingItem {
    content?: string;
    image?: string;
    key: string,
    id: string;
}


interface ConversationType {
    _id?: string;
    topicId: string;
    name: string;
    listConver: {
        _id?: string;
        speaker: 'speakerA' | 'speakerB';
        text: string;
        audio?: string;
    }[];
    listInfor: {
        speakerA: {
            avatar: string;
            name: string;
        };
        speakerB: {
            avatar: string;
            name: string;
        };
    };
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface ConversationManagementProps {
    handleEdit: (value: ConversationType) => void;
    handleDelete: (value: ConversationType) => void;
    conversations: ConversationType[];
    page: number;
    handlePageChange: (page: number) => void;
    total: number;
    isConfirmOpen: boolean;
    setIsConfirmOpen: (open: boolean) => void;
    confirmAction: () => void;
}

export type {
    UserType,
    UserManagementProps,
    TopicType,
    TopicManagementProps,
    VocabularyManagementProps,
    VocabularyType,
    ContactManagementProps,
    ContactType,
    ReportManagementProps,
    ReportType,
    ExerciseType,
    ExerciseManagementProps,
    MatchingItem,
    ExerciseHeaderTopic,
    ExerciseQuestion,
    ConversationType,
    ConversationManagementProps
}
