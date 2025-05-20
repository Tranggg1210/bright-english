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
  email: string;
  fullname: string;
  dob?: Date;
  password?: string;
  googleId?: string;
  isLocked: boolean;
  avatar?: string;
  role: 'user' | 'admin' ; 
}
