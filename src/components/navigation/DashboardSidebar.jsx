import SideBarLink from "./SideBarLink";
import HomeLogoLink from "./HomeLogoLink";
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
            <SideBarLink destination={"/dashboard/home"} children="Tableau de bord" Icon={Dashboard}/>
            <SideBarLink destination={"/dashboard/missions"} children="Missions" Icon={Missions}/>
            <SideBarLink destination={"/dashboard/candidacy"} children="Candidatures" Icon={Candidatures}/>
        </div>

        <div className="bottom">
            <SideBarLink destination={"/dashboard/my-account"} children="Mon compte" Icon={Compte}/>
            <SideBarLink destination={"/dashboard/messages"} children="Messagerie" Icon={Messagerie}/>
            <SideBarLink destination={"/"} children="Déconnexion" Icon={Deconnexion} className="deconnexion"/>
        </div>
    </nav>
  )
}

export default DashboardSidebar