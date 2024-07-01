import Image from "next/image";

import { LoginPage } from "@/components/signup.page";
import styles from "@/styles/page.module.css";


export default function Home() {
  return (
    <div className={styles.container}>
      <div className={`${styles.col} ${styles.loginContainer}`}>
        <LoginPage  /> {/* Apply additional class or style if needed */}
      </div>
      <div className={styles.col} style={{borderRadius: "45px 0 0 45px"}} >
        <div className={styles.imageContainer}>
          <Image
            src="/plant.jpg"
            width={781.5}
            height={1042}
            layout="responsive"
            objectFit="cover" // Ensure the image covers the container without distortion
            alt="Plant Image"
          />
        </div>
      </div>
    </div>
  );
}
