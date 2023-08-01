import Toolbar from "./ToolBar/Toolbar";
import "./styles.css";
import { PagesProvider } from "../../context/PagesContext";

export default function Header() {
  return (
    <div className="header">
        <Toolbar />
    </div>
  );
}
