import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://xplorakps.tech';
const SITE_NAME = 'XPLORA 2026';
const DEFAULT_TITLE = 'XPLORA 2026 — Official Techfest & Gaming Festival | KPS';
const DEFAULT_DESC = 'Official website of XPLORA 2026 — The premier editorial techfest and gaming festival hosted by Krishna Public School. Hackathons, esports tournaments, AI symposiums, robotics, web design & code wars.';

const ROUTE_SEO = {
  '/': {
    title: 'XPLORA 2026 — Official Techfest & Gaming Festival | KPS',
    description: 'Welcome to XPLORA 2026 — The premier editorial techfest and gaming festival hosted by Krishna Public School. Explore events, register for esports tournaments, hackathons, and tech talks.',
    keywords: 'XPLORA, Xplora, Xplora 2026, Xplora Techfest, Xplora KPS, Xplora Gaming, Tech Festival, Esports, Hackathon',
  },
  '/events': {
    title: 'Events & Competitions — XPLORA 2026 Techfest',
    description: 'Discover exciting competitions at XPLORA 2026: Hackathons, Esports Arena, Robo Dangal, Code Wars, Hurdle Mania, Web Design, AI Ideathon, and Multimedia contests.',
    keywords: 'XPLORA events, Xplora hackathon, Xplora esports, Robo Dangal, Code Wars, Tech competitions',
  },
  '/schedule': {
    title: 'Schedule & Timeline — XPLORA 2026 Techfest',
    description: 'Check out the event schedule and timeline for XPLORA 2026. Stay up-to-date with tournament times, keynote speeches, and competition rounds.',
    keywords: 'XPLORA schedule, Xplora timeline, Xplora event schedule, Techfest agenda',
  },
  '/speakers': {
    title: 'Keynote Speakers & Tech Leaders — XPLORA 2026',
    description: 'Meet the industry experts, keynote speakers, and tech leaders presenting at XPLORA 2026 Techfest.',
    keywords: 'XPLORA speakers, tech keynote speakers, industry experts, Xplora tech talks',
  },
  '/sponsors': {
    title: 'Sponsors & Partners — XPLORA 2026 Techfest',
    description: 'Our proud sponsors and corporate partners supporting XPLORA 2026 — Krishna Public School premier tech event.',
    keywords: 'XPLORA sponsors, Xplora partners, techfest sponsors, KPS techfest',
  },
  '/team': {
    title: 'Meet the Organizing Team — XPLORA 2026',
    description: 'Get to know the passionate student organizers and advisors from ATL Club KPS behind XPLORA 2026.',
    keywords: 'XPLORA team, ATL Club KPS, organizers, Xplora committee',
  },
  '/register': {
    title: 'Register Now for Events — XPLORA 2026 Techfest',
    description: 'Register for XPLORA 2026 events, esports tournaments, and hackathons. Secure your spot now!',
    keywords: 'XPLORA registration, register Xplora, event sign up, esports registration',
  },
  '/contact': {
    title: 'Contact Us — XPLORA 2026 Techfest',
    description: 'Have questions about XPLORA 2026? Contact the XPLORA team at info@xplorakps.tech or reach out via social media.',
    keywords: 'Contact XPLORA, Xplora email, Xplora support, KPS techfest contact',
  },
  '/faq': {
    title: 'Frequently Asked Questions — XPLORA 2026',
    description: 'Find answers to common questions about participation, guidelines, schedules, and registration for XPLORA 2026.',
    keywords: 'XPLORA FAQ, Xplora help, event questions, techfest guidelines',
  },
  '/privacy': {
    title: 'Privacy Policy — XPLORA 2026',
    description: 'Read the official Privacy Policy for XPLORA 2026 Techfest.',
    keywords: 'XPLORA privacy policy',
  },
  '/terms': {
    title: 'Terms of Service — XPLORA 2026',
    description: 'Read the official Terms of Service and Code of Conduct for XPLORA 2026 Techfest.',
    keywords: 'XPLORA terms, code of conduct',
  },
};

export default function SEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    const currentSeo = ROUTE_SEO[pathname] || ROUTE_SEO['/'];
    const title = currentSeo.title || DEFAULT_TITLE;
    const description = currentSeo.description || DEFAULT_DESC;
    const fullUrl = `${BASE_URL}${pathname === '/' ? '' : pathname}`;

    // Document title
    document.title = title;

    // Helper to set meta tags
    const setMeta = (nameAttr, nameVal, content) => {
      let el = document.querySelector(`meta[${nameAttr}="${nameVal}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(nameAttr, nameVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Helper to set canonical tag
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', fullUrl);

    // Standard meta tags
    setMeta('name', 'description', description);
    if (currentSeo.keywords) {
      setMeta('name', 'keywords', currentSeo.keywords);
    }

    // Open Graph
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', fullUrl);

    // Twitter Card
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
  }, [pathname]);

  return null;
}
