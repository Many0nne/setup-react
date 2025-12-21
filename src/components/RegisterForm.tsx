import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function RegisterForm() {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    const emailOk = /.+@.+\..+/.test(email);
    if (!emailOk) {
      setError("Please enter a valid email");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      setLoading(true);
      await register(email, password);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Registration failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{ maxWidth: 360, margin: "2rem auto", textAlign: "left" }}
    >
      <h2>Register</h2>
      <div style={{ marginBottom: "0.75rem" }}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
        />
      </div>
      <div style={{ marginBottom: "0.75rem" }}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
        />
      </div>
      {error && (
        <div style={{ color: "crimson", marginBottom: "0.75rem" }}>{error}</div>
      )}
      <button type="submit" disabled={loading}>
        {loading ? "Creating…" : "Register"}
      </button>
    </form>
  );
}
