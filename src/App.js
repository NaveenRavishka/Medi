import './App.css';
import { Route, Routes } from 'react-router-dom';

import SideDrawer from './Screens/SideDrawer';
import HistoryScreen from './MainScreens/HistoryScreen';
import HomeScreen from './MainScreens/HomeScreen';
import LoginScreen from './Screens/LoginPage';
import SignupScreen from './Screens/SignupPage';
import MealPlanScreen from './MainScreens/MealPlanScreen';
import { Provider as AuthProvider } from "./Context/AuthContext";
import { Provider as SavePredictProvider} from "./Context/SavePredicValuesContext";

function App() {
  return (
    <AuthProvider>
      <SavePredictProvider>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />

          <Route path="/" element={<SideDrawer />}>
            <Route path="HomeScreen" element={<HomeScreen />} />
            <Route path="HistoryScreen" element={<HistoryScreen />} />
            <Route path="MealPlanScreen" element={<MealPlanScreen />} />
            <Route path="*" element={<HomeScreen />} />
          </Route>
        </Routes>
      </SavePredictProvider>
    </AuthProvider>
  );
}

export default App;