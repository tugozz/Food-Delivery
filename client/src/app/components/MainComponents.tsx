import Image from "next/image";

export const MainComponents = () => {
  return (
    <div>
      <div className="relative w-full h-[570px]">
        <Image
          src="/background.png"
          alt="background"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="bg-[#404040] h-[1200]">
        <div></div>
      </div>
    </div>
  );
};
