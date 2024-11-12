import NextAuth from 'next-auth';
import NaverProvider from 'next-auth/providers/naver';

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  pages: {
    signIn: '/login',
  },
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    //로그인 함수
    async signIn({ user, profile }) {
      const { nickname, birthday, birthyear, id }: any = profile?.response; // profile.response를 사용하여 필요한 정보 가져오기

      // 로그인 시 닉네임과 생년월일 데이터베이스에 추가
      const res = await fetch(
        process.env.NEXT_PUBLIC_DATABASEURL + `users/${id}.json`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            nickname: nickname,
            birth: `${birthyear}-${birthday}`,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!res.ok) {
        const errorMessage = await res.text(); // 응답 본문 읽기
        console.error('Error saving data:', errorMessage); // 에러 로그 출력
        return false;
      }

      return true;
    },
    async jwt({ token, user, profile }) {
      if (user) {
        const { id }: any = profile?.response;
        // 로그인할 때 user가 존재하면 token에 id를 추가합니다.
        token.id = id; // profile.response에서 id 가져오기
      }
      return token; // 업데이트된 token 반환
    },
    async session({ session, token }: any) {
      // session에 token 정보를 추가합니다.
      if (token) {
        session.user.id = token.id; // session.user에 id 추가
      }
      return session; // 업데이트된 session 반환
    },
  },
  secret: process.env.AUTH_SECRET,
});
