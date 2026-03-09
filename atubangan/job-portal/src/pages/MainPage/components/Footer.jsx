import { Briefcase } from "lucide-react";
import bg from '../../../assets/hireflow-bg.png'

const Footer = () => {
  return (
    <footer className="bg-[#0f0f0f] border-t border-white/10 text-gray-400">
      <div className="max-w-6xl mx-auto px-6 py-16 text-center">

        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="w-14 h-14 bg-zinc-900 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <img 
              src={bg} 
              alt="logo"
              className="w-11 h-11 object-contain"
            />
          </div>

          <h3 className="text-2xl font-bold text-white">
            HireFlow
          </h3>
        </div>

        <p className="max-w-md mx-auto mb-10 text-sm">
          Connecting talented professionals with innovative companies worldwide.
        </p>

        <p className="text-xs">
          © {new Date().getFullYear()} HireFlow
        </p>

        <p className="text-xs mt-2 text-gray-500">
          Made by Jobir Bergara
        </p>

      </div>
    </footer>
  );
};

export default Footer;