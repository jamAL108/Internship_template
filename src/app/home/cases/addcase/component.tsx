"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  ChevronDown,
  LayoutGrid,
  List,
  ListFilter,
  MapPin,
  MoreHorizontal,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { BiSolidDetail } from "react-icons/bi";
import { FaRegCheckCircle } from "react-icons/fa";
import courtData from "./converted_court_data.json";

import { toast } from "react-toastify";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ColorRing } from "react-loader-spinner";

import CaseCard from "./caseCard";

const forums = ["District Courts"];

const caseTypes = [
  "Anticipatory Bail App. - Anticipatory Bail Application under section 438 CrPC",
  "Arbitration",
  "Arbitration Cases",
  "Arbitration Execution",
  "Assesement Appeal",
  "Bail Appl.",
  "Bail Application",
  "Caveat Application",
  "Ceiling Appeal",
  "Civil Appeal",
  "Civil Revision.",
  "CIVIL REVISION",
  "Civil Suit",
  "Claim Petition",
  "Complaint Cases",
  "Criminal Appeal",
  "CRIMINAL APPEAL",
  "Criminal Bail Cancellation",
  "Criminal Misc",
  "Criminal  Misc. Cases",
  "Criminal Revision.",
  "CRIMINAL REVISION",
  "Crl. Case - Criminal Case",
  "D.p. Misc.",
  "E.c. Act - Essential Commodities Act",
  "Ec Act - Essential Commodities  Act",
  "Election Petition.",
  "ELECTION PETITION",
  "EXECUTION",
  "Execution case",
  "Execution Cases",
  "Final Report.",
  "FINAL REPORT",
  "First Appeal",
  "First Appeal From Order",
  "Guardian Wards Act - Guardian and Wards Act",
  "Human Rights",
  "Insolvency",
  "Judge Small Cause Court Case",
  "Juvenile Cases",
  "Land Acquisition Act",
  "Land Acquisition Case",
  "Macp - Motor Accident Claim Tribunal",
  "Maintenance",
  "Matrimonial",
  "Misc.70",
  "Misc. 74 - Misc.74",
  "Misc.  Appeal - Miscellaneous  Appeal",
  "Misc.civil",
  "Misc. Civil Appeal",
  "Misc. Civil Cases",
  "Misc. Civil Execution",
  "Misc.Motor Accident Claim Misc.",
  "Misc. Nagar Nigam",
  "Misc. Pa",
  "Motor Accident Claim Petition",
  "Mutation Appeal",
  "Original Suit",
  "P.a.suit",
  "Probate",
  "Regular Civil Appeal",
  "Rent Appeal",
  "Rent Case",
  "Rent Misc/23",
  "Rent Misc/74",
  "Rent Revision",
  "Restoration",
  "Restoration Misc",
  "S.c.c.revision",
  "Scc Suit - S.C.C. Suit",
  "Sec.174a Ipc Vis-a-vis Sec.195",
  "Second Appeal",
  "Sessions Case",
  "Sessions Trial",
  "Special Criminal Case",
  "Special  Sessions Trial - Special Sessions Trial",
  "Spl. Crl. Case(n.d.p.s. Act) - Special Crl. Case(NDPS Act)",
  "Succession",
  "Summon Trial Case",
  "Warrant Case",
  "Warrant or Summons Criminal Case",
];
const currentYear = new Date().getFullYear();
const years = Array.from(
  { length: currentYear - 1950 + 1 },
  (v, k) => currentYear - k
);

// Define interfaces for your data structures
interface Court {
  text: string;
  value: string;
}

interface District {
  text: string;
  value: string;
  courts: Court[];
}

interface StateCourts {
  districts: District[];
}

interface CourtData {
  [key: string]: StateCourts;
}

