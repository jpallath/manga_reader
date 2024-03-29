interface ButtonProps {
  variant?: string;
  type?: string;
  children: React.ReactNode;
  active?: boolean;
  loading?: boolean;
  data?: any;
  onClick?: (data: any) => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  type,
  children,
  active = true,
  loading = false,
  data,
  onClick,
}) => {
  const variantOptions = (variant: string | undefined) => {
    switch (variant) {
      case "primary": {
        return "bg-primary text-text";
      }
      case "secondary": {
        return "bg-secondary text-text border-white border-4";
      }
      case "danger": {
        return "bg-danger text-text";
      }
      default: {
        return "bg-primary text-text";
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
  const buttonClassName = `btn ${variantOptions(variant)} + ${
    active ? "brightness-100" : "brightness-50"
  } rounded-xl`;
  const buttonType = typeOptions(type);
  return (
    <button className={buttonClassName} type={buttonType} onClick={onClick}>
      {loading ? <LoadingComponent /> : children}
    </button>
  );
};

const LoadingComponent = () => {
  return <span className="loading loading-ring loading-md"></span>;
};
