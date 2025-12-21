import { useState } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { user, token, logout } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");

  if (!user || !token) {
    return (
      <div>
        {mode === "login" ? <LoginForm /> : <RegisterForm />}
        <p className="read-the-docs" style={{ marginTop: "1rem" }}>
          {mode === "login" ? (
            <>
              No account?{" "}
              <button onClick={() => setMode("register")}>Create one</button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button onClick={() => setMode("login")}>Sign in</button>
            </>
          )}
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 640, margin: "2rem auto" }}>
      <h1>Welcome</h1>
      <div className="card" style={{ textAlign: "left" }}>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        {user.name ? (
          <p>
            <strong>Name:</strong> {user.name}
          </p>
        ) : null}
      </div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default App;
