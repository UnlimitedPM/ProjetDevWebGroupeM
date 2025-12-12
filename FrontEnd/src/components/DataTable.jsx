import React from 'react';
import './DataTable.css'; // Nous allons créer ce fichier juste après pour le style

/**
 * Un composant générique pour afficher des données dans un tableau.
 * @param {Object[]} data - Un tableau d'objets à afficher.
 * @param {Object[]} columns - Une configuration pour les colonnes du tableau.
 *   Chaque objet colonne doit avoir :
 *   - accessor: La clé pour accéder à la donnée dans l'objet de `data`.
 *   - Header: Le titre à afficher dans l'en-tête du tableau.
 */
const DataTable = ({ data, columns }) => {
  if (!data || data.length === 0) {
    return <p>Aucune donnée à afficher.</p>;
  }

  return (
    <table className="data-table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.accessor}>{column.Header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => (
              <td key={column.accessor}>
                {/* Si une fonction Cell est fournie, on l'utilise pour formater la donnée */}
                {column.Cell
                  ? column.Cell({ value: column.accessor.split('.').reduce((o, i) => o[i], row) })
                  : column.accessor.split('.').reduce((o, i) => o[i], row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
