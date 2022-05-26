import AdminPanelHeader from "../adminPanel/adminPanelHeader/AdminPanelHeader";
import AdminPanelPools from "../adminPanel/adminPanelPools/AdminPanelPools";
import PoolsAddForm from "../adminPanel/adminPanelPools/PoolsAddForm";
import Tabs from "../tabs/Tabs";

const AdminPanelPoolsPage = () => {
    return(
        <div className="App">
            <AdminPanelHeader/>
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