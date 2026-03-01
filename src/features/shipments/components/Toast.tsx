import "../shipmentpage.css";

interface Props {
  message: string;
}

export const Toast = ({ message }: Props) => {
  return <div className="toast-success">✓ {message}</div>;
};