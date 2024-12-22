import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";

// Define a type for employee
interface Employee {
  SSN: string;
  prenom: string;
  nom: string;
  checkInTime: string; // Format: HH:mm
  checkOutTime: string; // Format: HH:mm
  retard: number; // Total number of retard
}
// Sample data for employees
const employeesData: Employee[] = Array.from({ length: 25 }, (_, index) => ({
  SSN: `SSN${index + 1}`,
  prenom: `Prenom${index + 1}`,
  nom: `Nom${index + 1}`,
  checkInTime: `${8 + (index % 3)}:00`, // Randomized check-in times
  checkOutTime: `${16 + (index % 3)}:00`, // Randomized check-out times
  retard: Math.floor(Math.random() * 5), // Random retard
}));

const ListeEmployeesWithAttendance = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  
  const employeesPerPage = 24;
  
  // Filter and paginate employees based on search term
  const filteredEmployees = employeesData.filter(
    (employee) =>
      employee.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const lastEmployeeIndex = page * employeesPerPage;
  const firstEmployeeIndex = lastEmployeeIndex - employeesPerPage;
  const paginatedEmployees = filteredEmployees.slice(
    firstEmployeeIndex,
    lastEmployeeIndex
  );
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);
  
  const TableHeader = () => (
    <div className="w-full flex gap-4 font-bold border-b pb-2 text-gray-700">
      <div className="w-16">SSN</div>
      <div className="w-24">First Name</div>
      <div className="w-24">Last Name</div>
      <div className="w-24">Check-In</div>
      <div className="w-24">Check-Out</div>
      <div className="w-16">retard</div>
    </div>
  );
  
  const EmployeeRow: React.FC<{ employee: Employee,index:number }> = ({ employee,index }) => (
    <div onClick={() => navigate("/hr/"+"353"+"/specific-view/"+employee.SSN)}  className={`w-full flex gap-4 items-center py-2 text-gray-800 bg-ThirdBlue rounded-lg`}>
      <div className="w-16">{employee.SSN}</div>
      <div className="w-24">{employee.prenom}</div>
      <div className="w-24">{employee.nom}</div>
      <div className="w-24">{employee.checkInTime}</div>
      <div className="w-24">{employee.checkOutTime}</div>
      <div className="w-16">{employee.retard}</div>
    </div>
  );
  
  const Pagination = () => (
    <div className="flex justify-center mt-4 gap-2 text-black">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        aria-label="Previous page"
        className="px-2 py-1 border rounded disabled:opacity-50"
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
        className="px-2 py-1 border rounded disabled:opacity-50"
        >
        <MdKeyboardArrowRight />
      </button>
    </div>
  );
  
  const SearchBar = () => (
    <div className="text-black relative z-10 w-full flex justify-center gap-4 p-4">
      <div className="flex rounded-xl border border-gray-400 items-center w-80 md:w-[550px] xl:w-[750px] h-9 px-1">
        <input
          type="search"
          className="bg-transparent focus:outline-none w-full h-full p-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name..."
          />
        <IoIosSearch className="text-xl" />
      </div>
    </div>
  );
  const navigate = useNavigate();
  
  return (
    <div className="max-h-screen max-md:w-screen max-md:overflow-y-visible overflow-y-scroll w-full flex flex-col items-center p-4 gap-4">
      <SearchBar />
      <div className="w-full flex flex-col items-center gap-1">
        <TableHeader />
        {paginatedEmployees.length === 0 ? (
          <div className="text-gray-500 mt-4">No employees found</div>
        ) : (
          paginatedEmployees.map((employee,index) => (
            <EmployeeRow key={employee.SSN} employee={employee} index={index} />
          ))
        )}
      </div>
      <Pagination />
    </div>
  );
};

export default ListeEmployeesWithAttendance;
