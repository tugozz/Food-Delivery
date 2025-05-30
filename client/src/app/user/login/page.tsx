// "use client";

// import { ChangeEvent, useState } from "react";

// const LoginPage = () => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const file = Array.from(event.target.files as FileList)[0];

//     setSelectedFile(file);
//   };

//   const handleSubmit = async () => {
//     const form = new FormData();

//     if (!selectedFile) return;

//     form.append("upload_preset", "Food Delivery");
//     form.append("upload", selectedFile);
//     // form.append("folder", food - imagess);

//     const response = await fetch(
//       "https://api.cloudinary.com/v1_1/tugozz/image/upload",
//       { method: "POST", body: "adfa" }
//     );

//     const parsed = await response.json();
//     console.log(parsed.url);
//   };

//   return (
//     <div className="bg-red-50 w-20 h-20">
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// };

// export default LoginPage;

"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

const SignInPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleMain = () => {
    router.push("/");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const strongPasswordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!password || !confirmPassword) {
      setError("Please enter your password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Those passwords didn’t match, try again.");
      return;
    }

    if (!strongPasswordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters and include a letter, number, and symbol."
      );
      return;
    }

    setError(null);
    // Continue to next step
    router.push("/login"); // Replace with your actual next step
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-col justify-center gap-4 w-1/2 px-[100px]">
        <ChevronLeft
          onClick={handleMain}
          className="cursor-pointer hover:opacity-80"
        />
        <h1 className="text-2xl font-bold">Log in</h1>
        <p className="text-gray-600">Log in to enjoy your favorite dishes.</p>
        <form onSubmit={handleSubmit}>
          <Input
            name="email"
            type="text"
            placeholder="Enter your email address"
            className="w-full h-10 text-base px-4 py-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full h-10 text-base px-4 py-3 mt-2"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

          <a className="text-sm underline" href="/forgot-password">
            Forgot password ?
          </a>

          <button
            type="submit"
            className="bg-black text-white py-3 rounded-xl mt-2 w-full"
          >
            Let's Go
          </button>
        </form>
        <div className="flex gap-3">
          <p className="text-gray-600">Don’t have an account?</p>
          <a className="text-blue-500" href="signup">
            Sign up
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

export default SignInPage;
