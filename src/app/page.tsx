"use client";
import { useState, useEffect } from "react";
import { participants as data } from "@/../constants/data"; // Import data from constants
import { Diagnosis, Participant } from "@/app/types/participant";
import { CodeDiagnosis } from "@/app/types/codeDiagnosis";

// Simulated API fetch function for additional details
const fetchParticipantDetails = async (diagnoses: Diagnosis[] = []) => {
  let resp: CodeDiagnosis[] = [];
  let i: number = 0;
  
  try {
    const getFormattedData = async () => {
      await Promise.all(diagnoses.map(async (ele) => {
        const url: string = `https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code%2Cname&terms=${ele.icdCode}`;
        const data = await fetch(url);
        const dataJson = await data.json();
        const size = dataJson.length;
        
        for (const codeDesc of dataJson[size - 1]) {
          resp.push({ id: i, icdCode: codeDesc[0], description: codeDesc[1] });
          i++;
        }
        return resp;
      }));
    };
    
    await getFormattedData();
    return resp;
  } catch (err) {
    console.error("Error fetching participant details:", err);
  }
};

export default function Participants() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [sortBy, setSortBy] = useState<"name" | "icdCount">("icdCount");
  const [participants, setParticipants] = useState<Participant[]>(data);
  const [currentPage, setCurrentPage] = useState(1);
  const participantsPerPage = 10;
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [participantDetails, setParticipantDetails] = useState<CodeDiagnosis[]>([]);

  // Reset to first page whenever search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Filter participants based on search term
  const filteredParticipants = participants.filter((participant) =>
    `${participant.firstName} ${participant.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Sorting logic based on selected column
  const sortedParticipants = [...filteredParticipants].sort((a, b) => {
    if (sortBy === "icdCount") {
      const countA = a.diagnoses.length;
      const countB = b.diagnoses.length;
      return sortDirection === "asc" ? countA - countB : countB - countA;
    } else {
      const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
      const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
      return sortDirection === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    }
  });

  // Get current participants after filtering and sorting
  const indexOfLastParticipant = currentPage * participantsPerPage;
  const indexOfFirstParticipant = indexOfLastParticipant - participantsPerPage;
  const currentParticipants = sortedParticipants.slice(indexOfFirstParticipant, indexOfLastParticipant);

  // Handle sorting
  const handleSort = (column: "name" | "icdCount") => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  // Handle pagination
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Handle row click to view participant details
  const handleRowClick = async (participant: Participant) => {
    setSelectedParticipant(participant);
    const details: CodeDiagnosis[] = await fetchParticipantDetails(participant.diagnoses) || [];
    setParticipantDetails(details);
  };

  // Handle back button click to return to the table
  const handleBackButtonClick = () => {
    setSelectedParticipant(null);
    setParticipantDetails([]);
  };

  return (
    <div className="p-10">
      {selectedParticipant ? (
        <>
          <div className="p-5">
            <button
              onClick={handleBackButtonClick}
              className="text-white bg-[#4D7EF8] hover:bg-[#3A6AD4] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            >
              &lt; Back
            </button>
          </div>
          <div className="bg-white shadow-xl rounded-xl p-5">
            <h2 className="font-semibold text-lg">
              {selectedParticipant.firstName} {selectedParticipant.lastName}
            </h2>
            <hr />
            <div className="mt-4">
              {participantDetails.length > 0 ? (
                participantDetails.map((keyval) => (
                  <div key={keyval.id} className="flex justify-between items-center bg-gray-50 border border-gray-300 rounded-lg p-4 mb-2">
                    <span className="text-gray-700 font-semibold">{keyval.description}</span>
                    <span className="text-blue-600 font-semibold">{keyval.icdCode}</span>
                  </div>
                ))
              ) : (
                <p className="mt-2 text-gray-500">No ICD details available.</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <h2 className="font-semibold text-blue-900 text-2xl">Participants</h2>
          <br />
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="overflow-y-auto shadow-xl rounded-xl border border-gray-300">
            <table className="min-w-full table-auto bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left cursor-pointer font-semibold text-gray-700" onClick={() => handleSort("name")}>
                    <div className="flex items-center">
                      Participant Name
                      {sortBy === "name" && (
                        <img src={sortDirection === "asc" ? "/orderFilter_Up.png" : "/orderFilter_Down.png"} alt="sort" className="ml-2 w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-2 text-left cursor-pointer font-semibold text-gray-700" onClick={() => handleSort("icdCount")}>
                    <div className="flex items-center">
                      ICD Codes
                      {sortBy === "icdCount" && (
                        <img src={sortDirection === "asc" ? "/orderFilter_Up.png" : "/orderFilter_Down.png"} alt="sort" className="ml-2 w-4 h-4" />
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentParticipants.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="px-4 py-2 text-center text-gray-500">
                      No participants found
                    </td>
                  </tr>
                ) : (
                  currentParticipants.map((participant, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => handleRowClick(participant)}>
                      <td className="px-4 py-2">{participant.firstName} {participant.lastName}</td>
                      <td className="px-4 py-2">{participant.diagnoses.length}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Pagination */}
      {!selectedParticipant && (
        <div className="flex justify-center mt-4">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 mx-2 bg-gray-300 rounded-lg disabled:opacity-50">Previous</button>
          <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastParticipant >= sortedParticipants.length} className="px-4 py-2 mx-2 bg-gray-300 rounded-lg disabled:opacity-50">Next</button>
        </div>
      )}
    </div>
  );
}
