"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

const SignUpPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleMain = () => {
    router.push("/");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError(
        "Мэйл хаягаа Invalid email. Use a format like example@email.com оруулна уу."
      );
      return;
    }

    setError(null);

    // ✅ Navigate to /create-password
    router.push("/create-password");
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-col justify-center gap-4 w-1/2 px-[100px]">
        <ChevronLeft
          onClick={handleMain}
          className="cursor-pointer hover:opacity-80"
        />
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-gray-600">
          Sign up to explore your favorite dishes.
        </p>
        <form onSubmit={handleSubmit}>
          <Input
            name="email"
            type="text"
            placeholder="Enter your email address"
            className="w-full h-10 text-base px-4 py-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <button
            type="submit"
            className="bg-black text-white py-3 rounded-xl mt-2 w-full"
          >
            Let's Go
          </button>
        </form>
        <div className="flex gap-3">
          <p className="text-gray-600">Already have an account?</p>
          <a className="text-blue-500" href="/login">
            Log in
          </a>
        </div>
      </div>

      <div className="w-1/2 h-full p-4">
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          <Image
            src="/signup.jpg"
            alt="signup"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
