import AdminPanelHeader from "../adminPanel/adminPanelHeader/AdminPanelHeader";
import AdminPanelPools from "../adminPanel/adminPanelPools/AdminPanelPools";
import PoolsAddForm from "../adminPanel/adminPanelPools/PoolsAddForm";
import Tabs from "../tabs/Tabs";
import AuthErrorModal from "../authError/AuthError";

//Страница панели администратора для групп

const AdminPanelPoolsPage = () => {
    return(
        <div className="App">
            <AdminPanelHeader/>
            <AuthErrorModal/>
            <main>
                <Tabs />
                <div className="admin__container">
                    <AdminPanelPools/>
                    <PoolsAddForm/>
                </div>

            </main>
        </div>
    )
}

export default AdminPanelPoolsPage;