export interface ButtonProps {
  icon?: any;
  title: string;
  type?: "button" | "submit" | "reset";
  fontSize: string;
  color: string;
  padding: string;
  borderRadius: string;
  background: string;
  width?: string;
  height?: string;
  fontWeight?: number;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  classNameInIcon?: string;
  isLoading?: boolean;
  ref?: any;
  borderColor?: string
  classNameInContent?: string;
  bgLoader?: string
}

export interface IUser {
  _id?: string;
  email: string;
  fullname: string;
  dob?: Date;
  password?: string;
  googleId?: string;
  isLocked: boolean;
  avatar?: string;
  role: 'user' | 'admin';
}


export interface IHomeCard {
  id: number;
  title: string;
  description: string;
  image: any;
  handleClick: () => void;
}


export interface DialogProps {
  show: boolean;
  setIsOpen: any;
  image: any;
  title: string;
  description?: string;
  textButtonLeft?: string;
  textButtonRight: string;
  colorButtonLeft?: string;
  colorButtonRight: string;
  handleCloseModal?: () => void;
  handleButtonRight: () => void;
  bgRight: string;
  bgLeft?: string;
  isLoading?: boolean;
  className?: string;
  isDisableCloseModalInOverlay?: boolean;
  classNameBtnLeft?: string;
  classNameBtnRight?: string;
  sizeImage?: number,
  classNameInContentBtn?: string;
}

export interface ITopic {
  _id: string;
  name: string;
  numVocab?: number;
}

export interface IGrammar {
    _id?: string;
    title: string;
    description?: string;
    content: string;
    source?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: any
}


export interface ModalComponentProps {
  isShow: boolean;
  setIsShow: (value: boolean) => void;
  titleModal: string;
  children: any;
  sizeBtnClose?: string;
  classNameModal?: string;
  classNameTitle?: string;
  classNameContentContainer?: string;
  borderRadius?: number;
  bgOverlay?: string;
  isDisableCloseAtOverlay?: boolean;
  bgBtnClose?: string;
  classNameHeader?: string;
  classNameBtnClose?: string;
  dialogClassName?: string;
}
