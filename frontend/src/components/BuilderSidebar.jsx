import BuilderButton from "./BuilderButton";
import styles from "./BuilderSidebar.module.css";
import { LuMessageSquare } from "react-icons/lu";
import { CiImageOn } from "react-icons/ci";
import { PiVideoConferenceLight } from "react-icons/pi";
import { PiGifLight } from "react-icons/pi";
import { TbLetterT } from "react-icons/tb";
import { FaHashtag } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { CiPhone } from "react-icons/ci";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { FiCheckSquare } from "react-icons/fi";
import { useForm } from "../Contexts/FormContext";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const bubbles = [
  {
    id: 1,
    name: "Text",
    icon: LuMessageSquare,
  },
  {
    id: 2,
    name: "Image",
    icon: CiImageOn,
  },
  {
    id: 3,
    name: "Video",
    icon: PiVideoConferenceLight,
  },
  {
    id: 4,
    name: "GIF",
    icon: PiGifLight,
  },
];

const inputs = [
  {
    id: 1,
    name: "Text",
    icon: TbLetterT,
  },
  {
    id: 2,
    name: "Number",
    icon: FaHashtag,
  },
  {
    id: 3,
    name: "Email",
    icon: MdAlternateEmail,
  },
  {
    id: 4,
    name: "Phone",
    icon: CiPhone,
  },
  {
    id: 5,
    name: "Date",
    icon: MdOutlineDateRange,
  },
  {
    id: 6,
    name: "Rating",
    icon: FaRegStar,
  },
  {
    id: 7,
    name: "Button",
    icon: FiCheckSquare,
  },
];
const BuilderSidebar = () => {
    const {id} = useParams();
    const {setFormContent} = useForm();
    const handleFormContent = (type, input_type) => {
       if(!id){
        setFormContent(curr => {
          const newContent = [...curr, { id: curr.length + 1, type, input_type, placeholder: '' }];
          console.log('Updated content:', newContent);
          return newContent;
      });
       }else{
        toast.error(`You can't add or delete the Bubble and input after saving the form`)
       }
        
    };
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarGroup}>
        <div className={styles.bubble}>
          <p className={styles.heading}>Bubbles</p>
          <div className={styles.container}>
            {bubbles.map((bubble) => (
              <BuilderButton
              key={bubble.id}
              bubble={bubble}
              iconClass={styles.icon}
              onClick={() => handleFormContent("bubble", bubble.name)} // Fixed syntax
            />
            ))}
          </div>
        </div>
        <div className={styles.bubble}>
          <p className={styles.heading}>Inputs</p>
          <div className={styles.container}>
            {inputs.map((input) => (
              <BuilderButton key={input.id} bubble={input} iconClass={styles.input_icon} onClick={() => handleFormContent("input", input.name)}/>
            ))}
          </div>
        </div>    
        {/* </div> */}
        {/* <div className={styles.sidebarGroup}> */}
        {/* <h3>Inputs</h3>
        <button className={styles.sidebarButton}>Text</button>
        <button className={styles.sidebarButton}>Number</button>
        <button className={styles.sidebarButton}>Email</button>
        <button className={styles.sidebarButton}>Phone</button>
        <button className={styles.sidebarButton}>Date</button>
        <button className={styles.sidebarButton}>Rating</button>
        <button className={styles.sidebarButton}>Buttons</button> */}
      </div>
    </div>
  );
};

export default BuilderSidebar;
