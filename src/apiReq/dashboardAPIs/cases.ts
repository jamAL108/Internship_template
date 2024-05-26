"use client";
import clientConnectionWithSupabase from "@/lib/supabase/client";

export const getAllCases = async () => {
  const supabase = clientConnectionWithSupabase();
  const userDetails: any = localStorage.getItem("VotumUserDetails");
  const parsedUserDetails = JSON.parse(userDetails);
  console.log(parsedUserDetails);
  if (parsedUserDetails === null) {
    return { error: "User session Not Found" };
  }
  let { data: votum_user_cases, error } = await supabase
    .from("votum_user_cases")
    .select("*")
    .eq("user_id", parsedUserDetails.id)
    .order("created_at");

  if (error === null) {
    return { success: true, data: votum_user_cases };
  } else {
    return { success: false, error: error.message };
  }
};

export const getCaseFromBackend = async (cnrNumber: string) => {
  const formData = {
    searchType: "CNR Number",
    cnrNumber: cnrNumber,
    court: "district court",
  };

  const response = await fetch("https://scraper-api.thevotum.com/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    return { success: false, error: "Failed to fetch data" };
  }
  const data: any = await response.json();
  console.log(data);
  return { success: true, data };
};

export const addCase = async (caseData: any) => {
  const supabase = clientConnectionWithSupabase();
  const userDetails: any = localStorage.getItem("VotumUserDetails");
  const parsedUserDetails = JSON.parse(userDetails);
  console.log(parsedUserDetails);
  if (parsedUserDetails === null) {
    return { error: "User session Not Found" };
  }
  const dataToSave = {
    ...caseData,
    user_id: parsedUserDetails.id,
  };
  console.log("Data to Save:", dataToSave);
  const { data, error } = await supabase
    .from("votum_user_cases")
    .insert([dataToSave])
    .select();
  if (error !== null) {
    return { success: false, error: error.message };
  } else {
    return { success: true };
  }
};

export const getCase = async (caseId: string) => {
  const supabase = clientConnectionWithSupabase();
  const userDetails: any = localStorage.getItem("VotumUserDetails");
  const parsedUserDetails = JSON.parse(userDetails);
  console.log(parsedUserDetails);
  if (parsedUserDetails === null) {
    return { error: "User session Not Found" };
  }
  let { data: votum_user_cases, error } = await supabase
    .from("votum_user_cases")
    .select("*")
    .eq("id", caseId);

  console.log(votum_user_cases);

  if (error === null) {
    return { success: true, data: votum_user_cases };
  } else {
    return { success: false, error: error.message };
  }
};

export const deleteCase = async (caseID: string) => {
  const supabase = clientConnectionWithSupabase();
  let { error } = await supabase
    .from("votum_user_cases")
    .delete()
    .eq("id", caseID);

  if (error === null) {
    return { success: true };
  } else {
    return { success: false, error: error.message };
  }
};
