import AdminPanelHeader from "../adminPanel/adminPanelHeader/AdminPanelHeader";
import AdminPanelFighters from "../adminPanel/adminPanelFighters/AdminPanelFighters";
import FightersAddForm from "../adminPanel/adminPanelFighters/FightersAddForm";
import AuthErrorModal from "../authError/AuthError";

const AdminPanelFightersPage = () => {
    return(
        <div className="App">
        <AdminPanelHeader/>
        <AuthErrorModal/>
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