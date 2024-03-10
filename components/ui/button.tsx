interface ButtonProps {
  variant?: string;
  type?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant, type, children }) => {
  const variantOptions = (variant: string | undefined) => {
    switch (variant) {
      case "primary": {
        return "bg-primary text-background";
      }
      case "secondary": {
        return "bg-secondary text-text";
      }
      default: {
        return "bg-primary text-background";
      }
    }
  };
  const typeOptions = (type: string | undefined) => {
    switch (type) {
      case "submit": {
        return "submit";
      }
      case "reset": {
        return "reset";
      }
      default: {
        return "button";
      }
    }
  };
  const buttonClassName = `btn ${variantOptions(variant)}`;
  const buttonType = typeOptions(type);
  return (
    <button className={buttonClassName} type={buttonType}>
      {children}
    </button>
  );
};
