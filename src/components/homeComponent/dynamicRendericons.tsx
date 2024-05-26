import { SlCalender } from "react-icons/sl";
import { LuHome } from "react-icons/lu";
import { IoBriefcaseOutline } from "react-icons/io5";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { FiUsers } from "react-icons/fi";
import { GoTasklist } from "react-icons/go";
import { FaRegStickyNote } from "react-icons/fa";
import { MdOutlineGTranslate } from "react-icons/md";
import { PiFileAudio } from "react-icons/pi";
import { GoDependabot } from "react-icons/go";
import { GoLaw } from "react-icons/go";

export const getIconComponent = (icon: string) => {
    const size = 15
    switch (icon) {
        case "dashboard":
            return <LuHome size={size} />;
        case "cases":
            return <IoBriefcaseOutline size={size} />;
        case "calender":
            return <SlCalender size={size} />;
        case "tasks":
            return <GoTasklist size={size + 2} />
        case "notes":
            return <FaRegStickyNote size={size} />
        case "invoices":
            return <LiaFileInvoiceDollarSolid size={size} />
        case "clients":
            return <FiUsers size={size} />
        // Add cases for other icons
        default:
            return null; // or some default icon component
    }
};


export const getFeatureCompoentIcon = (icon: string) => {
    const size = 16
    switch (icon) {
        case "Translate Document":
            return <MdOutlineGTranslate size={size+1} />;
        case "Audio Transcription":
            return <PiFileAudio size={size+1} />;
        case "Ipc-bot":
            return <GoDependabot size={size} />;
        case "Retrieval":
            return <GoLaw size={size} />
        case "Document OCR":
            return <FaRegStickyNote size={size} />
        case "chat-doc":
            return <LiaFileInvoiceDollarSolid size={size} />
        default:
            return null;
    }
};