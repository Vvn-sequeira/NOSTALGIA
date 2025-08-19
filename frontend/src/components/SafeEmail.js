import { useState } from "react";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

function SafeEmail() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post(`${apiUrl}/haveibeenpawned`, { email } , {
        withCredentials: true 
      }) ;
      setResult(res.data);
    } catch (error) {
      setResult({
        error: error.response?.data?.error || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        paddingTop: "200px",
        maxWidth: "450px",
        margin: "40px auto",
        padding: "20px",
        borderRadius: "12px",
        background: "#f9f9f9",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        🔍  Email Breach Checker
      </h2>

      <form
        onSubmit={handleCheck}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: "12px",
            width: "100%",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? "#999" : "#007bff",
            color: "white",
            padding: "12px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            width: "100%",
          }}
        >
          {loading ? "Checking..." : "Check"}
        </button>
      </form>

      {/* Results */}
      {result && (
        <div style={{ marginTop: "25px" }}>
          {result.error && (
            <p style={{ color: "red", fontWeight: "bold" }}>❌ {result.error}</p>
          )}

          {result.success ? (
            result.found > 0 ? (
              <div
                style={{
                  background: "#ffe6e6",
                  padding: "15px",
                  borderRadius: "8px",
                  border: "1px solid #ff4d4d",
                }}
              >
                <p style={{ color: "#cc0000", fontWeight: "bold" }}>
                  ⚠️ Found in {result.found} breach
                  {result.found > 1 ? "es" : ""}!
                </p>
                <ul style={{ paddingLeft: "20px" }}>
                  {result.result.map((item, i) => (
                    <li key={i} style={{ marginBottom: "8px" }}>
                      <strong>{item.email}</strong> → Source:{" "}
                      <span style={{ color: "#990000" }}>
                        {item.sources || "Unknown"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div
                style={{
                  background: "#e6ffe6",
                  padding: "15px",
                  borderRadius: "8px",
                  border: "1px solid #33cc33",
                }}
              >
                <p style={{ color: "#006600", fontWeight: "bold" }}>
                  ✅ No breaches found for this email.
                </p>
              </div>
            )
          ) : null}
        </div>
      )}
    </div>
  );
}

export default SafeEmail;
