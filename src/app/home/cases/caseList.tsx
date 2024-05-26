import { useEffect, useState } from 'react';
import clientConnectionWithSupabase from "@/lib/supabase/client";
import Link from "next/link";

const supabase = clientConnectionWithSupabase()

const CaseList = () => {
  const [cases, setCases] = useState<any[]>([]);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const { data, error } = await supabase.from('votum_cases').select('*').order('id', { ascending: true });
        if (error) {
          throw error;
        }
        setCases(data || []);
      } catch (error) {
        console.error('Error fetching cases:', error);
        // Handle error here
      }
    };

    fetchCases();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-4">List of Cases</h1>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Case Type</th>
            <th className="px-4 py-2">Case Number</th>
            <th className="px-4 py-2">Petitioner and Advocate</th>
            <th className="px-4 py-2">Respondent and Advocate</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((caseData, index) => (
            <tr key={caseData.id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{caseData['Case Type']}</td>
              <td className="border px-4 py-2">{caseData['CNR Number']}</td>
              <td className="border px-4 py-2">{caseData['Petitioner and Advocate']}</td>
              <td className="border px-4 py-2">{caseData['Respondent and Advocate']}</td>
              <td className="border px-4 py-2">
              <Link href={{
              pathname : "/home/cases/usercase",
              query : {
                id : caseData.id
              }
            }}>
            <button 
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-150 ease-in-out"
            >
              View Details
            </button></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CaseList;
