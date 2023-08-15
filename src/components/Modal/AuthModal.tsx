import { signIn } from "next-auth/react";
import React from "react";

const AuthModal = ({ onClose }: any) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="w-full max-w-md transform rounded-lg bg-white p-6 shadow-lg transition-all duration-300">
        <h2 className="mb-2 text-center text-lg font-semibold">Sign In</h2>
        <p className="mb-4 text-center text-xl text-muted-foreground">
          Nuh-uh! Please Login First
        </p>
        <div className="flex flex-col space-y-2">
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Sign in with Google
          </button>
          <button
            onClick={() => signIn("github", { callbackUrl: "/" })}
            className="rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-900"
          >
            Sign in with GitHub
          </button>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button className="text-gray-600" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
