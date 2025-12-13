import { useEffect, useState } from "react";
import { getVenues } from "../services/api";
import { useAuth } from "../contexts/AuthContext";

export default function VenuesPage() {
  const { token, isAuthenticated, user } = useAuth();
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setError("");
        if (!isAuthenticated) {
          setVenues([]);
          return;
        }
        const data = await getVenues(token);
        setVenues(data);
      } catch (e) {
        setError("Impossible de charger les lieux.");
      }
    };
    load();
  }, [isAuthenticated, token]);

  return (
    <div>
      <h2>Lieux</h2>

      {!isAuthenticated && (
        <p>Connecte-toi pour voir les lieux.</p>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {isAuthenticated && (
        <>
          <p>
            Rôle : <b>{user?.role}</b>
          </p>

          {venues.length === 0 ? (
            <p>Aucun lieu.</p>
          ) : (
            <ul>
              {venues.map((v) => (
                <li key={v.id ?? v._id ?? v.name}>
                  {v.name}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
