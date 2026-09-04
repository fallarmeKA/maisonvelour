import { useEffect, useRef, useState, type ReactNode } from "react";
import "./MaisonViva.css";

/* ---------------- Types ---------------- */
interface FadeProps {
  children: ReactNode;
  delay?: number;
  variant?: "fade" | "pop";
  className?: string;
}

interface ColorWipeProps {
  children: ReactNode;
  color?: string;
  delay?: number;
  className?: string;
}

interface Piece {
  name: string;
  detail: string;
  price: string;
  img: string;
  color: string;
}

interface Spec {
  k: string;
  v: string;
}

interface Story {
  cat: string;
  title: string;
  img: string;
  color: string;
}

interface City {
  name: string;
  addr: string;
}

/* ---------------- Reveal primitives ---------------- */
function Fade({ children, delay = 0, variant = "fade", className = "" }: FadeProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`fade fade-${variant} ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function ColorWipe({ children, color = "var(--cobalt)", delay = 0, className = "" }: ColorWipeProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`color-wipe ${visible ? "is-visible" : ""} ${className}`}>
      {children}
      <div className="color-wipe-overlay" style={{ background: color, transitionDelay: `${delay}ms` }} />
    </div>
  );
}

/* ---------------- Data ---------------- */
const PIECES: Piece[] = [
  { name: "Cobalt Trench", detail: "Hand-dyed technical cotton", price: "€2,140", img: "https://images.unsplash.com/photo-1629426958003-35a5583b2977?w=700&q=80", color: "var(--cobalt)" },
  { name: "Magenta Wrap Dress", detail: "Silk charmeuse, hand-rolled hem", price: "€1,680", img: "https://images.unsplash.com/photo-1632178386020-40e5fcc73156?w=700&q=80", color: "var(--magenta)" },
  { name: "Solar Knit Set", detail: "Merino wool, saffron dye", price: "€1,240", img: "https://images.unsplash.com/photo-1619166719123-471cee9ce91e?w=700&q=80", color: "var(--gold)" },
  { name: "Coral Structured Blazer", detail: "Italian wool twill", price: "€1,920", img: "https://images.unsplash.com/photo-1654270842090-07f5a3064000?w=700&q=80", color: "var(--coral)" },
];

const SPECS: Spec[] = [
  { k: "Material", v: "Colour-blocked nappa leather" },
  { k: "Hardware", v: "Anodized aluminium clasp" },
  { k: "Origin", v: "Handcrafted in Barcelona" },
];

const STORIES: Story[] = [
  { cat: "Philosophy", title: "Why We Refuse Beige", img: "https://images.unsplash.com/photo-1675095598961-c255df060e90?w=700&q=80", color: "var(--cobalt)" },
  { cat: "Craft", title: "Inside the Dye Studio", img: "https://images.unsplash.com/photo-1633926248455-d729718e0886?w=700&q=80", color: "var(--magenta)" },
  { cat: "Culture", title: "Street Style, Barcelona", img: "https://images.unsplash.com/photo-1557159794-ee774f2eb5c0?w=700&q=80", color: "var(--gold)" },
];

const CITIES: City[] = [
  { name: "Barcelona", addr: "Carrer del Consell de Cent, 342" },
  { name: "Mexico City", addr: "Colonia Roma Norte" },
  { name: "Miami", addr: "Design District" },
  { name: "Seoul", addr: "Seongsu-dong, Seongdong-gu" },
];

const MARQUEE_ITEMS = ["CHROMATICA SS27", "WORN LOUD", "MADE IN BARCELONA", "LIMITED DROPS", "COLOR IS COUTURE"];

/* ---------------- Component ---------------- */
export default function MaisonViva() {
  const [scrolled, setScrolled] = useState(false);
  const [subState, setSubState] = useState<"idle" | "submitted">("idle");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const marqueeContent = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="mv-root">
      <header className={scrolled ? "scrolled" : ""}>
        <div className="logo">MAISON VELOUR</div>
        <nav>
          <ul>
            <li><a href="#collection">Collections</a></li>
            <li><a href="#process">Studio</a></li>
            <li><a href="#journal">Journal</a></li>
            <li><a href="#locations">Stores</a></li>
          </ul>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-dot" style={{ width: 260, height: 260, background: "var(--gold)", top: -80, right: -60 }} />
        <div className="hero-dot" style={{ width: 140, height: 140, background: "var(--coral)", bottom: 40, left: -40 }} />
        <div className="wrap">
          <div>
            <div className="eyebrow hero-eyebrow">Chromatica — Spring/Summer 2027</div>
            <h1>Fashion should feel like joy, not restraint.</h1>
            <p className="sub">MAISON VELOUR rejects the beige consensus. Every piece is hand-dyed in small batches, cut for movement, and built to be noticed — not blend in.</p>
            <a href="#collection" className="hero-cta">Shop Chromatica →</a>
          </div>
          <ColorWipe color="var(--gold)">
            <div className="img-box">
              <img src="https://images.unsplash.com/photo-1546561925-a427a021303a?w=900&q=80" alt="Chromatica campaign look" />
            </div>
          </ColorWipe>
        </div>
      </section>

      <div className="marquee-band">
        <div className="marquee-track">
          {marqueeContent.map((item, i) => (
            <span className="marquee-item" key={`${item}-${i}`}>{item}</span>
          ))}
        </div>
      </div>

      <section className="manifesto">
        <div className="wrap grid">
          <ColorWipe color="var(--coral)">
            <div className="img-box">
              <img src="https://images.unsplash.com/photo-1500241770736-a3f62bbc8717?w=900&q=80" alt="Colorful textiles" />
            </div>
          </ColorWipe>
          <Fade delay={100}>
            <div className="eyebrow" style={{ color: "var(--magenta)" }}>The Manifesto</div>
            <h2>We build clothes for people who refuse to fade into the background.</h2>
            <p>Quiet luxury told us to disappear. We think luxury should be felt from across the room — in colour, in texture, in the confidence of cut.</p>
            <p>Every dye lot is mixed by hand in our Barcelona studio using pigments sourced from botanical and mineral origins, so no two runs are ever quite the same.</p>
          </Fade>
        </div>
      </section>

      <section className="collection" id="collection">
        <div className="wrap">
          <Fade>
            <div className="collection-head">
              <div>
                <div className="eyebrow">Chromatica — Spring/Summer 2027</div>
                <h2>The Full Palette</h2>
              </div>
              <a href="#" className="view-all">View All Pieces</a>
            </div>
          </Fade>
          <div className="piece-grid">
            {PIECES.map((piece, i) => (
              <Fade key={piece.name} variant="pop" delay={i * 110}>
                <div className="piece-card">
                  <ColorWipe color={piece.color} delay={i * 60}>
                    <div className="img-box"><img src={piece.img} alt={piece.name} /></div>
                  </ColorWipe>
                  <h3>{piece.name}</h3>
                  <p>{piece.detail}</p>
                  <div className="price">{piece.price}</div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      <section className="spotlight">
        <div className="wrap grid">
          <ColorWipe color="var(--magenta)">
            <div className="img-box">
              <img src="https://images.unsplash.com/photo-1667842580879-85c62678e4a4?w=900&q=80" alt="The Prisma Bag" />
            </div>
          </ColorWipe>
          <Fade delay={100}>
            <div className="eyebrow" style={{ color: "var(--coral)" }}>Studio Signature</div>
            <h2>The Prisma Bag</h2>
            <p className="desc">Color-blocked panels in hand-dyed nappa leather, finished with an anodized clasp that shifts hue depending on the light. No two bags leave the studio identical.</p>
            <div className="spec-list">
              {SPECS.map((s) => (
                <div className="spec-row" key={s.k}><div className="k">{s.k}</div><div>{s.v}</div></div>
              ))}
            </div>
            <a href="#" className="spotlight-cta">Reserve at the Studio</a>
          </Fade>
        </div>
      </section>

      <section className="campaign">
        <ColorWipe color="var(--cobalt)">
          <div className="img-box">
            <img src="https://images.unsplash.com/photo-1576841944388-1d1b4b8494fc?w=900&q=80" alt="Campaign portrait" />
          </div>
        </ColorWipe>
        <div className="campaign-text">
          <Fade>
            <blockquote>"Luxury doesn't have to whisper. Ours sings in colour."</blockquote>
          </Fade>
          <Fade delay={100}>
            <div className="attribution">Mateo Rull, Creative Director</div>
          </Fade>
        </div>
      </section>

      <section className="process" id="process">
        <div className="wrap grid">
          <ColorWipe color="var(--gold)">
            <div className="img-box">
              <img src="https://images.unsplash.com/photo-1585751092218-cea84c1ecf01?w=900&q=80" alt="Barcelona dye studio" />
            </div>
          </ColorWipe>
          <Fade delay={100}>
            <div className="eyebrow" style={{ color: "var(--cobalt)" }}>The Studio</div>
            <h2>Dyed by hand, worn without apology.</h2>
            <p>In our Barcelona atelier, every colourway starts as a raw pigment — ground, mixed, and tested against fabric until it earns a place in the palette. It's slow work. We wouldn't do it any other way.</p>
            <a href="#">Meet the Dye Studio</a>
          </Fade>
        </div>
      </section>

      <section className="journal" id="journal">
        <div className="wrap">
          <Fade>
            <div className="journal-head" style={{ marginBottom: 60 }}>
              <div className="eyebrow">The Chronicle</div>
              <h2>Chromatica Journal</h2>
            </div>
          </Fade>
          <div className="journal-grid">
            {STORIES.map((s, i) => (
              <Fade key={s.title} variant="pop" delay={i * 120}>
                <div className="journal-card">
                  <ColorWipe color={s.color} delay={i * 60}>
                    <div className="img-box"><img src={s.img} alt={s.title} /></div>
                  </ColorWipe>
                  <div className="cat">{s.cat}</div>
                  <h3>{s.title}</h3>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      <section className="locations" id="locations">
        <div className="wrap">
          <Fade>
            <div className="eyebrow" style={{ color: "var(--magenta)" }}>Find Us</div>
            <h2>Studio Locations</h2>
          </Fade>
          <div className="city-grid">
            {CITIES.map((c, i) => (
              <Fade key={c.name} delay={i * 80}>
                <div className="city"><h3>{c.name}</h3><p>{c.addr}</p></div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      <section className="newsletter">
        <div className="wrap">
          <Fade>
            <div className="eyebrow" style={{ color: "var(--gold)", textAlign: "center" }}>Join the Palette</div>
            <h2>Get first access to colour drops</h2>
            <p>Limited runs, dye-studio invites, and early access to Chromatica — straight to your inbox, no beige included.</p>
            <form
              className="sub-form"
              onSubmit={(e) => {
                e.preventDefault();
                setSubState("submitted");
              }}
            >
              <input type="email" placeholder="Your email address" required />
              <button type="submit">{subState === "submitted" ? "Thank you" : "Join"}</button>
            </form>
          </Fade>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <div className="logo">MAISON VELOUR</div>
              <p>A house built on colour, craft, and the refusal to disappear. Barcelona, since 2019.</p>
            </div>
            <div>
              <h4>Collections</h4>
              <ul>
                <li><a href="#">Chromatica SS27</a></li>
                <li><a href="#">Archive Colourways</a></li>
                <li><a href="#">Ready-to-Wear</a></li>
              </ul>
            </div>
            <div>
              <h4>Studio</h4>
              <ul>
                <li><a href="#">Our Process</a></li>
                <li><a href="#">Dye Studio Visits</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4>Client Care</h4>
              <ul>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Shipping &amp; Returns</a></li>
                <li><a href="#">Store Locator</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div>© 2027 Maison Velour. All Rights Reserved.</div>
            <div className="links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms &amp; Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
