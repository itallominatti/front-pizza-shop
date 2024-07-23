import { Helmet } from "react-helmet-async";


export function SignIn() {
    return (
        <>
            <Helmet
            title="Login"
            >
                <h1>Sign In</h1>
                <p>Find me in src/pages/auth/sign-in.tsx</p>
            </Helmet>
        </>
    );
}