export interface AuthTypes {
  fullName: string;
  email: string;
  password: string;
}
export interface CustomDialogProps {
  title?: string;
  description?: string;
  trigger?: React.ReactNode;
  children: React.ReactNode;
  showClose?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface DialogOpen {
  setIsLoginOpen: (open: boolean) => void;
  setIsSignupOpen: (open: boolean) => void;
}
