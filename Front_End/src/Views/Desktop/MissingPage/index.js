import React from 'react';
import styles from "./styles.module.css";

const PageNotFound = () => {
    return (
        <div className={styles.missing}>
            Page Not Found status : 404, redirecting back to public area...
        </div>
    )
}

export default PageNotFound