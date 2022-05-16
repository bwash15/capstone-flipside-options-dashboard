import React from 'react';
import styles from "./styles.module.css";

const UnAuthorizedAccess = () => {
    return (
        <div className={styles.unauthorized}>
            UnAuthorized Access, redirecting back to public area...
        </div>
    )
}

export default UnAuthorizedAccess