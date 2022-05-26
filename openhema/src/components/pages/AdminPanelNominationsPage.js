import AdminPanelHeader from "../adminPanel/adminPanelHeader/AdminPanelHeader";
import AdminPanelNominations from "../adminPanel/adminPanelNominations/AdminPanelNominations";
import NominationsAddForm from "../adminPanel/adminPanelNominations/NominationsAddForm";

const AdminPanelNominationPage = () => {
    return(
        <div className="App">
            <AdminPanelHeader/>
            <main>
                <div className="admin__container">
                    <AdminPanelNominations/>
                    <NominationsAddForm/>
                </div>
            </main>
        </div>
    )
}

export default AdminPanelNominationPage;