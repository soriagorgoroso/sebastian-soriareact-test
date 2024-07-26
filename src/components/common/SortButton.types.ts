export interface SortButtonProps {
  label: string;
  onClick: () => void;
  direction?: "ascending" | "descending" | null;
}
