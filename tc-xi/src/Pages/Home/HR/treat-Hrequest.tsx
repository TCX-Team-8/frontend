// @ts-nocheck
import { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { HiX } from "react-icons/hi";
import HolidayRequestCard from "./Components/Request-card";
import HolidayRequest from "./Components/CongesAccepte";

export default function VacationRequestManager() {
  const [status, setStatus] = useState<string>("Pending");
  const [selected, setSelected] = useState<"untreated" | "treated">("untreated");
  const [openFilter, setOpenFilter] = useState(false);
  const [filterState, setFilterState] = useState({
    SSN: false,
    firstName: false,
    lastName: false,
    email: false,
    address: false,
    type: false,
    starttime: false,
    endtime: false,
    reason: false,
  });
  const [open, setOpen] = useState(false);

  const [vacationRequests, setVacationRequests] = useState({
    untreated: [],
    treated: [],
  });

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/vacation-requests");
        const data = await response.json();
        // Add status property to each request (assuming the API returns status)
        setVacationRequests({
          untreated: data.untreated.map((req: any) => ({
            ...req,
            status: "Pending", // Default status if not provided
          })),
          treated: data.treated.map((req: any) => ({
            ...req,
            status: req.status || "Approved", // Fallback to "Approved" if no status
          })),
        });
      } catch (error) {
        console.error("Failed to fetch vacation requests:", error);
        // Initialize with default data in case of an error
        setVacationRequests({
          untreated: [
            {
              SSN: "38469301",
              firstName: "Tarek",
              lastName: "Si Bachir",
              email: "tarek.sibachir@example.com",
              address: "123 Main St",
              type: "Full-Time",
              starttime: "2023-12-25",
              endtime: "2024-01-01",
              reason: "Family vacation during the holidays.",
              status: "Pending", // Default status
            },
          ],
          treated: [
            {
              SSN: "38469301",
              firstName: "Ali",
              lastName: "Ben Ahmed",
              email: "ali.benahmed@example.com",
              address: "456 Elm St",
              type: "Part-Time",
              starttime: "2023-12-20",
              endtime: "2023-12-28",
              reason: "Attending a wedding abroad.",
              status: "Approved", // Default status
            },
          ],
        });
      }
    };

    fetchRequests();
  }, []);

  const renderRequests = () => {
    const documents =
      selected === "untreated"
        ? vacationRequests.untreated
        : vacationRequests.treated;

    return documents.map((request, index) => (
      <div key={index}>
        <HolidayRequestCard
          key={index}
          firstName={request.firstName}
          lastName={request.lastName}
          email={request.email}
          type={request.type}
          starttime={request.starttime}
          endtime={request.endtime}
          reason={request.reason}
          treated={selected === "treated"}
          status={request.status} // Pass the status to the card
          setOpen={() => {
            setOpen(true);
          }}
        />
      </div>
    ));
  };

  const toggleFilter = (filter: keyof typeof filterState) => {
    setFilterState((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  return (
    <div className="relative w-[90vw] max-sm:w-screen max-sm:pb-20">
      {/* Request selection UI */}
      <div className="flex place-items-center place-content-center gap-4 md:gap-6 xl:gap-20 py-5">
        <div
          onClick={() => setSelected("untreated")}
          className="cursor-pointer flex flex-col items-center gap-2"
        >
          <h1 className="text-xl text-black font-medium">Untreated Requests</h1>
          <div
            className={`w-32 md:w-52 h-2 rounded-xl ${
              selected === "treated" ? "bg-ThirdBlue" : "bg-PrimaryBlue"
            }`}
          ></div>
        </div>
        <div
          onClick={() => setSelected("treated")}
          className="cursor-pointer flex flex-col items-center gap-2"
        >
          <h1 className="text-xl text-black font-medium">Treated Requests</h1>
          <div
            className={`w-32 md:w-52 h-2 rounded-xl ${
              selected === "untreated" ? "bg-ThirdBlue" : "bg-PrimaryBlue"
            }`}
          ></div>
        </div>
      </div>

      {/* Filter UI */}
      <div>
        <div
          className="flex items-center sm:text-xl bg-PrimaryBlue w-fit text-white rounded-r-xl p-1 font-xl cursor-pointer"
          onClick={() => setOpenFilter(!openFilter)}
        >
          <h2>Filter by</h2>
          <IoIosArrowDown />
        </div>
        {openFilter && (
          <div className="flex gap-4 p-4 flex-wrap">
            {Object.keys(filterState).map((filter) => (
              <div
                key={filter}
                className={`flex items-center border-2 py-1 px-2 rounded-lg cursor-pointer ${
                  filterState[filter as keyof typeof filterState]
                    ? "bg-ThirdBlue border-PrimaryBlue"
                    : "border-[#747775]"
                }`}
                onClick={() => toggleFilter(filter as keyof typeof filterState)}
              >
                <p>{filter.charAt(0).toUpperCase() + filter.slice(1)}</p>
                {filterState[filter as keyof typeof filterState] && <HiX />}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Render Vacation Requests */}
      <div className="flex sm:pl-20 sm:place-content-start place-content-center place-items-center">
        <div className="w-full flex flex-col place-items-center place-content-start sm:flex-row sm:flex-wrap gap-4 p-4">
          {renderRequests()}
        </div>
      </div>

      {/* Modal for Request Details */}
      {open && (
        <div
          className="top-0 max-sm:-top-24 left-0  md:left-[15vw] w-full bg-transparent backdrop-blur-sm h-screen fixed flex items-start justify-center z-50 overflow-scroll"
          onClick={() => setOpen(false)} // Closes popup on outside click
        >
          <div
            onClick={(e) => e.stopPropagation()} // Prevents click from propagating to the outer div
            className="relative z-10 top-24"
          >
            <HolidayRequest
              employee={{
                SSN: "38469301",
                firstName: "Ali",
                lastName: "Ben Ahmed",
                email: "ali.benahmed@example.com",
                address: "456 Elm St",
                type: "Part-Time",
                starttime: "2023-12-20",
                endtime: "2023-12-28",
              }}
              setOpen={setOpen}
              reason={"Family vacation during the holidays."}
              status={status} // Status of the request
              setStatus={setStatus} // Set status function to update status
            />
          </div>
        </div>
      )}
    </div>
  );
}
