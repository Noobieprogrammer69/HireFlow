import { Briefcase } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0f0f0f] to-[#121212] flex items-center justify-center">

      <div className="text-center">

        <div className="relative">

          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500/20 border-t-orange-500 mx-auto mb-6 shadow-lg shadow-orange-500/30"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-orange-400" />
          </div>

        </div>

        <p className="text-gray-400 font-medium">
          Finding amazing opportunities...
        </p>

      </div>

    </div>
  );
};

export default LoadingSpinner;