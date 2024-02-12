import { Route, Routes, Navigate } from "react-router-dom";
import Upload from "./components/Page/upload";
import Signup from "./components/Singup/signup";
import Login from "./components/Login/login";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Upload />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" exact element={<Login />} />
		</Routes>
	);
}

export default App;
