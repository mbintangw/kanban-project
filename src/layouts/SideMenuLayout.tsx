import SideMenu from "../components/SideMenu";
import { Outlet } from "react-router-dom";

const SideMenuLayout = () => {
  return (
    <div  style={{display: 'flex'}}>
      <SideMenu/>
      <Outlet />
    </div>
  )
}

export default SideMenuLayout