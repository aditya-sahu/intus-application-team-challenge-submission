"use client";
import { useState } from "react";
import { participants as data } from "@/../constants/data"; // Import data from constants
import { Participant } from "@/app/types/participant";

export default function Participants() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Initialize participants from the imported data
  const [participants, setParticipants] = useState<Participant[]>(data);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const participantsPerPage = 10;

  // Filter participants based on search term
  const filteredParticipants = participants.filter((participant) =>
    `${participant.firstName} ${participant.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Sort participants based on ICD code count
  const sortedParticipants = filteredParticipants.sort((a, b) => {
    const countA = a.diagnoses.length;
    const countB = b.diagnoses.length;

    return sortDirection === "asc" ? countA - countB : countB - countA;
  });

  // Get the current participants for the current page
  const indexOfLastParticipant = currentPage * participantsPerPage;
  const indexOfFirstParticipant = indexOfLastParticipant - participantsPerPage;
  const currentParticipants = sortedParticipants.slice(
    indexOfFirstParticipant,
    indexOfLastParticipant
  );

  // Toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  // Handle page change
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-10">
      <h2 className="font-semibold text-blue-900 text-2xl">Participants</h2> <br />

      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-y-auto shadow-xl rounded-xl border border-gray-300">
        <table className="min-w-full table-auto bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th
                className="px-4 py-2 text-left cursor-pointer font-semibold text-gray-700"
                onClick={toggleSortDirection}
              >
                Participant Name
              </th>
              <th
                className="px-4 py-2 text-left cursor-pointer font-semibold text-gray-700 flex items-center"
                onClick={toggleSortDirection}
              >
                ICD Codes
                <img
                  src={
                    sortDirection === "asc"
                      ? "/orderFilter_Up.png"
                      : "/orderFilter_Down.png"
                  }
                  alt="sort"
                  className="ml-2 w-4 h-4"
                />
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
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{participant.firstName} {participant.lastName}</td>
                  <td className="px-4 py-2">{participant.diagnoses.length}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-gray-300 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage * participantsPerPage >= sortedParticipants.length}
          className="px-4 py-2 mx-2 bg-gray-300 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
