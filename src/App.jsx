import React, { useEffect, useRef } from 'react';
import { 
  Globe,
  Radio,
  HeartHandshake,
  MoreVertical,
  Share2
} from 'lucide-react';
import { 
  FaLinkedinIn, 
  FaGithub, 
  FaWhatsapp, 
  FaSnapchatGhost, 
  FaEnvelope, 
  FaInstagram, 
  FaGlobe 
} from 'react-icons/fa';

const links = [
  {
    id: 1,
    title: 'Connect On LinkedIn!',
    url: 'https://www.linkedin.com/in/vignesh-katta/',
    icon: (
      <div className="icon-box white-box">
        <FaLinkedinIn size={16} color="black" />
      </div>
    )
  },
  {
    id: 2,
    title: 'Personal Portfolio',
    url: 'https://kattavignesh.vooho.in',
    icon: (
      <div className="icon-box">
        <Globe size={22} color="white" />
      </div>
    )
  },
  {
    id: 3,
    title: 'Hire Me For Freelancing!',
    url: 'https://wa.me/919848887631?text=I%20want%20to%20hire%20you%20as%20a%20freelancer',
    icon: (
      <div className="icon-box">
        <Radio size={22} color="white" />
      </div>
    )
  },
  {
    id: 4,
    title: 'Work With Me!',
    url: 'https://wa.me/919848887631?text=Lets%27s%20work%20together',
    icon: (
      <div className="icon-box">
        <HeartHandshake size={22} color="white" />
      </div>
    )
  }
];

const socials = [
  { id: 1, name: 'Github', url: 'https://github.com/kattavignesh', icon: <FaGithub size={24} /> },
  { id: 2, name: 'WhatsApp', url: 'https://wa.me/919848887631', icon: <FaWhatsapp size={24} /> },
  { id: 3, name: 'Snapchat', url: 'https://www.snapchat.com/add/vigneshh.20', icon: <FaSnapchatGhost size={24} /> },
  { id: 4, name: 'Email', url: 'mailto:kattavignesh593@gmail.com', icon: <FaEnvelope size={24} /> },
  { id: 5, name: 'Instagram', url: 'https://instagram.com/kattavignesh', icon: <FaInstagram size={24} /> },
  { id: 6, name: 'Personal Portfolio', url: 'https://kattavignesh.vooho.in', icon: <FaGlobe size={24} /> },
];

function App() {
  const coverRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (coverRef.current) {
            // Prevent negative scroll values causing elastic jumps on mobile/mac
            const scrollY = Math.max(window.scrollY, 0); 
            
            const imageOpacity = Math.max(1 - scrollY / 350, 0);
            const imageTranslateY = scrollY * 0.4;
            
            // Bypass React State directly to DOM for silky smooth 60fps animations
            coverRef.current.style.opacity = imageOpacity;
            coverRef.current.style.transform = `translateY(${imageTranslateY}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on mount to set initial position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Vignesh Katta',
        text: "Check out Vignesh Katta's profile!",
        url: window.location.href,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="app-main">
      <div className="top-action-right">
        <button className="share-btn" onClick={handleShare} aria-label="Share">
          <Share2 size={18} color="white" />
        </button>
      </div>

      <div className="cover-image" ref={coverRef}>
        <div className="cover-gradient"></div>
      </div>

      <div className="app-container">
        <div className="profile-section">
          <h1 className="profile-title">@VigneshKatta</h1>
        </div>

        <div className="links-section">
          {links.map((link) => (
            <a 
              key={link.id} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="link-card"
            >
              <div className="link-icon-container">
                {link.icon}
              </div>
              <span className="link-text">{link.title}</span>
              <div className="link-menu-icon">
                <MoreVertical size={18} color="white" />
              </div>
            </a>
          ))}
        </div>

        <div className="socials-footer">
          {socials.map((social) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>

        <div className="footer-credits">
          Made By <a href="https://vooho.in" target="_blank" rel="noopener noreferrer" className="footer-link">Vooho</a> with <span className="heart">❤️</span>
        </div>
      </div>
    </div>
  );
}

export default App;
