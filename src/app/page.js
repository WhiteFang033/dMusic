import Logo from "@/components/Logo";
import PurpleButton from "@/components/PurpleButton";
import CyanButton from "@/components/CyanButton";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center flex-col w-[100%] h-[70vh]">

      <div className="flex justify-around items-center flex-col w-[90%] h-[70%]">

        <Logo height={150} />
        <div className="text-5xl my-4 text-white font-bold ">DMusic</div>

        <p className="text-white text-2xl text-center w-[70%]">
          Welcome to DMusic, your go-to platform for high-quality music streaming. Discover, create, and enjoy a world of music anytime, anywhere!
          </p>
      </div>

      <div className="text-xl my-5 py-5 flex w-[auto] justify-between items-center">



          <PurpleButton content = {"Explore"} />
          <Link href={"/login"} ><CyanButton content = {"Sign In"} /></Link>


          
        </div>

    </div>
  );
}
