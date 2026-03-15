import { Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budgets from './pages/Budgets';
import Analytics from './pages/Analytics';
import SideBar from "./components/layout/Sidebar";

function App() {
  return (
    <div>
      <SideBar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/budgets" element={<Budgets />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>

      </SideBar>
    </div>

  );
}

export default App;
