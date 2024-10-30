import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/layout/Nav';
import AuthSession from '@/components/AuthSession';
import LoginStore from '@/store/loginStore';
import AccountStore from '@/store/accountStore';

export const metadata: Metadata = {
  title: 'Fintech Service',
  description: 'Fintech Service',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthSession>
          <LoginStore>
            <AccountStore>
              <Nav />
              {children}
            </AccountStore>
          </LoginStore>
        </AuthSession>
      </body>
    </html>
  );
}
