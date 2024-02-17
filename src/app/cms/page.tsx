import VerticalNavBar from './Components/VerticalNavbar/page';
import styles from './page.module.css';

import { loggedIn } from '../api/user/loggedIn';

export default function Home() {
    const isloggedIn = loggedIn({});
  return (
    <div className={styles.mainWrapper}>
        <VerticalNavBar params={{name:'ABC',loggedIn: isloggedIn}}/>
        <div className={styles.cmsContent}>
            <h2>Dashboard</h2>
            <div className={styles.mainContent}>
                Main content of CMS will be displayed here.
            </div>
        </div>
    </div>
  )
}