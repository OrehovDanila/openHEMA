import AdminPanelHeader from "../adminPanel/adminPanelHeader/AdminPanelHeader";
import AdminPanelFighters from "../adminPanel/adminPanelFighters/AdminPanelFighters";
import FightersAddForm from "../adminPanel/adminPanelFighters/FightersAddForm";

const AdminPanelFightersPage = () => {
    return(
        <div className="App">
        <AdminPanelHeader/>
        <main>
            <div className="admin__container">
                <AdminPanelFighters/>
                <FightersAddForm />
            </div>
        </main>
    </div>
    )
}

export default AdminPanelFightersPage;