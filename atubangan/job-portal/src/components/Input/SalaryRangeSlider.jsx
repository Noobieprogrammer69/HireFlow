import { useState } from "react";

const SalaryRangeSlider = ({ filters, handleFilterChange }) => {

  const [minSalary, setMinSalary] = useState(filters?.minSalary || "");
  const [maxSalary, setMaxSalary] = useState(filters?.maxSalary || "");

  return (
    <div className="space-y-4">

      <div className="grid grid-cols-2 gap-4">

        <div>
          <label className="text-sm text-gray-300 mb-2 block">
            Min Salary
          </label>

          <input
            type="number"
            placeholder="0"
            value={minSalary}
            onChange={(e) => setMinSalary(e.target.value)}
            onBlur={() =>
              handleFilterChange(
                "minSalary",
                minSalary ? parseInt(minSalary) : ""
              )
            }
            className="w-full px-4 py-3 rounded-lg bg-[#1a1a1a] border border-white/10 text-white focus:ring-2 focus:ring-orange-500 outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300 mb-2 block">
            Max Salary
          </label>

          <input
            type="number"
            placeholder="No limit"
            value={maxSalary}
            onChange={(e) => setMaxSalary(e.target.value)}
            onBlur={() =>
              handleFilterChange(
                "maxSalary",
                maxSalary ? parseInt(maxSalary) : ""
              )
            }
            className="w-full px-4 py-3 rounded-lg bg-[#1a1a1a] border border-white/10 text-white focus:ring-2 focus:ring-orange-500 outline-none"
          />
        </div>

      </div>

      {(minSalary || maxSalary) && (
        <div className="text-sm text-gray-400 bg-[#1a1a1a] px-4 py-2 rounded-lg border border-white/10">
          Range: {minSalary ? `₱${Number(minSalary).toLocaleString()}` : `₱0`} -
          {maxSalary ? ` ₱${Number(maxSalary).toLocaleString()}` : ` No limit`}
        </div>
      )}

      <p className="text-xs text-red-400 text-center">
        Salary filtering works only for yearly ranges
      </p>

    </div>
  );
};

export default SalaryRangeSlider;