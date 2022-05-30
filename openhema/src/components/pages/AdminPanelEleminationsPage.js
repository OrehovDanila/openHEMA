import AdminPanelHeader from "../adminPanel/adminPanelHeader/AdminPanelHeader";
import AdminPanelElemination from "../adminPanel/adminPanelElemination/AdminPanelElemination";
import EleminationAddForm from "../adminPanel/adminPanelElemination/EleminationAddForm";
import Tabs from "../tabs/Tabs";
import AuthErrorModal from "../authError/AuthError";

const AdminPanelEleminationPage = () => {
    return(
        <div className="App">
            <AdminPanelHeader/>
            <AuthErrorModal/>
            <main>
                <Tabs />
                <div className="admin__container">
                    <AdminPanelElemination/>
                    <EleminationAddForm/>
                </div>

            </main>
        </div>
    )
}

export default AdminPanelEleminationPage;