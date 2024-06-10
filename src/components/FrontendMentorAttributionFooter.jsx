export default function FrontendMentorAttributionFooter({name = '', socialMediaLink = "#"}) {
  return (
    <footer className="attribution">
      Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
      Coded by <a href={socialMediaLink}>{name}</a>.
    </footer>
  )
}