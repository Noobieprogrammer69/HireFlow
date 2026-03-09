import { ChevronUp, ChevronDown } from "lucide-react";
import { CATEGORIES, JOB_TYPES } from "../../../utils/data";
import SalaryRangeSlider from "../../../components/Input/SalaryRangeSlider";

const FilterSection = ({ title, children, isExpanded, onToggle }) => (
  <div className="border-b border-white/10 py-4">

    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full text-left text-white font-semibold"
    >
      <span>{title}</span>

      {isExpanded ? (
        <ChevronUp className="w-4 h-4 text-gray-400" />
      ) : (
        <ChevronDown className="w-4 h-4 text-gray-400" />
      )}

    </button>

    {isExpanded && (
      <div className="mt-4 space-y-3">
        {children}
      </div>
    )}

  </div>
);

const FilterContent = ({
  toggleSection,
  clearAllFilters,
  expandedSections,
  filters,
  handleFilterChange,
}) => {
  return (
    <>
      <div className="flex justify-between mb-6">
        <button
          onClick={clearAllFilters}
          className="text-orange-500 font-semibold text-sm cursor-pointer"
        >
          Clear All
        </button>
      </div>

      <FilterSection
        title="Job Type"
        isExpanded={expandedSections?.jobType}
        onToggle={() => toggleSection("jobType")}
      >
        <div className="space-y-3">
          {JOB_TYPES?.map((type) => (
            <label key={type.value} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters?.type === type.value}
                onChange={(e) =>
                  handleFilterChange("type", e.target.checked ? type.value : "")
                }
                className="accent-orange-500"
              />
              <span className="ml-3 text-gray-400">{type.value}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection
        title="Salary Range"
        isExpanded={expandedSections?.salary}
        onToggle={() => toggleSection("salary")}
      >
        <SalaryRangeSlider
          filters={filters}
          handleFilterChange={handleFilterChange}
        />
      </FilterSection>

      <FilterSection
        title="Category"
        isExpanded={expandedSections?.categories}
        onToggle={() => toggleSection("categories")}
      >
        <div className="space-y-3">
          {CATEGORIES?.map((type) => (
            <label key={type.value} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters?.category === type.value}
                onChange={(e) =>
                  handleFilterChange(
                    "category",
                    e.target.checked ? type.value : ""
                  )
                }
                className="accent-orange-500"
              />
              <span className="ml-3 text-gray-400">{type.value}</span>
            </label>
          ))}
        </div>
      </FilterSection>
    </>
  );
};

export default FilterContent;