import { Fragment } from "react";
import NavBar from "./NavBar";

function Layout(props: any) {
    return (
        <Fragment>
            <NavBar />
            {props.children}
        </Fragment>
    )
}

export default Layout;