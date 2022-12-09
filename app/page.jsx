import Image from 'next/image'
import ShareBtn from './components/ShareBtn'
import styles from './page.module.css'

export default function Home() {

  const getWebsiteUrl = (websiteId = 1) => {
    const websiteList = {
      1: "https://www.forthwithlife.co.uk",
      2: "https://www.forthedge.co.uk"
    }

    return websiteList[websiteId]
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.grid}>
          <ShareBtn 
            title="Referral code" 
            content={`Try out Forth and get £10 off your first test on me when you use my referral code: XXXX-XXXX-XXXX during purchase. To view what tests might be right for you, visit`}/>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
