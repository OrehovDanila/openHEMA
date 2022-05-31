import AdminPanelHeader from "../adminPanel/adminPanelHeader/AdminPanelHeader";
import AdminPanelElimination from "../adminPanel/adminPanelElimination/AdminPanelElimination";
import EliminationAddForm from "../adminPanel/adminPanelElimination/EliminationAddForm";
import Tabs from "../tabs/Tabs";
import AuthErrorModal from "../authError/AuthError";

//Страница панели администратора для плейофф

const AdminPanelEliminationPage = () => {
    return(
        <div className="App">
            <AdminPanelHeader/>
            <AuthErrorModal/>
            <main>
                <Tabs />
                <div className="admin__container">
                    <AdminPanelElimination/>
                    <EliminationAddForm/>
                </div>

            </main>
        </div>
    )
}

export default AdminPanelEliminationPage;