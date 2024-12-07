'use server';

import React, { forwardRef } from 'react';
import { signIn } from "@/app/lib/auth"



type SignInProps = {};

const SignIn = forwardRef<HTMLDivElement, SignInProps>(({ }, ref) => {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  );
});

SignIn.displayName = 'SignIn';

export { SignIn };
