import { Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { randomBytes, randomUUID } from 'crypto';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import { v4 as uuidv4 } from 'uuid';
import prisma from './prisma';

if (
  !process.env.KAKAO_CLIENT_ID ||
  !process.env.KAKAO_CLIENT_SECRET ||
  !process.env.NEXTAUTH_SECRET
) {
  console.error('환경 변수가 설정되지 않았습니다.');
  process.exit(1);
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const existUser = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        const deleteAccount = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
            deletedYn: true,
          },
        });
        if (!existUser) throw new Error('해당 이메일로 가입한 적이 없습니다.');

        if (deleteAccount) throw new Error('이미 탈퇴한 계정입니다.');

        if (existUser.provider !== 'credentials')
          throw new Error('소셜 로그인으로 회원가입한 회원입니다.');

        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          existUser.password
        );

        if (!passwordMatch) throw new Error('비밀번호 오류 입니다.');

        if (!existUser.emailVerified)
          throw new Error('이메일 인증을 해주세요.');

        return existUser as any;
      },
    }),
  ],
  // adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/login',
    error: '/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString('hex');
    },
  },
  callbacks: {
    async signIn({ user, profile, account }) {
      try {
        if (account?.provider === 'kakao' || 'google' || 'naver') {
          console.log('profile :: ', profile);
          console.log('user :: ', user);
          console.log('account :: ', account);

          const db_user = await prisma.user.findUnique({
            where: { email: user.email! },
          });

          if (!db_user) {
            const hashedPassword = await bcrypt.hash(uuidv4(), 12);
            const newUser = await prisma.user.create({
              data: {
                userId: randomUUID(),
                email: user.email,
                name: user.name,
                password: hashedPassword,
                company: user.company || '',
                rank: user.rank || '',
                image: user.image,
                provider: account?.provider,
              },
            });

            user.id = newUser.id;
            user.userId = newUser.userId;
            user.image = newUser.image;
            user.company = newUser.company;
            user.rank = newUser.rank;
            user.role = newUser.role;
            user.provider = newUser.provider;
            return true;
          }
          user.id = db_user.id;
          user.userId = db_user.userId;
          user.image = db_user.image;
          user.company = db_user.company;
          user.rank = db_user.rank;
          user.role = db_user.role;
          user.provider = db_user.provider;
          return true;
        }
        return true;
      } catch (error) {
        console.error('로그인 도중 에러가 발생했습니다: ' + error);
        return false;
      }
    },
    async jwt({ token, user, trigger, session }) {
      // console.log('jwt callback :', { token, user });
      if (user) {
        token.id = user.id;
        token.userId = user.userId;
        token.image = user.image;
        token.provider = user.provider;
        token.role = user.role;
        token.company = user.company;
        token.rank = user.rank;
        token.userId = user.userId;
      }
      if (trigger === 'update') {
        token.image = session.info;
      }
      return token;
    },
    async session({ session, token }) {
      // console.log('session callback :', { session, token });
      if (session.user) {
        session.user.id = token.id as number;
        session.user.userId = token.userId as string;
        session.user.image = token.image as string;
        session.user.role = token.role as Role;
        session.user.provider = token.provider as string;
        session.user.company = token.company as string;
        session.user.rank = token.rank as string;
        session.user.userId = token.userId as string;
      }
      return session;
    },
  },
};
