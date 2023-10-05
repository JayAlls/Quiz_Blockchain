import Link from 'next/link'
import styles from './page.module.scss'


export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Bienvenu dans le ChainQuiz</h1>
      <div>
        <h2>Prêt pour démarrer ce Quiz Blockchain ? </h2>
        <Link href="/quiz">Commencer !</Link>
        <Link href="/ranking">Classement</Link>
      </div>
    </main>
  )
}
