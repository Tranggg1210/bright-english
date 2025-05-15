import './style.scss';
import { ReactNode } from 'react';

function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="auth__layout">
      <div className="auth__layout--form">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout;
