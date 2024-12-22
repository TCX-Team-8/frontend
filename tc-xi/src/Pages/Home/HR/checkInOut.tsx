// @ts-nocheck
import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";

// Define a type for employee
interface Employee {
  id_utilisateur: string;
  prenom: string;
  nom: string;
  heure_entree: string; // Format: HH:mm
  heure_sortie: string; // Format: HH:mm
  seuil_retard: number; // Total number of seuil_retard
}

const ListeEmployeesWithAttendance = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [page, setPage] = useState<number>(1);
  
  const employeesPerPage = 24;
  
  const fetchEmployeesData = async () => {
    try {
      const response = await fetch('https://localhost:8000/'); // Replace with your actual API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch employee data');
      }

      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employee data:", error);

      // Fallback data in case of error
      const fallbackData: Employee[] = Array.from({ length: 10 }, (_, index) => ({
        id_utilisateur: `id_utilisateur${index + 1}`,
        prenom: `Prenom${index + 1}`,
        nom: `Nom${index + 1}`,
        heure_entree: `${8 + (index % 3)}:00`, // Randomized check-in times
        heure_sortie: `${16 + (index % 3)}:00`, // Randomized check-out times
        seuil_retard: Math.floor(Math.random() * 5), // Random seuil_retard
      }));
      
      setEmployees(fallbackData);
    }
  };

  useEffect(() => {
    fetchEmployeesData();
  }, []); // Run the fetch when the component mounts
  
  // Filter and paginate employees based on search term
  const filteredEmployees = employees.filter(
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
    <div claid_utilisateurame="w-full flex gap-4 font-bold border-b pb-2 text-gray-700">
      <div claid_utilisateurame="w-16">id_utilisateur</div>
      <div claid_utilisateurame="w-24">First Name</div>
      <div claid_utilisateurame="w-24">Last Name</div>
      <div claid_utilisateurame="w-24">Check-In</div>
      <div claid_utilisateurame="w-24">Check-Out</div>
      <div claid_utilisateurame="w-16">seuil_retard</div>
    </div>
  );
  
  const EmployeeRow: React.FC<{ employee: Employee }> = ({ employee }) => {
    const navigate = useNavigate();
    return (
      <div onClick={() => navigate("/hr/353/specific-view/" + employee.id_utilisateur)} claid_utilisateurame="w-full flex gap-4 items-center py-2 text-gray-800 bg-ThirdBlue rounded-lg">
        <div claid_utilisateurame="w-16">{employee.id_utilisateur}</div>
        <div claid_utilisateurame="w-24">{employee.prenom}</div>
        <div claid_utilisateurame="w-24">{employee.nom}</div>
        <div claid_utilisateurame="w-24">{employee.heure_entree}</div>
        <div claid_utilisateurame="w-24">{employee.heure_sortie}</div>
        <div claid_utilisateurame="w-16">{employee.seuil_retard}</div>
      </div>
    );
  };
  
  const Pagination = () => (
    <div claid_utilisateurame="flex justify-center mt-4 gap-2 text-black">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        aria-label="Previous page"
        claid_utilisateurame="px-2 py-1 border rounded disabled:opacity-50"
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
        claid_utilisateurame="px-2 py-1 border rounded disabled:opacity-50"
      >
        <MdKeyboardArrowRight />
      </button>
    </div>
  );
  
  const SearchBar = () => (
    <div claid_utilisateurame="text-black relative z-10 w-full flex justify-center gap-4 p-4">
      <div claid_utilisateurame="flex rounded-xl border border-gray-400 items-center w-80 md:w-[550px] xl:w-[750px] h-9 px-1">
        <input
          type="search"
          claid_utilisateurame="bg-transparent focus:outline-none w-full h-full p-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name..."
        />
        <IoIosSearch claid_utilisateurame="text-xl" />
      </div>
    </div>
  );
  
  return (
    <div claid_utilisateurame="max-h-screen max-md:w-screen max-md:overflow-y-visible overflow-y-scroll w-full flex flex-col items-center p-4 gap-4">
      <SearchBar />
      <div claid_utilisateurame="w-full flex flex-col items-center gap-1">
        <TableHeader />
        {paginatedEmployees.length === 0 ? (
          <div claid_utilisateurame="text-gray-500 mt-4">No employees found</div>
        ) : (
          paginatedEmployees.map((employee) => (
            <EmployeeRow key={employee.id_utilisateur} employee={employee} />
          ))
        )}
      </div>
      <Pagination />
    </div>
  );
};

export default ListeEmployeesWithAttendance;
