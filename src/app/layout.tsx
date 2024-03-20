import Header from '@/components/Header';
import ProjectAlertBar from '@/components/ProjectAlertBar';
import SessionProvider from '@/components/SessionProvider';
import Sidebar from '@/components/Sidebar';
import Providers from '@/components/providers';
import '@/styles/globals.css';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { Noto_Sans_KR } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer';

const notoSans = Noto_Sans_KR({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  metadataBase: new URL('https://wevibe.kr'), // The base URL of the site!!! (change this by KKW)
  title: '위바이브',
  description:
    '위바이브는 유저의 경험 데이터가 차이를 만들어낸다고 믿습니다. 위바이브는 AI 기반으로 지속 발전 가능한 성장 모델을 발굴하여 새로운 경험과 가능성을 모색합니다.',
  icons: {
    icon: '/img/wevibe.ico',
  },
  openGraph: {
    type: 'website',
    url: 'https://wevibe.kr',
    title: '위바이브 주식회사',
    description:
      '위바이브는 유저의 경험 데이터가 차이를 만들어낸다고 믿습니다. 위바이브는 AI 기반으로 지속 발전 가능한 성장 모델을 발굴하여 새로운 경험과 가능성을 모색합니다.',
    siteName: '위바이브 주식회사',
    images: [
      {
        url: 'https://opengraph.b-cdn.net/production/documents/bd8ec256-af61-4614-9905-6db9603bac09.png?token=sKtoM0ytMD287bX4PAqOuFWrXEmweidCVXkocs4o7Fc&height=310&width=751&expires=33246295156',
        width: 1200,
        height: 600,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '위바이브 주식회사',
    description:
      '위바이브는 유저의 경험 데이터가 차이를 만들어낸다고 믿습니다. 위바이브는 AI 기반으로 지속 발전 가능한 성장 모델을 발굴하여 새로운 경험과 가능성을 모색합니다.',
    images: [
      {
        url: 'https://opengraph.b-cdn.net/production/documents/bd8ec256-af61-4614-9905-6db9603bac09.png?token=sKtoM0ytMD287bX4PAqOuFWrXEmweidCVXkocs4o7Fc&height=310&width=751&expires=33246295156',
        width: 1200,
        height: 600,
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="ko">
      <body className={notoSans.className}>
        <SessionProvider session={session}>
          <Providers>
            <div className="flex flex-col">
              <main className="flex flex-1 flex-col overflow-y-auto">
                <ProjectAlertBar />
                <Sidebar />
                <Header />
                {children}
                <ToastContainer
                  position="top-center"
                  autoClose={3000}
                  closeOnClick
                  pauseOnFocusLoss={false}
                  theme="light"
                />
                <Footer />
              </main>
            </div>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
