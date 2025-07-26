"use client";

import { useCallback, useRef, useState } from "react";
import { handleLogin, handleSignup } from "@/actions/authActions";
import { useToast } from "@/contexts/ToastContext";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { showToast } = useToast();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData(e.currentTarget);
      let response;
      if (isLogin) {
        response = await handleLogin(formData);
      } else {
        response = await handleSignup(formData);
      }
      setLoading(false);
      if (response.success) {
        showToast(response.message, "success");
        window.location.href = "/";
      } else {
        showToast(response.message, "error");
      }
    },
    [isLogin]
  );

  const toggleForm = useCallback(() => {
    setIsLogin((prev) => !prev);
    if (formRef.current) {
      formRef.current.reset();
    }
  }, []);

  return (
    <div className="w-full sm:w-sm mx-auto bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {isLogin ? "Login" : "Signup"}
      </h2>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
        )}

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full ${
            loading ? "bg-gray-400" : "bg-blue-600"
          } text-white py-2 rounded hover:cursor-pointer`}
          disabled={loading}
        >
          {loading ? "Loading..." : isLogin ? "Login" : "Signup"}
        </button>
      </form>

      <p className="mt-4 text-sm text-center">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button onClick={toggleForm} className="text-blue-600 hover:underline">
          {isLogin ? "Signup here" : "Login here"}
        </button>
      </p>
    </div>
  );
}
