import Head from "next/head";
import React, { FC } from "react";
import scss from "./Layout.module.scss";
import SideMenu from "../SideMenu";
import { useSession } from "next-auth/react";
import { Noto_Sans } from "next/font/google";
import Header from "../Header";

const notoSans = Noto_Sans({
  subsets: ["latin"],
});

export type LayoutProps = {
  children?: React.ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>Twiggs Reviews</title>
        <meta name="description" content="Media Reviews Site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={scss.layout}>
        {session && <SideMenu />}
        <div className={scss.children}>{children}</div>
      </main>
    </>
  );
};

export default Layout;
