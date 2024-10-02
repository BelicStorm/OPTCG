import { ReactNode } from "react";
import NavBar from "../components/nav.component";

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <NavBar />
            <div className="main-container">
                {children}
            </div>
            
        </>
    );
}

export default Layout;