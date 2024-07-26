export interface ButtonProps {
  onClick: (e: React.FormEvent) => void;
  text: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}
