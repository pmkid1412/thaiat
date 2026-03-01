"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_CLIENT_ID =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
    "436717515824-vttf3tbsrulsfeedbdllebcbv4bucio2.apps.googleusercontent.com";

export default function GoogleAuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            {children}
        </GoogleOAuthProvider>
    );
}
