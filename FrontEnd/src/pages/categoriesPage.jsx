import { useEffect, useState } from "react";
import { getCategories } from "../services/api";
import { useAuth } from "../contexts/AuthContext";

export default function CategoriesPage() {
  const { token, isAuthenticated, user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setError("");
        if (!isAuthenticated) {
          setCategories([]);
          return;
        }
        const data = await getCategories(token);
        setCategories(data);
      } catch (e) {
        setError("Impossible de charger les catégories.");
      }
    };
    load();
  }, [isAuthenticated, token]);

  return (
    <div>
      <h2>Catégories</h2>

      {!isAuthenticated && (
        <p>Connecte-toi pour voir les catégories.</p>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {isAuthenticated && (
        <>
          <p>
            Rôle : <b>{user?.role}</b>
          </p>

          {categories.length === 0 ? (
            <p>Aucune catégorie.</p>
          ) : (
            <ul>
              {categories.map((c) => (
                <li key={c.id ?? c._id ?? c.name}>{c.name}</li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
