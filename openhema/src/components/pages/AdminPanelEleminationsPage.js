import AdminPanelHeader from "../adminPanel/adminPanelHeader/AdminPanelHeader";
import AdminPanelElemination from "../adminPanel/adminPanelElemination/AdminPanelElemination";
import EleminationAddForm from "../adminPanel/adminPanelElemination/EleminationAddForm";
import Tabs from "../tabs/Tabs";

const AdminPanelEleminationPage = () => {
    return(
        <div className="App">
            <AdminPanelHeader/>
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