import { HiOutlineHome, HiOutlineCog, HiSearch } from "react-icons/hi";
import { AiFillProduct, AiOutlineTeam } from "react-icons/ai";
import { TbReportAnalytics } from "react-icons/tb";
import {
  MdOutlineAccountCircle,
  MdHelpOutline,
  MdOutlineFeedback,
} from "react-icons/md";
import { RiAdminLine, RiWindyFill } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";


export const menuOptions = [
  { name: "Users", to: "/users", Icon: FaUserFriends },
  { name: "Products", to: "/products", Icon: AiFillProduct },
  // { name: "Admin", to: "/admin", Icon: RiAdminLine },
];
export const menuOptionsTwo = [
  { name: "Settings", to: "/login", Icon: HiOutlineCog },
  { name: "Get Help", to: "/login", Icon: MdHelpOutline },
  { name: "Submit feedback", to: "/login", Icon: MdOutlineFeedback },
];