import React from "react";

const ChevronIcon = ({ expanded }) => (
  <svg
    className={`h-5 w-5 transform transition-transform duration-200 ${expanded ? "rotate-90" : ""}`}
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M6.293 7.293a1 1 0 011.414 0L12 11.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

const ExpandibleRow = ({
  children,                // celdas <td> de la fila principal (sin el botón)
  detail,                  // contenido al expandir
  className = "",          // clases para el tr principal
  detailClassName = "",    // clases para el tr de detalle
  defaultExpanded = false,
  isExpanded,              // modo controlado
  onToggle,                // callback(nextExpanded)
  toggleCellClassName = "w-10 px-2",
  toggleAriaLabel = "Expandir fila",
  disabled = false,
  id,                      // id base para aria-controls
}) => {
  const internalId = React.useId();
  const detailsId = `${id ?? internalId}-details`;

  const [open, setOpen] = React.useState(defaultExpanded);
  const expanded = typeof isExpanded === "boolean" ? isExpanded : open;

  const cells = React.Children.toArray(children);
  const colSpan = cells.length + 1; // +1 por la celda del botón

  const handleToggle = () => {
    if (disabled) return;
    const next = !expanded;
    if (typeof isExpanded !== "boolean") setOpen(next);
    onToggle?.(next);
  };

  return (
    <>
      <tr className={`hover:bg-gray-100 ${className}`} data-expanded={expanded}>
        <td className={toggleCellClassName}>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-1 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            aria-label={toggleAriaLabel}
            aria-expanded={expanded}
            aria-controls={detailsId}
            onClick={handleToggle}
            disabled={disabled}
          >
            <ChevronIcon expanded={expanded} />
          </button>
        </td>
        {cells}
      </tr>

      {expanded && (
        <tr className={detailClassName}>
          <td id={detailsId} colSpan={colSpan} className="bg-gray-50 px-6 py-4">
            {detail}
          </td>
        </tr>
      )}
    </>
  );
};

export default ExpandibleRow;