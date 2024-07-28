import Gallery from "@/components/Gallery/Gallery";
import HeroSection from "@/components/HeroSection/HeroSection";
import PageSearch from "@/components/PageSearch/PageSearch";

const Home = () => {
  return (
    <>
      <HeroSection/>
      <PageSearch/>
      {/**featured room */}
      <Gallery />
      {/**news letter */}
    </>
  );
};

export default Home;