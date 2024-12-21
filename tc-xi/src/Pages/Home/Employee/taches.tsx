import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { HiX } from "react-icons/hi";

// Define a type for Tache
interface Tache {
  tache: string;
  description: string;
  dateLimit: string;
  priority: string;
  status: string;
}
interface FilterOptions {
  tache: boolean;
  description: boolean;
  datelimit: boolean;
  priority: boolean;
  status: boolean;
}

// Sample data for Taches

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

interface TacheTableProps {
  Taches: Tache[];
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
  filterOptions: {
    tache: boolean;
    description: boolean;
    datelimit: boolean;
    priority: boolean;
    status: boolean;
  };
  toggleFilterOption: (option: keyof typeof FilterOptions) => void;
}

interface TableHeaderProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
}

interface FilterOptionsProps {
  filterOptions: {
    tache: boolean;
    description: boolean;
    datelimit: boolean;
    priority: boolean;
    status: boolean;
  };
  toggleFilterOption: (option: keyof typeof FilterOptions) => void;
}

interface TacheRowProps {
  Tache: Tache;
  index: number;
}

interface PaginationProps {
  totalPages: number;
  page: number;
  setPage: (page: number) => void;
}

const Liste_taches = () => {
  const TachesData: Tache[] = Array.from({ length: 25 }, () => ({
    tache: "text",
    description: "text",
    dateLimit: "text",
    priority: "text",
    status: "text",
  }));

  const SearchBar: React.FC<SearchBarProps> = ({
    searchTerm,
    setSearchTerm,
  }) => (
    <div className="text-black relative z-10 w-full flex justify-center gap-4 p-4">
      <div className="flex rounded-xl border border-gray-400 items-center w-80 md:w-[550px] xl:w-[750px] h-9 px-1">
        <input
          type="search"
          className="bg-transparent focus:outline-none w-full h-full p-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
        />
        <IoIosSearch className="text-xl" />
      </div>
    </div>
  );

  const TacheTable: React.FC<TacheTableProps> = ({
    Taches,
    isFilterOpen,
    setIsFilterOpen,
    filterOptions,
    toggleFilterOption,
  }) => (
    <div className="w-full flex flex-col">
      {isFilterOpen && (
        <FilterOptions
          filterOptions={filterOptions}
          toggleFilterOption={toggleFilterOption}
        />
      )}
      <TableHeader
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
      />
      {Taches.length === 0 ? (
        <h2 className="text-black text-center">No results found</h2>
      ) : (
        Taches.map((Tache, index) => (
          <TacheRow key={index} index={index} Tache={Tache} />
        ))
      )}
    </div>
  );

  const TableHeader: React.FC<TableHeaderProps> = () => (
    <div className="w-[80vw] flex place-content-between gap-6 items-center  h-10 rounded-lg p-2 text-gray-600">
      <h2 className="text-start w-12">Tache</h2>
      <h2 className="text-start w-12">Description</h2>
      <h2 className="text-start w-52 truncate">Date limit</h2>
      <h2 className="text-start w-24">Priority</h2>
      <h2 className=" text-start w-32 ">Status</h2>
    </div>
  );

  const FilterOptions: React.FC<FilterOptionsProps> = ({
    filterOptions,
    toggleFilterOption,
  }) => (
    <div className="flex gap-4 p-4 flex-wrap">
      {Object.keys(filterOptions).map((option) => (
        <div
          key={option}
          className={`text-black flex items-center border-2 py-1 px-2 rounded-lg cursor-pointer ${
            filterOptions[option as keyof typeof filterOptions]
              ? "bg-ThirdBlue border-PrimaryBlue"
              : "border-[#747775]"
          }`}
          onClick={() =>
            toggleFilterOption(option as keyof typeof FilterOptions)
          }
          aria-label={`Toggle ${option}`}
        >
          <p>{option.charAt(0).toUpperCase() + option.slice(1)}</p>
          {filterOptions[option as keyof typeof filterOptions] && <HiX />}
        </div>
      ))}
    </div>
  );

  const TacheRow: React.FC<TacheRowProps> = ({ Tache, index }) => (
    <div
      className={`w-[80vw] flex place-content-between text-black gap-6 items-center h-16  p-2  ${
        index % 2 == 0 ? "bg-[#F8F9FC]" : "bg-[#FFFFFF]"
      }`}
    >
      <h2 className="text-start w-12">{Tache.tache}</h2>
      <h2 className="text-start w-12">{Tache.description}</h2>
      <h2 className="text-start w-52 truncate">{Tache.dateLimit}</h2>
      <h2 className="text-start w-24">{Tache.priority}</h2>
      <h2 className=" text-start w-32 ">Status</h2>
    </div>
  );

  const Pagination: React.FC<PaginationProps> = ({
    totalPages,
    page,
    setPage,
  }) => (
    <div className="flex justify-center mt-4 gap-2 text-black">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        aria-label="Previous page"
      >
        <MdKeyboardArrowLeft />
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        aria-label="Next page"
      >
        <MdKeyboardArrowRight />
      </button>
    </div>
  );

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    tache: false,
    description: false,
    datelimit: false,
    priority: false,
    status: false,
  });

  const TachesPerPage = 20;

  // Filter and paginate Taches based on search term
  const filteredTaches = TachesData.filter((Tache) =>
    Tache.tache.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lastTacheIndex = page * TachesPerPage;
  const firstTacheIndex = lastTacheIndex - TachesPerPage;
  const paginatedTaches = filteredTaches.slice(firstTacheIndex, lastTacheIndex);
  const totalPages = Math.ceil(filteredTaches.length / TachesPerPage);

  const toggleFilterOption = (option: keyof typeof filterOptions) => {
    setFilterOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  return (
    <div className="w-full flex max-h-screen overflow-y-scroll flex-col place-content-start place-items-center p-2 pl-8 gap-2 flex-grow ">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <button
        className="pl-3 self-start flex items-center gap-2 text-black"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        aria-label="Toggle filters"
      >
        Filter
        <IoFilter />
      </button>
      <TacheTable
        Taches={paginatedTaches}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        filterOptions={filterOptions}
        toggleFilterOption={toggleFilterOption}
      />
      <Pagination totalPages={totalPages} page={page} setPage={setPage} />
    </div>
  );
};

export default Liste_taches;
