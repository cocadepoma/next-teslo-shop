import Head from 'next/head';
import { FC, ReactNode } from 'react';
import { Navbar } from '../ui';
import { SideMenu } from '../ui/SideMenu';

interface Props {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
  children: ReactNode;
}

export const ShopLayout: FC<Props> = ({ children, title, pageDescription, imageFullUrl }) => {
  return (
    <>
      <Head>
        <title>{title}</title>

        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={title} />

        {
          imageFullUrl && (
            <meta name="og:image" content={imageFullUrl} />
          )
        }

      </Head>

      {/* navbar */}
      <nav>
        <Navbar />
      </nav>

      {/* Sidebar */}
      <SideMenu />

      {/* Main content */}
      <main style={{ margin: '80px auto', maxWidth: '1440px', padding: '0px 30px' }}>
        {children}
      </main>

      {/* Footer */}
      <footer>

      </footer>
    </>
  )
}
