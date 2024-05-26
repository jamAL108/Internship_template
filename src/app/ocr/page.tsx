import Nav from "../../components/commonComponent/nav";
import Translate from "./translateCOMP";
import Features from "@/components/translate/features";
import EvaluateComp from '@/components/translate/evaluatecomponent'
import CorrectionComp from '@/components/translate/correctioncomponent'
const Page = () => {
  return (
    <div className="bg-[#FAFAFA] dark:bg-transparent  overflow-x-hidden flex items-center justify-center flex-col md:w-[100%] base:w-[100%]">
      <Nav />
      <div className="md:w-[min(85vw,1100px)] base:w-[90vw] flex flex-col items-center justify-start mb-[40px]">
        <h1 className="font-pop base:text-[2rem] md:text-[5rem] mt-6 text-center md:leading-[100px]">
          Turning documents into  global dialogues.
        </h1>
        <p className="w-[80%] mt-[40px] text-center text:sm text-muted-foreground">
          Our document translation app merges advanced AI with expert review,
          delivering swift, precise, and reliable translations, setting a new
          standard in efficiency and accuracy.
        </p>
        <p className="w-[80%] mt-[10px] text-center text:sm text-muted-foreground">
          Alongside accuracy , we value privacy as our topmost concern.
          Translation happens on the fly and no data is ever stored on the
          servers. We also deploy state-of-the-art encryption algorithms to
          prevent any data leaks and maintain high security standards.
        </p>
        {/* <div className="w-[100%] mxn-h-[10px] flex items-center justify-center"> */}
        {/* <img className='w-[300px] h-[180px]' src="/images/trnaslate1.png" alt="dsv" />

        <img className='w-[100px] h-[130px]' src="/images/verify.png" alt="sdc" />

        <img className='w-[120px] h-[120px]' src="/images/downloadi.png" alt="sd" /> */}
        {/* </div> */}
      </div>
      <Translate />
      <Features/>
      <EvaluateComp/>
      <CorrectionComp/>
    </div>
  );
};

export default Page;

