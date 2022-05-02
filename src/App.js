import { Routes, Route } from "react-router-dom";

import Navigation from "./components/routes/navigation/navigation.component";
import Home from "./components/routes/home/home.component";

const Shop = () => {
  return <h1>SHOP</h1>;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/shop" element={<Shop />} />
      </Route>
    </Routes>
  );
};

export default App;
