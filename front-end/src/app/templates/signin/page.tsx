"use client";

import dynamic from "next/dynamic";

const SignInPage = dynamic(() => import("@/components/auth/SignIn"), {
  ssr: false,
});

export default function SigninPage() {
  return <SignInPage />;
}
