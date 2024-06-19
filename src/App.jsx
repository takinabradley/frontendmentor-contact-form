import { useEffect, useRef, useState } from "react"
import ContactForm from "./components/ContactForm"
import FrontendMentorAttributionFooter from "./components/FrontendMentorAttributionFooter"
import styles from './App.module.css'


function App() {


  return (
    <div className={styles["App"]}>
      <main className={styles["main"]}>
        <ContactForm />
      </main>
      <FrontendMentorAttributionFooter name="takinabradley" socialMediaLink="https://github.com/takinabradley" />
    </div>
  )
}

export default App
