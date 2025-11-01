import { Dashboard } from './pages/Dashboard';
import { ShopeeColors } from './styles/colors';

function App() {
  return (
    <div
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
        backgroundColor: ShopeeColors.lightGray,
        color: ShopeeColors.textDark,
        margin: 0,
        padding: 0,
      }}
    >
      <Dashboard />
    </div>
  );
}

export default App;
