import Image from "next/image";

export const MainComponents = () => {
  return (
    <div>
      <div className="min-h-screen">
        <div className="w-full h-[700px] relative">
          <Image src="/bg.png" alt="background" layout="fill" />
        </div>
      </div>
      <div className="bg-[#404040] h-[1200]">
        <div></div>
      </div>
    </div>
  );
};
