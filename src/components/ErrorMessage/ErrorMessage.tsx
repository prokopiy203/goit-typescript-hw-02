import css from "./ErrorMessage.module.css";

interface Props {
  error: string;
  message: string;
}

const ErrorMessage: React.FC<Props> = ({ message }) => {
  return (
    <div>
      <p className={css.ErrorMessage}>{message}</p>
    </div>
  );
};

export default ErrorMessage;
