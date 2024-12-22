import { useState } from "react";
import { IoIosAdd, IoIosSearch } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { HiX } from "react-icons/hi";

// Define types
interface Employee {
  SSN: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  isOpen: boolean;
  tasks: Task[];
}

interface Task {
  name: string;
  description: string;
  priority: string;
  deadline: string;
}

interface FilterOptions {
  SSN: boolean;
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  address: boolean;
  isOpen: boolean;
}

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

interface EmployeeTableProps {
  employees: Employee[];
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
  filterOptions: FilterOptions;
  toggleFilterOption: (option: keyof FilterOptions) => void;
}

interface TableHeaderProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
}

interface FilterOptionsProps {
  filterOptions: FilterOptions;
  toggleFilterOption: (option: keyof FilterOptions) => void;
}

interface EmployeeRowProps {
  employee: Employee;
  index: number;
  handleAddTask: (index: number, task: Task) => void;
}

interface PaginationProps {
  totalPages: number;
  page: number;
  setPage: (page: number) => void;
}

const ListeEmployees2 = () => {
  const [employeesData, setEmployeesData] = useState(
    Array.from({ length: 10 }, () => ({
      SSN: "text",
      firstName: "text",
      lastName: "text",
      email: "text",
      address: "text",
      isOpen: false,
      tasks: [],
    }))
  );

  const toggleEmployeeOpen = (index: number) => {
    setEmployeesData((prev) =>
      prev.map((employee, i) =>
        i === index ? { ...employee, isOpen: !employee.isOpen } : employee
      )
    );
  };

  const handleAddTask = (index: number, task: Task) => {
    setEmployeesData((prev: any) =>
      prev.map(({ employee, i }: { employee: Employee; i: number }) =>
        i === index ? { ...employee, tasks: [...employee.tasks, task] } : employee
      )
    );
  };

  const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => (
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

  const EmployeeTable: React.FC<EmployeeTableProps> = ({
    employees,
    isFilterOpen,
    setIsFilterOpen,
    filterOptions,
    toggleFilterOption,
  }) => (
    <div className="w-full flex flex-col gap-1">
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
      {employees.length === 0 ? (
        <h2 className="text-black text-center">No results found</h2>
      ) : (
        employees.map((employee, index) => (
          <EmployeeRow
            key={index}
            index={index}
            employee={employee}
            handleAddTask={handleAddTask}
          />
        ))
      )}
    </div>
  );

  const TableHeader: React.FC<TableHeaderProps> = () => (
    <div className="w-full flex gap-4 font-bold border-b pb-2 text-gray-700">
      <h2 className="w-16">SSN</h2>
      <h2 className="w-24">Last Name</h2>
      <h2 className="w-24 truncate">First Name</h2>
      <h2 className="w-48">Email</h2>
      <h2 className="w-24">Address</h2>
      <h2>Add Task</h2>
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
            filterOptions[option as keyof FilterOptions]
              ? "bg-ThirdBlue border-PrimaryBlue"
              : "border-[#747775]"
          }`}
          onClick={() => toggleFilterOption(option as keyof FilterOptions)}
          aria-label={`Toggle ${option}`}
        >
          <p>{option.charAt(0).toUpperCase() + option.slice(1)}</p>
          {filterOptions[option as keyof FilterOptions] && <HiX />}
        </div>
      ))}
    </div>
  );

  const EmployeeRow: React.FC<EmployeeRowProps> = ({
    employee,
    index,
    handleAddTask,
  }) => {
    const [task, setTask] = useState<Task>({
      name: "",
      description: "",
      priority: "",
      deadline: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (task.name && task.description && task.priority && task.deadline) {
        try {
          const response = await fetch("/api/tasks", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              employeeIndex: index,
              task: task,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to add task");
          }

          // Update local employee data after successful POST request
          handleAddTask(index, task);
          setTask({ name: "", description: "", priority: "", deadline: "" });
          alert("Task added successfully");
        } catch (error) {
          console.error("Error adding task:", error);
          alert("There was an error adding the task.");
        }
      } else {
        alert("Please fill in all the fields.");
      }
    };

    return (
      <div
        className={`transition-all w-full flex flex-col gap-4 items-center py-2 text-gray-800 bg-ThirdBlue rounded-lg ${
          employee.isOpen ? "h-44" : ""
        }`}
      >
        <div className="transition-all w-full flex gap-4 items-center py-2 text-gray-800 bg-ThirdBlue rounded-lg">
          <h2 className="w-16">{employee.SSN}</h2>
          <h2 className="w-24">{employee.lastName}</h2>
          <h2 className="w-24 truncate">{employee.firstName}</h2>
          <h2 className="w-48">{employee.email}</h2>
          <h2 className="w-24">{employee.address}</h2>
          <button
            className="focus:outline-none"
            aria-label="Toggle task visibility"
            onClick={() => toggleEmployeeOpen(index)}
          >
            <IoIosAdd className="w-8 h-8" />
          </button>
        </div>
        {employee.isOpen && (
          <form className="overflow-y-scroll max-md:w-full max-md:flex-col max-md:place-items-start flex gap-2 p-2" onSubmit={handleSubmit}>
            <label className="w-full">
              <input
                className="max-md:w-full w-32 p-1 rounded-md border-gray-400"
                type="text"
                placeholder="Task Name"
                value={task.name}
                onChange={(e) => setTask({ ...task, name: e.target.value })}
              />
            </label>
            <label className="w-full">
              <input
                className="max-md:w-full w-44 p-1 rounded-md border-gray-400"
                type="text"
                placeholder="Description"
                value={task.description}
                onChange={(e) =>
                  setTask({ ...task, description: e.target.value })
                }
              />
            </label>
            <label className="w-full">
              <input
                className="max-md:w-full w-32 p-1 rounded-md border-gray-400"
                type="text"
                placeholder="Priority"
                value={task.priority}
                onChange={(e) => setTask({ ...task, priority: e.target.value })}
              />
            </label>
            <label className="w-full">
              <input
                className="max-md:w-full w-32 p-1 rounded-md border-gray-400"
                type="text"
                placeholder="Deadline"
                value={task.deadline}
                onChange={(e) => setTask({ ...task, deadline: e.target.value })}
              />
            </label>
            <button
              type="submit"
              className="bg-SecondaryBlue p-1 px-2 rounded-md self-end"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    );
  };

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
    SSN: false,
    firstName: false,
    lastName: false,
    email: false,
    address: false,
    isOpen: false,
  });

  const employeesPerPage = 20;

  const filteredEmployees = employeesData.filter((employee) =>
    employee.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lastEmployeeIndex = page * employeesPerPage;
  const firstEmployeeIndex = lastEmployeeIndex - employeesPerPage;
  const paginatedEmployees = filteredEmployees.slice(
    firstEmployeeIndex,
    lastEmployeeIndex
  );
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  const toggleFilterOption = (option: keyof FilterOptions) => {
    setFilterOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  return (
    <div className="max-md:mb-20 w-full max-md:w-screen max-md:min-h-screen flex max-h-screen overflow-y-scroll flex-col place-content-start place-items-center p-2 gap-2 flex-grow ">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <button
        className="pl-3 self-start flex items-center gap-2 text-black"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        aria-label="Toggle filters"
      >
        Filter
        <IoFilter />
      </button>
      <EmployeeTable
        employees={paginatedEmployees}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        filterOptions={filterOptions}
        toggleFilterOption={toggleFilterOption}
      />
      <Pagination totalPages={totalPages} page={page} setPage={setPage} />
    </div>
  );
};

export default ListeEmployees2;
