import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import EventNoteIcon from "@mui/icons-material/EventNote";
import MedicationIcon from "@mui/icons-material/Medication";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Patients from "../components/patients/Patients";

export const GENDER = ["MALE / PRIA", "FEMALE / WANITA"];
export const BLOOD = ["A+", "A", "B", "O"];
export const MARITAL_STATUS = [
  "Single",
  "Married",
  "Divorced",
  "Seperated",
  "Widowed",
];

export const newKeys = [
  "name",
  "email",
  "address",
  "gender",
  "city",
  "province",
  "phone_number",
  "age",
  "weight",
  "height",
  "blood",
  "marital_status",
  "birth",
  "is_verified",
  "created_at",
];

export const ListSidebar = [
  {
    id: 0,
    name: "Dashboard",
    path: "/dashboard",
    element: <div>this is dashboard</div>,
    icon: <DashboardIcon />,
  },
  {
    id: 1,
    name: "Patients",
    path: "patients",
    element: <Patients />,
    icon: <PersonOutlineIcon />,
  },
  {
    id: 2,
    name: "Appointments",
    path: "appointments",
    element: <div>Appointments</div>,
    icon: <EventNoteIcon />,
  },
  {
    id: 3,
    name: "Notifications",
    path: "notifications",
    element: <div>Notifications</div>,
    icon: <NotificationsNoneIcon />,
  },
  {
    id: 4,
    name: "Medical Records",
    path: "medical-records",
    element: <div>Medical Records</div>,
    icon: <MedicationIcon />,
  },
];
