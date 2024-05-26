"use client";
import { useState } from "react";
import Nav from "../../components/commonComponent/nav";

import { predictStatutes } from "@/apiReq/statute";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SyncLoader } from "react-spinners";
import { toast } from "react-toastify";
import jsonData from "@/utils/pairs.json";

const Page = () => {
  const [predictedStatute, setPredictedStatute] = useState<any>([]);
  const [predictedBNSStatute, setPredictedBNSStatute] = useState<any>([]);
  const [loading, setloading] = useState<boolean>(false)
  const [loadBNS, setLoadBNS] = useState<boolean>(false)
  const [firContent, setFirContent] = useState<string>("");
  const [language, setLanguage] = useState<string>("English");

  const extractNumberFromIPCString = (ipcString: string) => {
    const match = ipcString.match(/IPC_(\d+)/);

    if (match) {
      const numberPart = match[1];
      const number = parseInt(numberPart, 10);
      return number.toString();
    } else {
      console.error(`No match found in the input string: ${ipcString}`);
      return null;
    }
  };

  const convertToBNS = (ipc: string) => {
    const ipc_list = ipc.split(",");

    const bns_list = [];
    for (const i of ipc_list) {
      console.log(i);
      if (i.toLowerCase().includes("ipc")) {
        const ipc_num = extractNumberFromIPCString(i);
        console.log(ipc_num);
        const a = jsonData.find((item) => item.ipc.split("_")[1] == ipc_num);
        if (a !== undefined) {
          bns_list.push(a.bns);
        } else {
          console.error(`Item with IPC ${i} not found in jsonData.`);
        }
      } else {
        bns_list.push(i);
      }
    }
    return bns_list;
  };

  const PredictFunction = async () => {
    setPredictedStatute("")
    setPredictedBNSStatute("")
    setloading(true)
    setLoadBNS(true)
    const resp: any = await predictStatutes(firContent, language);
    if (resp.success === true) {
      console.log(resp.statutesList[0])
      let result = resp.statutesList[0].replace(/^\[|\]$/g, "")
      console.log(predictedStatute)
      setPredictedStatute(result.split(", "))
      setloading(false)
      setPredictedBNSStatute(convertToBNS(result))
      setLoadBNS(false)
    } else {
      toast.error(resp.asStatus, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
      setloading(false)
      setLoadBNS(false)
    }
  }

  return (
    <div className="bg-[#FAFAFA] dark:bg-transparent  overflow-x-hidden flex items-center flex-col md:w-[100%] base:w-[100%] min-h-[100vh] ">
      <Nav />
      <div className="md:w-[min(90vw,1700px)] base:w-[90vw] flex flex-col items-center justify-start">
        <div className="mt-[20px] w-full flex flex-col jusitfy-center gap-2">
          <h1 className="text-[2rem] font-[600]">Statute Prediction</h1>
          <p className="mt-[-5px] text-[1rem] font-[450] text-muted-foreground">
            Uses AI to analyze the FIR content and intelligently predict
            applicable statutes.
          </p>
        </div>

        <div className="w-full flex justify-center items-center mt-[40px] mb-[40px]">
          <Card className="base:w-full tv:w-[84%] min-[1500px]:w-full min-h-[70vh]">
            <CardHeader>
              <CardTitle>Predict Your Statute</CardTitle>
              <CardDescription>Enter All Details properly</CardDescription>
            </CardHeader>
            <CardContent className="w-full flex gap-[40px] base:flex-col md:flex-row">
              <form className="base:w-full md:w-[48%] min-h-[300px]">
                <div className="grid w-full items-center gap-4 min-[1500px]:gap-6">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Enter the FIR:</Label>
                    <Textarea
                      value={firContent}
                      onChange={(e) => {
                        setFirContent(e.target.value);
                      }}
                      id="name"
                      placeholder="Type or paste the FIR here..."
                      className="base:min-h-[190px] md:min-h-[170px] min-[1500px]:min-h-[260px]"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Select Language</Label>
                    <Select
                      value={language}
                      onValueChange={setLanguage}
                      defaultValue="English"
                    >
                      <SelectTrigger id="framework">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Hindi">Hindi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>

              <div className="base:w-full md:w-[48%] flex flex-col gap-[40px]">
                <div className="base:w-full md:w-[80%] flex flex-col space-y-1.5">
                  <Label htmlFor="name">Predicted Statute:</Label>
                  <div className="w-full !min-h-[130px] base:h-[130px] md:h-auto  border-[2px] border-[#E5E7EB] rounded-[6px]">
                    {predictedStatute.length !== 0 ? (
                      <div className="w-full h-full px-[6px] py-[3px]">
                        {predictedStatute.map((statute: any, index: number) => (
                          <h1>{statute.replace(/^'+|'+$/g, "")}</h1>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-[#F5F5F8] w-full h-full flex justify-center items-center">
                        {loading === true ? (
                          <SyncLoader
                            color={"#029BE6"}
                            loading={loading}
                            size={10}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        ) : (
                          <p className="text-[0.92rem] font-[400] text-muted-foreground">
                            Result will be displayed here.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="base:w-full md:w-[80%] flex flex-col space-y-1.5">
                  <Label htmlFor="name">Predicted BNS Statute:</Label>
                  <div className="w-full !min-h-[130px] base:h-[130px] md:h-auto  border-[2px] border-[#E5E7EB] rounded-[6px]">
                    {predictedBNSStatute.length !== 0 ? (
                      <div className="w-full h-full px-[6px] py-[3px]">
                        {predictedBNSStatute.map(
                          (statute: any, index: number) => (
                            <h1>{statute}</h1>
                          )
                        )}
                      </div>
                    ) : (
                      <div className="bg-[#F5F5F8] w-full h-full flex justify-center items-center">
                        {loadBNS === true ? (
                          <SyncLoader
                            color={"#029BE6"}
                            loading={loadBNS}
                            size={10}
                            aria-label="Loading Spinner"
                            data-testid="loadBNS"
                          />
                        ) : (
                          <p className="text-[0.92rem] font-[400] text-muted-foreground">
                            Result will be displayed here.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="base:mt-[40px] md:mt-auto base:w-full md:w-[50%] flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button
                className="bg-[#029BE6] hover:bg-[#004FC5]"
                onClick={PredictFunction}
              >
                Submit
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
