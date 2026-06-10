import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.container} data-testid="footer">
      <p>Copyright {new Date().getFullYear()} - Talking About Testing</p>
      <ul>
        <li>
          <a data-testid="podcast-footer-link" href="https://open.spotify.com/show/5HFlqWkk6qtgJquUixyuKo" target="_blank" rel="noopener noreferrer">Podcast</a>
        </li>
        <li>
          <a  data-testid="courses-footer-link" href="https://talking-about-testing.vercel.app/" target="_blank" rel="noopener noreferrer">Courses</a>
        </li>
        <li>
          <a data-testid="blog-footer-link" href="https://talkingabouttesting.com" target="_blank" rel="noopener noreferrer">Blog</a>
        </li>
        <li>
          <a data-testid="youtube-footer-link"href="https://youtube.com/@talkingabouttesting" target="_blank" rel="noopener noreferrer">YouTube</a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
