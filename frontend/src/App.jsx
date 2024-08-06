import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContext";
import { FolderProvider } from "./Contexts/FolderContext";
import { FormProvider } from "./Contexts/FormContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import WorksSpace from "./pages/Workspace";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import AppBuilder from "./pages/AppBuilder";
import AppLayout from "./AppLayout";
import ChatWindow from "./pages/ChatWindow";
import { ChatProvider } from "./Contexts/chatContext";
import SignUp from "./pages/Signup";
import SettingsForm from "./pages/SettingsForm";

function App() {
  return (
    <AuthProvider>
      <FolderProvider>
      <FormProvider>
        <ChatProvider>
        <BrowserRouter>
          <Routes>
            
            <Route
              path="app" // This wildcard path will catch all routes not matched above
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<WorksSpace />} />
              <Route path="settings" element={<SettingsForm />} />
              <Route path="typebots" element={<AppBuilder />} />
              <Route path="typebots/:id" element={<AppBuilder />} />
              {/* Add other routes here */}
            </Route>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<SignUp />} />
            <Route path="form/:id" element={<ChatWindow />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "10px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "#F9FAFB",
                color: "#374151",
              },
            }}
          />
        </BrowserRouter>
        </ChatProvider>
        </FormProvider>
        
      </FolderProvider>
    </AuthProvider>
  );
}

export default App;
