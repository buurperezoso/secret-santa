import { FC } from "react";
import { ErrorMessage } from "formik";
import styles from '../styles/_InvalidFeedback.module.css';

interface InvalidFeedbackProps {
    name: string;
}

const InvalidFeedback: FC<InvalidFeedbackProps> = ({ name }) => {
    return (
        <ErrorMessage
            name={name}
            component="div"
            className={styles['invalid-feedback-text']}
        />
    )
};

export default InvalidFeedback;