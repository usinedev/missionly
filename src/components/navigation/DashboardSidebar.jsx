import SideBarLink from "./SideBarLink";
import HomeLogoLink from "./HomeLogoLink";
import ArrowLeft from "@/assets/icons/ArrowLeft.svg?react";
import Dashboard from "@/assets/icons/Dashboard.svg?react";
import Missions from "@/assets/icons/Missions.svg?react";
import Candidatures from "@/assets/icons/Candidatures.svg?react";
import Compte from "@/assets/icons/Compte.svg?react";
import Messagerie from "@/assets/icons/Messagerie.svg?react";
import Deconnexion from "@/assets/icons/Deconnexion.svg?react";

function DashboardSidebar() {
  return (
    <nav className="dashboardSidebar">
        <div className="top">
            <HomeLogoLink/>
            <SideBarLink destination={"/dashboard"} children="Tableau de bord" Icon={Dashboard}/>
            <SideBarLink destination={"/"} children="Missions" Icon={Missions}/>
            <SideBarLink destination={"/"} children="Candidatures" Icon={Candidatures}/>
        </div>

        <div className="bottom">
            <SideBarLink destination={"/"} children="Mon compte" Icon={Compte}/>
            <SideBarLink destination={"/"} children="Messagerie" Icon={Messagerie}/>
            <SideBarLink destination={"/"} children="Déconnexion" Icon={Deconnexion} className="deconnexion"/>
        </div>
    </nav>
  )
}

export default DashboardSidebar