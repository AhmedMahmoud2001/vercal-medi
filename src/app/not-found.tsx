import React from 'react';
import styles from  '../styles/page.module.css'; // Import the CSS module
import Link from 'next/link';
const NotFoundPage: React.FC = () => {
  return (
    <section className={styles.table1}>
     
      <h1  color='red'   >ERROR </h1>
     <p>Page Not Found

     </p><br/>
     <Link href="/"   className={styles.navlink}>Go to Home</Link>
    
  
</section> ) }

export default NotFoundPage ;