import React, { ReactNode } from 'react';
import Player from '../components/Player/Player';
import Head from 'next/head';
import { ColorSchemeScript } from '@mantine/core';
import { Header } from '../components/Header/Header';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  style?: React.CSSProperties;
  className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title, description, keywords }) => (
  <>
    <Head>
      <title>{title || 'Music App'}</title>
      <meta name='description' content={description || 'Music App'}/>
      <meta name='robots' content='index, follow'/>
      <meta name='keywords' content={keywords || 'Music, tracks'}/>
      <meta name='viewport' content="width=device-width, initial-scale=1"/>
      <ColorSchemeScript />
    </Head>
    <Header />
      <main style={{ position: 'relative', paddingBottom: 60 }} >{children}</main>
    <Player />
  </>
);

export default MainLayout;