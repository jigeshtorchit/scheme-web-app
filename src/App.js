// import React, { useState } from "react";
// import "./App.css";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import Login from "./pages/loginForms/Login";
// import MainNav from "./pages/Navbars/MainNav";
// import Sidebar from "./pages/Navbars/Sidebar";
// import { Col, Container, Row } from "react-bootstrap";
// import AdminDashBoard from "./pages/dashboards/AdminDashBoard";
// import Scheme from "./pages/scheme/Scheme";
// import SchemeAddForm from "./pages/scheme/SchemeAddForm";
// import SchemeEditForm from "./pages/scheme/SchemeEditForm";
// import { ToastContainer } from "react-toastify";
// import Page404 from "./pages/404/Page404";
// import ChatBot from "./components/ChatBot";
// function App() {
//   const [authenticated, setAuthenticated] = useState(false);
//   return (
//     <div className="App">
//       <ToastContainer />
//       <Router>
//         {authenticated && (
//           <MainNav
//             authenticated={authenticated}
//             setAuthenticated={setAuthenticated}
//           />
//         )}

//         <Container fluid>
//           <Row>
//             {authenticated && (
//               <Col lg={2} xxl={2} xl={2}>
//                 <Sidebar />
//               </Col>
//             )}
//             <Col
//               lg={authenticated ? 10 : 12}
//               xxl={authenticated ? 10 : 12}
//               xl={authenticated ? 10 : 12}
//               md={12}
//               sm={12}
//             >
//               <Routes>
//                 <Route path="/" element={<ChatBot />} />
//                 <Route path="*" element={<Page404 />} />
//                 <Route
//                   path="/admin/login"
//                   element={<Login setAuthenticated={setAuthenticated} />}
//                 />
//                 <Route
//                   path="/scheme"
//                   element={authenticated ? <Scheme /> : <Navigate to="/" />}
//                 />
//                 <Route
//                   path="/admindashboard"
//                   element={
//                     authenticated ? <AdminDashBoard /> : <Navigate to="/" />
//                   }
//                 />

//                 <Route
//                   path="/scheme-add"
//                   element={
//                     authenticated ? <SchemeAddForm /> : <Navigate to="/" />
//                   }
//                 />
//                 <Route
//                   path="/schemeEditForm/:id"
//                   element={
//                     authenticated ? <SchemeEditForm /> : <Navigate to="/" />
//                   }
//                 />
//               </Routes>
//             </Col>
//           </Row>
//         </Container>
//       </Router>
//     </div>
//   );
// }

// export default App;

import React from "react";
import Router from "./routes";

function App() {
  return <Router />;
}

export default App;
