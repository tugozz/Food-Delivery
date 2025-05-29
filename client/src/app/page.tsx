import { HeaderComponents } from "./components/HeaderComponents";
import { MainComponents } from "./components/MainComponents";
import { FooterComponents } from "./components/FooterComponents";

export default function Home() {
  return (
    <div>
      <div>
        <HeaderComponents />
        <MainComponents />
        <FooterComponents />
      </div>
    </div>
  );
}
