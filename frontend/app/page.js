import Link from 'next/link'
import styles from './styles/page.module.scss'

//icon
import QuizIcon from '@mui/icons-material/Quiz';


export default function Home() {
  return (
    <main className={styles.main}>
      <h1><QuizIcon className={styles.customIcon}/> Bienvenu dans le ChainQuiz <QuizIcon className={styles.customIcon}/></h1>
      <div className={styles.linkContainer}>
        <h2>Prêt pour démarrer ce Quiz Blockchain ? </h2>
        <Link href="/quiz" className={styles.customLink}>Commencer !</Link>
        <Link href="/ranking" className={styles.customLink}>Classement</Link>
      </div>
    </main>
  )
}
