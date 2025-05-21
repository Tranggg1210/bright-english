"use client";

import { UserType } from "@src/types/interface";
import { Form, UploadProps, UploadFile } from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@src/hooks/useHookReducers";
import {
  getListUser,
  deleteUser,
  updateUser,
  createUser,
  lockedUser,
} from "@src/services/users";
import _ from "lodash";
import { useRouter } from "next/navigation";
import UserManagementUI from "./ui";
import dayjs from "dayjs";

function UsersManagement() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const [users, setUsers] = useState<UserType[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const { userInfor } = useAppSelector((state) => state.auth);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {});
  const [confirmTitle, setConfirmTitle] = useState({
    title: "",
    subTitle: "",
    isDelete: true,
  });

  useEffect(() => {
    if (currentUser?.avatar) {
      setFileList([
        {
          uid: "xxx",
          name: "avatar.png",
          status: "done",
          url: currentUser.avatar,
        },
      ]);
    } else {
      setFileList([]);
    }
  }, [currentUser]);

  useEffect(() => {
    if (!_.isEmpty(userInfor)) {
      loaderDataUser(page);
    };
  }, [page, userInfor]);

  const loaderDataUser = async (page: number) => {
    try {
      const params = {
        sortBy: "fullname",
        limit: 10,
        page,
      };
      const res = await dispatch(getListUser(params)).unwrap();
      if (!_.isEmpty(res.data.users)) {
        setUsers(res.data.users);
        setTotalUsers(res.data.totalResults);
      }
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Không thể lấy danh sách người dùng!");
    }
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleEdit = (value: UserType) => {
    setIsModalOpen(true);
    const handleValue = {
      ...value,
      dob: value?.dob ? dayjs(value.dob) : null,
    };

    setCurrentUser(handleValue);
    form.setFieldsValue(handleValue);
  };

  const handleAddUser = () => {
    setIsModalOpen(true);
    setCurrentUser(null);
    setFileList([]);
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const user: any = {
        fullname: values.fullname,
        role: values.role,
      };

      if (values.dob) {
        user.dob =
          values.dob instanceof Date
            ? values.dob
            : values.dob.toDate?.() || new Date(values.dob);
      }

      if (!currentUser) {
        user.email = values.email;
        user.password = values.password;
      }

      if (fileList[0]?.originFileObj) {
        user.avatar = fileList[0].originFileObj;
      }

      if (currentUser) {
        await dispatch(updateUser({ id: currentUser._id, user })).unwrap();
        toast.dismiss();
        toast.success("Cập nhật người dùng thành công!");
      } else {
        await dispatch(createUser(user)).unwrap();
        toast.dismiss();
        toast.success("Thêm người dùng thành công!");
      }

      setIsModalOpen(false);
      loaderDataUser(page);
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error(
        currentUser
          ? "Cập nhật người dùng thất bại!"
          : "Thêm người dùng thất bại!"
      );
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (value: UserType) => {
    setConfirmTitle({
      title: "Xóa người dùng",
      subTitle: `Bạn có chắc chắn muốn xóa người dùng ${value.email} này không?`,
      isDelete: true,
    });
    setConfirmAction(() => async () => {
      try {
        await dispatch(deleteUser({ _id: value._id })).unwrap();
        toast.dismiss();
        toast.success("Xóa người dùng thành công!");
        setIsConfirmOpen(false);
        loaderDataUser(page);
      } catch (error) {
        console.log(error);
        toast.dismiss();
        toast.error("Xóa người dùng thất bại!");
      }
    });
    setIsConfirmOpen(true);
  };

  const handleLockOrUnLock = (value: UserType) => {
    const isLocked = value.isLocked;
    setConfirmTitle({
      title: isLocked ? "Mở khóa người dùng" : "Khóa người dùng",
      subTitle: `Bạn có chắc chắn muốn ${
        isLocked ? "mở khóa" : "khóa"
      } cho người dùng ${value.email} này không?`,
      isDelete: false,
    });
    setConfirmAction(() => async () => {
      try {
        await dispatch(lockedUser({ _id: value._id })).unwrap();
        toast.dismiss();
        toast.success(
          `${isLocked ? "Mở khóa" : "Khóa"} người dùng thành công!`
        );
        loaderDataUser(page);
        setIsConfirmOpen(false);
      } catch (error) {
        console.log(error);
        toast.dismiss();
        toast.error(`${isLocked ? "Mở khóa" : "Khóa"} người dùng thất bại!`);
      }
    });
    setIsConfirmOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <UserManagementUI
      currentUser={currentUser}
      fileList={fileList}
      form={form}
      handleAddUser={handleAddUser}
      handleCancel={handleCancel}
      handleChange={handleChange}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      handleLockOrUnLock={handleLockOrUnLock}
      handleOk={handleOk}
      handlePageChange={handlePageChange}
      isModalOpen={isModalOpen}
      page={page}
      totalUsers={totalUsers}
      uploadButton={uploadButton}
      users={users}
      confirmAction={confirmAction}
      confirmTitle={confirmTitle}
      isConfirmOpen={isConfirmOpen}
      setIsConfirmOpen={setIsConfirmOpen}
    />
  );
}

export default UsersManagement;
