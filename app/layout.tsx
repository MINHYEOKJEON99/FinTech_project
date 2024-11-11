import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/layout/Nav';
import AuthSession from '@/components/AuthSession';
import LoginStore from '@/store/loginStore';
import AccountStore from '@/store/accountStore';
import PostStore from '@/store/postStore';

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
              <PostStore>
                <Nav />
                {children}
              </PostStore>
            </AccountStore>
          </LoginStore>
        </AuthSession>
      </body>
    </html>
  );
}
