import {
  faEnvelope,
  faHome,
  faSignOutAlt,
  faUserCircle
} from "@fortawesome/free-solid-svg-icons";

const menus = [
  {
    choice: "Profile",
    icon: faUserCircle,
    path: "profile"
  },
  {
    choice: "Home",
    icon: faHome,
    path: "home"
  },
  {
    choice: "Messages",
    icon: faEnvelope,
    path: "messages"
  },
  {
    choice: "Sign Out",
    icon: faSignOutAlt,
    path: "signOut"
  }
];

export default menus;
