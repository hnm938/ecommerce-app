import { useSession, signIn } from "next-auth/react";

import Navbar from "@/components/Navbar";

import styles from "@/styles/Layout.module.scss";
import Sidebar from "./Sidebar";

export default function Layout({children, sidebar, sidebarTitle, sidebarSubtitle }) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
            onClick={() => signIn("google")}
            className="bg-white p-2 px-4 rounded-lg"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-900 min-h-screen flex">
      <Navbar />
      {sidebar && (
        <Sidebar title={sidebarTitle} subtitle={sidebarSubtitle} table={sidebar} />
      )}
      <div className={styles["page-container"]}>{children}</div>
    </div>
  );
}
