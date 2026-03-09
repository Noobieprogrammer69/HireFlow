import { MapPin, Search } from "lucide-react";

const SearchHeader = ({ filters, handleFilterChange, onSearch  }) => {
  return (
    <div className="bg-[#141414] border border-white/10 rounded-xl p-6 mb-8">

      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white mb-1">
          Find Your Dream Job
        </h1>

        <p className="text-gray-400">
          Discover opportunities that match your passion
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">

        <div className="flex-1 relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <input
            type="text"
            value={filters.keyword}
            onChange={(e) =>
              handleFilterChange("keyword", e.target.value)
            }
            placeholder="Job title, company or keyword"
            className="w-full bg-[#1a1a1a] border border-white/10 text-white pl-12 pr-4 py-3 rounded-lg outline-none"
          />
        </div>

        <div className="relative lg:w-64">
          <MapPin
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <input
            type="text"
            value={filters.location}
            onChange={(e) =>
              handleFilterChange("location", e.target.value)
            }
            placeholder="Location"
            className="w-full bg-[#1a1a1a] border border-white/10 text-white pl-12 pr-4 py-3 rounded-lg outline-none"
          />
        </div>

        <button
        onClick={onSearch}
        className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold cursor-pointer"
        >
        Search Jobs
        </button>

      </div>
    </div>
  );
};

export default SearchHeader;