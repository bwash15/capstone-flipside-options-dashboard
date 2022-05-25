import { useNavigate } from 'react-router-dom';
import styles from "./styles.module.css";

const UnAuthorizedAccess = () => {
    const navigate = useNavigate();
    // (-1) is a keyword for go back one or go back to the previous page 
    const goBack = () => navigate(-1);
    return (
        <section className={styles}>
            <h1>UnAuthorized Access</h1>
            <br />
            <p>Redirecting back to public area...</p>
            <div className='flexGrow'>
                <button onClick={goBack}>Go Back</button>
            </div>
        </section>
    )
}

export default UnAuthorizedAccess