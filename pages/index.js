import React from "react";
import App from "../src/App";
import ls from "local-storage";

// // Client Side Rendering
// function index() {
//   return <App pageName="Home" />;
// }
//
// export default index;

// Allow server side rendering
const Index = ({ user, isServer }) => {
    const isBrowser = typeof window !== "undefined";

    // this means running on first page load and inside the browser so should store in local storage
    if (isServer && isBrowser) {
        ls.set("userInfo", user);
    }
    return (
        <div>
            <App pageName="Home" userInfo={user} />
        </div>
    );
};

// If you could say that the toolchain Next.js has secret sauce, it would be that it makes building React apps
// that automatically generate full-page HTML on the server for immediately displaying that HTML on the client. It's a huge deal.
Index.getInitialProps = async ({ req }) => {
    const isServer = !!req;
    if (isServer) {
        return { user: req.user, isServer };
    } else {
        try {
            const user = ls.get("userInfo");
            return { user, isServer };
        } catch (e) {
            return { isServer };
        }
    }
};

export default Index;