const AddCaseComponent: React.FC = () => {
  // case result
  const [caseData, setCaseData] = useState<any>(null);
  const [advCases, setAdvCases] = useState(null);

  // common states
  const [selectedForum, setSelectedForum] = useState<string | null>(null);
  const [searchType, setSearchType] = useState<string | null>(null);
  const [stateName, setStateName] = useState("");
  const [distName, setDistName] = useState("");
  const [complexName, setComplexName] = useState("");

  const [states, setStates] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string>("");
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [courts, setCourts] = useState<Court[]>([]);
  const [selectedCourt, setSelectedCourt] = useState<string>("");

  //states of advocate name ui
  const [advName, setAdvName] = useState("");
  const [status, setStatus] = useState("");
  //states of case ui
  const [caseYear, setCaseYear] = useState<any>("");
  const [caseNo, setCaseNo] = useState("");
  const [caseType, setCaseType] = useState("");

  const [searchLoader, setSearchLoader] = useState<boolean>(false);

  const [searchedData, setSearchedData] = useState<any>([]);

  useEffect(() => {
    // Extract states from the data
    setStates(Object.keys(courtData as CourtData));
  }, []);

  useEffect(() => {
    // Update districts when a state is selected
    if (selectedState) {
      setDistricts((courtData as CourtData)[selectedState].districts);
    }
  }, [selectedState]);

  useEffect(() => {
    // Update courts when a district is selected
    if (selectedDistrict) {
      const district = districts.find((d) => d.text === selectedDistrict);
      if (district) {
        setCourts(district.courts);
      }
    }
  }, [selectedDistrict, districts]);

  const check = async () => {
    setSearchLoader(true);
    setStateError(false);
    setDistrictError(false);
    setCourtError(false);
    setCNRNumberError(false);
    setCaseTypeError(false);
    setCaseYearError(false);
    setadvocateNameError(false);
    if (
      selectedState.length === 0 ||
      selectedDistrict.length === 0 ||
      selectedCourt.length === 0
    ) {
      if (selectedState.length === 0) {
        setStateError(true);
      }
      if (selectedDistrict.length === 0) {
        setDistrictError(true);
      }
      if (selectedCourt.length === 0) {
        setCourtError(true);
      }
      setCourtOpen(true);
      toast.error("Please Provide court details.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setSearchLoader(false);
    } else if (searchType === null) {
      setSearchByOpen(true);
      toast.error("Please Provide Filters.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setSearchLoader(false);
    } else {
      if (
        searchType === "caseNumber" &&
        (caseYear.length === 0 || caseNo.length === 0 || caseType.length === 0)
      ) {
        if (caseYear.length === 0) {
          setCNRNumberError(true);
        }
        if (caseNo.length === 0) {
          setCaseTypeError(true);
        }
        if (caseType.length === 0) {
          setCaseYearError(true);
        }
        setDetailOpen(true);
        toast.error("Please Provide case details.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setSearchLoader(false);
      } else if (searchType === "advocateName" && advName.length === 0) {
        setadvocateNameError(true);
        setDetailOpen(true);
        toast.error("Please Provide case details.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setSearchLoader(false);
      } else {
        if (searchType === "advocateName") {
          handleAdvocateSearch();
        } else {
          handleCaseNoSearch();
        }
      }
    }
  };

  const handleAdvocateSearch = async () => {
    // Construct the form data object
    setCaseData(null);
    const formData = {
      searchType: "Advocate",
      state: selectedState,
      district: selectedDistrict,
      courtComplex: selectedCourt,
      caseStaus: status,
      Advocate: advName,
    };
    setSearchedData(formData);
    console.log(formData);
    toast.warn("This may take a few minutes", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    // Use fetch to send the form data to the backend
    try {
      const response = await fetch("http://localhost:3001/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setSearchLoader(false);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse JSON response
      const result = await response.json();
      console.log(result);
      setAdvCases(result);
      setSearchLoader(false);

      // Handle the response data as needed
      // For example, you might want to update the state with the result,
      // show a success message, or navigate to another page
    } catch (error) {
      console.error("Failed to submit the form:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  const handleCaseNoSearch = async () => {
    setCaseData(null);
    // Construct the form data object
    const formData = {
      searchType: "Case Number",
      state: selectedState,
      district: selectedDistrict,
      courtComplex: selectedCourt,
      caseType: caseType,
      caseNumber: caseNo,
      Year: caseYear,
      court: "district court",
    };
    setSearchedData(formData);
    console.log(formData);
    toast.warn("This may take a few minutes", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    // Use fetch to send the form data to the backend

    const URL = "https://scraper-api.thevotum.com/search";
    // const URL = 'http://localhost:3001/search'
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setSearchLoader(false);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Parse JSON response
      const result = await response.json();
      console.log(result);
      if (Array.isArray(result)) {
        setCaseData(result);
      } else {
        toast.error("Error is fetching the Data", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      setSearchLoader(false);

      // Handle the response data as needed
      // For example, you might want to update the state with the result,
      // show a success message, or navigate to another page
    } catch (error) {
      console.error("Failed to submit the form:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  const [caseListArray, setCaseListArray] = useState<any>([]);
  const [caseTypeOpen, setCaseTypeOpen] = useState<boolean>(false);

  const [searchByOpen, setSearchByOpen] = useState<boolean>(false);
  const [courtOpen, setCourtOpen] = useState<boolean>(false);
  const [detailOpen, setDetailOpen] = useState<boolean>(false);
  const [stateError, setStateError] = useState<boolean>(false);
  const [districtError, setDistrictError] = useState<boolean>(false);
  const [courtError, setCourtError] = useState<boolean>(false);
  const [advocateNameError, setadvocateNameError] = useState<boolean>(false);
  const [cnrNumberError, setCNRNumberError] = useState<boolean>(false);
  const [caseTypeError, setCaseTypeError] = useState<boolean>(false);
  const [caseYearError, setCaseYearError] = useState<boolean>(false);

  const [caseViewList, setCaseViewList] = useState<boolean>(false);

  function shrinkString(input: string, threshold: number): string {
    if (input.length <= threshold) {
      return input;
    } else {
      return input.slice(0, threshold) + "...";
    }
  }

  function splitStringAndPreserve(
    inputString: string,
    delimiter: string
  ): string[] {
    const array = inputString.split(delimiter);
    const newArray: string[] = [];

    array.forEach((item, index) => {
      if (index < array.length - 1) {
        newArray.push(item.trim(), delimiter.trim());
      } else {
        newArray.push(item.trim());
      }
    });
    return newArray;
  }

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <div className="w-full px-[25px] base:py-[15px] tv:py-[13px] border-b-[2px] flex justify-between items-center topComponentOfAddClient">
        <div className=" flex gap-2 items-center">
          <h1 className="text-[1.4rem] font-[600] tracking-[0.6px]">
            Add case
          </h1>
          <MoreHorizontal size={20} className="cursor-pointer" />
        </div>
      </div>
      <div className="w-full bl:px-[25px] py-[15px] flex flex-col items-center overflow-y-auto">
        <div className="w-[95%] bg-[#f5f6f8] border base:rounded-[12px] tv:rounded-[40px] py-[10px] flex base:flex-col tv:flex-row base:gap-[16px] tv:gap-[0px] justify-end base:px-[5px] tv:px-[10px]">
          <div className="flex base:justify-center tv:justify-start base:gap-[6px] tv:gap-[0px]">
            <div
              className={`${
                caseListArray.length === 0 ? "hidden" : "flex"
              } h-full`}
            >
              wefrefbtrt
            </div>
            <Separator
              className={`${
                caseListArray.length === 0 ? "hidden" : "flex"
              } min-w-[0.16px] !w-[0.16px] h-full bg-[#6680ff]`}
            />
            <Popover open={courtOpen} onOpenChange={setCourtOpen}>
              <PopoverTrigger asChild>
                <div
                  onClick={(e) => setCourtOpen(true)}
                  className={`base:px-[5px] tv:px-[50px] cursor-pointer ${
                    selectedState.length === 0 ||
                    selectedDistrict.length === 0 ||
                    selectedCourt.length === 0
                      ? "py-[5px]"
                      : "py-[0px]"
                  } flex justify-center items-center base:gap-1 tv:gap-3`}
                >
                  <MapPin color="#6680ff" size={18} />
                  {selectedState.length === 0 ||
                  selectedDistrict.length === 0 ||
                  selectedCourt.length === 0 ? (
                    <h2 className="text-[0.88rem] text-muted-foreground font-[450]">
                      Select Court
                    </h2>
                  ) : (
                    <div className="flex flex-col gap-[0px] justify-center">
                      <h2 className="text-[0.83rem] m-[0px] mb-[-3px] font-[450]">{`${selectedState} | ${selectedDistrict}`}</h2>
                      <h2 className="text-[0.83rem] m-[0px] font-[450]">
                        {selectedCourt}
                      </h2>
                    </div>
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80 rounded-[15px] px-[15px]">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Select Court</h4>
                    <p className="text-sm text-muted-foreground">
                      Set your state , district and court for search
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label
                        htmlFor="width"
                        className={`${
                          stateError === true ? "text-[#ff3333]" : "text-black"
                        }`}
                      >
                        State
                      </Label>
                      <Select
                        onValueChange={(e) => {
                          setSelectedState(e);
                          setSelectedDistrict("");
                          setSelectedCourt("");
                        }}
                        value={selectedState}
                      >
                        <SelectTrigger
                          className={`w-[180px] ${
                            stateError === true
                              ? "border-[#ff3333]"
                              : "border-[#e5e7eb]"
                          }`}
                        >
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[270px] overflow-y-auto">
                          <SelectGroup>
                            <SelectLabel>State</SelectLabel>
                            {states.map((state, index) => (
                              <SelectItem value={state}>{state}</SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label
                        htmlFor="maxWidth"
                        className={`${
                          districtError === true
                            ? "text-[#ff3333]"
                            : "text-black"
                        }`}
                      >
                        District
                      </Label>
                      <Select
                        onValueChange={(e) => {
                          setSelectedDistrict(e);
                          setSelectedCourt("");
                        }}
                        value={selectedDistrict}
                        disabled={selectedState.length === 0 ? true : false}
                      >
                        <SelectTrigger
                          className={`w-[180px] ${
                            districtError === true
                              ? "border-[#ff3333]"
                              : "border-[#e5e7eb]"
                          }`}
                        >
                          <SelectValue placeholder="Select District" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[270px] overflow-y-auto">
                          <SelectGroup>
                            <SelectLabel>District</SelectLabel>
                            {districts.map((district, index) => (
                              <SelectItem key={index} value={district.text}>
                                {district.text}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label
                        htmlFor="height"
                        className={`${
                          courtError === true ? "text-[#ff3333]" : "text-black"
                        }`}
                      >
                        Court
                      </Label>
                      <Select
                        disabled={selectedDistrict.length == 0 ? true : false}
                        onValueChange={(e) => setSelectedCourt(e)}
                        value={selectedCourt}
                      >
                        <SelectTrigger
                          className={`w-[180px] ${
                            courtError === true
                              ? "border-[#ff3333]"
                              : "border-[#e5e7eb]"
                          }`}
                        >
                          <SelectValue placeholder="Select a Court" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[270px] overflow-y-auto">
                          <SelectGroup>
                            <SelectLabel>Court</SelectLabel>
                            {courts.map((court) => (
                              <SelectItem key={court.value} value={court.text}>
                                {court.text}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Separator className="w-[2px] h-full bg-[#6680ff]" />
            <Popover open={searchByOpen} onOpenChange={setSearchByOpen}>
              <PopoverTrigger asChild>
                <div
                  onClick={(e) => setSearchByOpen(true)}
                  className="base:px-[5px] tv:px-[50px] cursor-pointer py-[5px] flex justify-center items-center base:gap-1 tv:gap-3"
                >
                  <ListFilter color="#6680ff" size={18} />
                  {searchType === null ? (
                    <h2 className="text-[0.88rem] text-muted-foreground font-[450] select-none">
                      Search by
                    </h2>
                  ) : (
                    <div className="flex flex-col gap-[0px] justify-center">
                      <h2 className="text-[0.87rem] text-[#6680ff] font-[450]">
                        {`${
                          searchType === "caseNumber"
                            ? "Case Number"
                            : "Advocate Name"
                        }`}
                      </h2>
                    </div>
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Filter by</h4>
                    <p className="text-sm text-muted-foreground">
                      Choose a way to filter the cases.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div
                      onClick={(e) => {
                        setSearchType("caseNumber");
                        // setAdvCases(null)
                        setSearchByOpen(false);
                      }}
                      className={` ${
                        searchType === "caseNumber"
                          ? "bg-[#6680ff] text-white"
                          : "text-black bg-[rgba(239,239,239,0.5)]"
                      } rounded-[7px] flex cursor-pointer justify-between items-center px-[10px] pr-[15px] py-[9px]`}
                    >
                      <h2>Case Number</h2>
                      {searchType === "caseNumber" && (
                        <FaRegCheckCircle size={18} color="white" />
                      )}
                    </div>
                    <div
                      onClick={(e) => {
                        setSearchType("advocateName");
                        // setCaseData(null)
                        setSearchByOpen(false);
                      }}
                      className={` ${
                        searchType === "advocateName"
                          ? "bg-[#6680ff] text-white"
                          : "text-black bg-[rgba(239,239,239,0.5)]"
                      } rounded-[7px] cursor-pointer flex justify-between items-center px-[10px]  pr-[15px]  py-[9px]`}
                    >
                      <h2>Advocate Name</h2>
                      {searchType === "advocateName" && (
                        <FaRegCheckCircle size={18} color="white" />
                      )}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Separator className="w-[2px] h-full bg-[#6680ff]" />
            <Popover open={detailOpen} onOpenChange={setDetailOpen}>
              <PopoverTrigger asChild>
                <div
                  onClick={(e) => setDetailOpen(true)}
                  className="base:px-[5px] tv:px-[50px] cursor-pointer py-[5px] flex justify-center items-center base:gap-1 tv:gap-3"
                >
                  <BiSolidDetail color="#6680ff" size={18} />
                  {stateName.length === 0 ||
                  distName.length === 0 ||
                  complexName.length === 0 ? (
                    <h2 className="text-[0.88rem] text-muted-foreground font-[450]">
                      Case details
                    </h2>
                  ) : (
                    <div className="flex flex-col gap-[0px] justify-center">
                      <h2 className="text-[0.83rem] font-[450]">
                        Maharashtra | Mumbai
                      </h2>
                      <h2 className="text-[0.83rem] font-[450]">
                        Mumbai High Court
                      </h2>
                    </div>
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[22rem] rounded-[10px] px-[15px]">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Case detail</h4>
                    <p className="text-sm text-muted-foreground">
                      provide all the necessary details
                    </p>
                  </div>
                  {searchType === "caseNumber" && (
                    <div className="grid gap-2">
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label
                          htmlFor="height"
                          className={`${
                            caseTypeError === true
                              ? "text-[#ff3333]"
                              : "text-black"
                          }`}
                        >
                          Case type
                        </Label>
                        <DropdownMenu
                          open={caseTypeOpen}
                          onOpenChange={setCaseTypeOpen}
                        >
                          <DropdownMenuTrigger className="border-none outline-none">
                            <div
                              onClick={(e) => setCaseTypeOpen(true)}
                              className={`border-[1.7px] rounded-[8px] flex items-center w-[190px] px-[8px] outline-none py-[5px]  ${
                                caseTypeError === true
                                  ? "border-[#ff3333]"
                                  : "border-[#e5e7eb]"
                              }`}
                            >
                              {caseType.length === 0 ? (
                                <h2 className="text-[0.88rem] text-muted-foreground">
                                  Select case type
                                </h2>
                              ) : (
                                <h2 className="text-[0.83rem] font-[420]">
                                  {shrinkString(caseType, 20)}
                                </h2>
                              )}
                            </div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <Command className="max-h-[300px] overflow-y-auto max-w-[300px]">
                              <CommandInput placeholder="Type a Case or search..." />
                              <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup heading="Case type">
                                  {caseTypes.map((type) => (
                                    <CommandItem
                                      onSelect={(e) => {
                                        setCaseType(type);
                                        console.log("MEOW");
                                        setCaseTypeOpen(false);
                                      }}
                                      key={type}
                                      className="hover:bg-[#e8effe]"
                                      value={type}
                                    >
                                      {type}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label
                          htmlFor="case Number"
                          className={`${
                            cnrNumberError === true
                              ? "text-[#ff3333]"
                              : "text-black"
                          }`}
                        >
                          Case number
                        </Label>
                        <Input
                          onChange={(e) => setCaseNo(e.target.value)}
                          value={caseNo}
                          className={` col-span-2 h-8 w-[190px]  ${
                            cnrNumberError === true
                              ? "border-[#ff3333]"
                              : "border-[#e5e7eb]"
                          }`}
                          placeholder="Enter case Number"
                        />
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label
                          htmlFor="height"
                          className={`${
                            caseYearError === true
                              ? "text-[#ff3333]"
                              : "text-black"
                          }`}
                        >
                          Year
                        </Label>
                        <Select
                          onValueChange={(e) => setCaseYear(parseInt(e, 10))}
                          value={String(caseYear)}
                        >
                          <SelectTrigger
                            className={`w-[190px] ${
                              caseYearError === true
                                ? "border-[#ff3333]"
                                : "border-[#e5e7eb]"
                            }`}
                          >
                            <SelectValue placeholder="Select a year" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[270px] overflow-y-auto">
                            <SelectGroup>
                              <SelectLabel>Year</SelectLabel>
                              {years.map((year) => (
                                <SelectItem key={year} value={String(year)}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                  {searchType === "advocateName" && (
                    <div className="grid gap-2">
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label
                          htmlFor="case Number"
                          className={`${
                            advocateNameError === true
                              ? "text-[#ff3333]"
                              : "text-black"
                          }`}
                        >
                          Advocate Name
                        </Label>
                        <Input
                          value={advName}
                          onChange={(e) => setAdvName(e.target.value)}
                          className={` ${
                            advocateNameError === true
                              ? "border-[#ff3333]"
                              : "border-[#e5e7eb]"
                          } col-span-2 h-8 w-[190px] outline-none `}
                          placeholder="Enter case Number"
                        />
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="height">Select Status</Label>
                        <Select
                          onValueChange={(e) => setStatus(e)}
                          value={status}
                        >
                          <SelectTrigger className="w-[190px]">
                            <SelectValue placeholder="Select a Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Status</SelectLabel>
                              <SelectItem value="Pending">Pending</SelectItem>
                              <SelectItem value="Disposed">Disposed</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <button
            onClick={check}
            disabled={searchLoader}
            style={searchLoader === true ? { opacity: 0.67 } : { opacity: 1 }}
            className="bg-[#6680ff] flex justify-center items-center gap-1 text-white text-[0.9rem] font-[500] rounded-[50px] px-[25px] py-[7px] border-none "
          >
            <ColorRing
              visible={searchLoader}
              height="30"
              width="30"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
            />
            Search case
          </button>
        </div>

        {caseData === null ? (
          <div className="w-full flex justify-center items-center py-[70px] max-h-[500px] flex-col gap-3">
            <img
              src="/images/noClientFound.png"
              alt="sv"
              className="base:w-[200px] tv:w-[230px] base:h-[150px] tv:h-[180px]"
            />
            <h2 className="w-[330px] text-center text-[0.87rem]">
              Select Your Court details , select the filter and add case details
              to find your case.
            </h2>
          </div>
        ) : caseData.length === 0 ? (
          <div className="w-full flex justify-center items-center py-[70px] max-h-[500px] flex-col gap-3">
            <img
              src="/images/noSearchFound.png"
              alt="sv"
              className="base:w-[200px] tv:w-[230px] base:h-[150px] tv:h-[220px]"
            />
            <h2 className="w-[330px] text-center text-[0.87rem]">
              No Result found for what you are searching , try with some other
              values.
            </h2>
          </div>
        ) : (
          <div className="w-full flex flex-col py-[15px] px-[20px]">
            <div className="w-full flex justify-between items-center h-[60px]">
              <h2 className="text-[0.97rem] text-muted-foreground font-[400]">
                Showing:{" "}
                <span className="text-[1.07rem] text-black font-[550] select-none">
                  {caseData.length}
                </span>{" "}
                Search results.
              </h2>
              <div className="flex justify-center items-center gap-5">
                <div className="flex justify-center items-center gap-2">
                  <h2 className="text-[0.97rem] text-muted-foreground">
                    Sort By:
                  </h2>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none">
                      <div className="bg-[#6680ff] flex justify-center items-center gap-1 px-[17px] py-[7px] text-white text-[0.93rem] rounded-[30px]">
                        <h2>Newest</h2>
                        <ChevronDown color="white" size={19} />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[110px] rounded-[10px]">
                      <DropdownMenuItem>Newest</DropdownMenuItem>
                      <DropdownMenuItem>Year</DropdownMenuItem>
                      <DropdownMenuItem>Type</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex justify-center items-center gap-3">
                  <List
                    color="black"
                    onClick={(e) => setCaseViewList(true)}
                    className={`${
                      caseViewList === true ? "opacity-[1]" : "opacity-[0.3]"
                    } cursor-pointer`}
                    size={22}
                  />
                  <LayoutGrid
                    color="black"
                    onClick={(e) => setCaseViewList(false)}
                    className={` ${
                      caseViewList === false ? "opacity-[1]" : "opacity-[0.3]"
                    }   cursor-pointer`}
                    size={22}
                  />
                </div>
              </div>
            </div>
            {caseViewList === false ? (
              <div className="w-full flex flex-wrap justify-between gap-[20px] pt-[2px]">
                {caseData.map((item: any, index: number) => (
                  <CaseCard
                    searchedData={searchedData}
                    item={item}
                    key={index}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col w-full pt-[5px]">
                <div className="w-full min-h-[35px] bg-[#f5f6f8] flex border rounded-[8px]">
                  <h1 className="w-[20%] flex  px-[8px] py-[6px] text-[0.84rem] font-[460]">
                    Type/Number/Year
                  </h1>
                  <h1 className="w-[40%] flex  px-[8px] py-[6px] text-[0.84rem] font-[460]">
                    Petitioner name Versus Respondent name
                  </h1>
                  <h1 className="w-[20%] flex  px-[8px] py-[6px] text-[0.84rem] font-[460]">
                    Advocate
                  </h1>
                  <h1 className="w-[15%] flex  px-[8px] py-[6px] text-[0.84rem] font-[460]">
                    CNR number
                  </h1>
                </div>
                <div className="w-full flex flex-col gap-[5px] pt-[5px]">
                  {caseData.map((item: any, index: number) => (
                    <div className="w-full min-h-[40px] flex border-b-[1px]">
                      <h1 className="w-[20%] flex items-center px-[8px] py-[6px] text-[0.84rem] text-[#6680ff] font-[460]">
                        {item.caseDetails}
                      </h1>
                      <div className="w-[40%] flex flex-col px-[8px] py-[6px] text-[0.84rem] font-[460]">
                        {splitStringAndPreserve(item.parties, "Vs").map(
                          (value, idx) => (
                            <h1>{value}</h1>
                          )
                        )}
                      </div>
                      <h1 className="w-[20%] flex items-center px-[8px] py-[6px] text-[0.84rem] font-[460]">
                        {item.advocate}
                      </h1>
                      <h1 className="w-[15%] flex items-center px-[8px] py-[6px] text-[0.84rem] font-[460]">
                        {item.cnrNumber}
                      </h1>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default AddCaseComponent;
