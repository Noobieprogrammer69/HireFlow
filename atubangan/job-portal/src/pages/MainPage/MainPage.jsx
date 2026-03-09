import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Analytics from "./components/Analytics";
import Footer from "./components/Footer";

const MainPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <Hero />
      <Features />
      <Analytics />
      <Footer />
    </div>
  );
};

export default MainPage;