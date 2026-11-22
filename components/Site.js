"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { S, IMG, T, wa, enq, GEN, INSTAGRAM, PACKAGES } from "../lib/data";

const bg = (id) => `linear-gradient(145deg,${T[id][0]},${T[id][1]})`;
const real = (s, i) => !!IMG[s[0]][i];
const file = (s, i) => IMG[s[0]][i] || `${s[0]}-${String(i + 1).padStart(2, "0")}.jpg`;
const src = (s, i) => `/images/${s[3]}/${file(s, i)}`;
const short = (n) => n.replace(" Photography", "").replace(" & Special Occasions", "");
const items = (s) => Array.from({ length: IMG[s[0]].length || 3 }, (_, i) => ({ s, i }));
const R = ["3/4", "1/1", "4/5", "2/3"];

// One photo slot: real image if listed in IMG, otherwise a labelled placeholder
function Box({ s, i, ar = "4/5", nat = false, style }) {
  if (real(s, i))
    return (
      <div className="ph" style={{ padding: 0, ...(nat ? {} : { aspectRatio: ar }), ...style }}>
        <img src={src(s, i)} alt={`${s[1]} in Hyderabad by Nani Photography Clickz`} loading="lazy" decoding="async" style={{ display: "block", width: "100%", ...(nat ? { height: "auto" } : { height: "100%", objectFit: "cover" }) }} />
      </div>
    );
  return <div className="ph" style={{ background: bg(s[0]), aspectRatio: ar, ...style }}>Add: images/{s[3]}/{file(s, i)}</div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [["About", "about"], ["Portfolio", "portfolio"], ["Services", "services"], ["Packages", "packages"], ["Contact", "contact"]];
  return (
    <header><div className="wrap">
      
<a href="#top" aria-label="Nani Photography Clickz" className="brandlogo">
  <img src="/logo.png" alt="Nani Photography Clickz" />
</a>

      <nav aria-label="Main"><ul id="nav" className={open ? "open" : ""} onClick={(e) => e.target.tagName === "A" && setOpen(false)}>
        {links.map(([l, id]) => <li key={id}><a href={`#${id}`}>{l}</a></li>)}
      </ul></nav>
      <a className="btn" href={wa(GEN)}>Book a Shoot</a>
      <button id="menu" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div></header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="ph" style={{ background: "linear-gradient(rgba(25,15,8,.35), rgba(25,15,8,.55)), url('/images/hero.jpg') center/cover no-repeat" }} />
      <div className="wrap">
        <h1>Every Moment Deserves to Be Remembered.</h1>
        <p>Unhurried, honest photography for newborns, families, weddings and celebrations in Hyderabad.</p>
        <div className="row"><a className="btn light" href="#portfolio">Explore Portfolio</a><a className="btn line" href={wa(GEN)}>Book a Photoshoot</a></div>
      </div>
    </section>
  );
}
function Stories({ pick }) {
  return (
    <div className="stories" aria-label="Browse by category">
      {S.map((s) => <button key={s[0]} className="story" onClick={() => pick(s[0])}><i><b style={{ background: real(s, 0) ? `url('${src(s, 0)}') center/cover` : bg(s[0]) }} /></i>{short(s[1])}</button>)}
    </div>
  );
}

function About() {
  return (<>
    <section id="about"><div className="wrap about">
      <div className="ph">Add: images/family/photographer-portrait.jpg</div>
      <div className="t"><h2>Hello, I'm Nani.</h2>
        <p className="lead">I'm a freelance photographer based in Hyderabad. I photograph people as they are, so the pictures feel like your memory of the day.</p>
        <p>{/* TODO: replace with your real story and experience */}I take time to understand your family and your occasion, then stay quietly in the background while it unfolds. Available in Hyderabad, and for travel by arrangement.</p></div>
    </div></section>
    <section style={{ paddingTop: 0 }}><div className="wrap three">
      <div><h3>Philosophy</h3><p>Real moments matter more than stiff poses. I look for the glance, the laugh and the small gesture you would otherwise forget.</p></div>
      <div><h3>Approach</h3><p>We plan together, shoot calmly at your pace, and I deliver carefully edited photographs you can print and share.</p></div>
      <div><h3>Location &amp; availability</h3><p>Based in Hyderabad, Telangana. Message me on WhatsApp to check dates for your shoot.</p></div>
    </div></section>
  </>);
}

function Best({ pick }) {
  return (
    <section id="best"><div className="wrap"><h2>Best Photographs</h2>
      <p style={{ maxWidth: "34em", marginTop: 14 }}>A few favourites. Tap one to open that collection.</p>
      <div className="best">
        {["maternity", "kids", "baby", "newborn"].map((id, i) => { const s = S.find((x) => x[0] === id); return (
          <a key={id} className={`b b${i}`} href="#portfolio" style={{ padding: 0 }} onClick={() => pick(id)}>
            <Box s={s} i={0} ar="1/1" style={{ position: "absolute", inset: 0, aspectRatio: "auto" }} />
            <em style={{ position: "relative", zIndex: 1, padding: 16, color: "#fff", textShadow: "0 1px 8px rgba(0,0,0,.5)" }}>{short(s[1])}</em>
          </a>); })}
      </div>
    </div></section>
  );
}

function Portfolio({ cat, setCat }) {
  const [cur, setCur] = useState(null);
  const all = S.filter((s) => cat === "all" || s[0] === cat).flatMap(items);
  const shown = cat === "all" ? all.filter((p) => real(p.s, p.i)) : all;
  const sv = S.find((s) => s[0] === cat);
  useEffect(() => {
    if (cur === null) return;
    const k = (e) => { if (e.key === "Escape") setCur(null); if (e.key === "ArrowRight") setCur((c) => (c + 1) % shown.length); if (e.key === "ArrowLeft") setCur((c) => (c - 1 + shown.length) % shown.length); };
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, [cur, shown.length]);
  const p = cur !== null ? shown[cur] : null;
  return (
    <section id="portfolio" className="alt"><div className="wrap"><h2>Portfolio</h2>
      <div className="filters" role="group" aria-label="Filter by category">
        {[["all", "All"], ...S.map((s) => [s[0], short(s[1])])].map(([id, n]) => <button key={id} aria-pressed={id === cat} onClick={() => { setCat(id); setCur(null); }}>{n}</button>)}
      </div>
      {sv && <div className="catbar"><div><h3>{sv[1]}</h3><p>{sv[2]}</p></div><a className="btn" href={enq(sv[1].toLowerCase())}>Enquire about {short(sv[1]).toLowerCase()} shoots</a></div>}
      <div className="masonry">
        {shown.map((x, i) => <button key={x.s[0] + x.i} aria-label={`Open ${x.s[1]} photo`} onClick={() => setCur(i)}><Box s={x.s} i={x.i} ar={R[i % 4]} nat /><span className="cap">{x.s[1]}</span></button>)}
      </div>
    </div>
    <AnimatePresence>{p && (
      <motion.div id="lb" className="on" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Photo viewer">
        <button aria-label="Close" style={{ top: 8, right: 12 }} onClick={() => setCur(null)}>×</button>
        <button aria-label="Previous" style={{ left: 6 }} onClick={() => setCur((cur - 1 + shown.length) % shown.length)}><ChevronLeft size={40} /></button>
        {real(p.s, p.i)
          ? <img src={src(p.s, p.i)} alt={p.s[1]} style={{ maxWidth: "88vw", maxHeight: "80vh", display: "block" }} />
          : <div className="ph" style={{ background: bg(p.s[0]) }}>Add: images/{p.s[3]}/{file(p.s, p.i)}</div>}
        <button aria-label="Next" style={{ right: 6 }} onClick={() => setCur((cur + 1) % shown.length)}><ChevronRight size={40} /></button>
        <div className="cap">{p.s[1]}</div>
      </motion.div>)}</AnimatePresence>
    </section>
  );
}

function Services() {
  return (
    <section id="services"><div className="wrap"><h2>Services</h2><div className="cards">
      {S.map((s) => <article key={s[0]}><Box s={s} i={0} /><h3>{s[1]}</h3><p>{s[2]}</p><a className="enq" href={enq(s[1].toLowerCase())}>Enquire on WhatsApp</a></article>)}
    </div></div></section>
  );
}

function Process() {
  return (
    <section className="alt"><div className="wrap"><h2>How it works</h2><ol className="steps">
      <li><b>Message me</b><br />Tell me the occasion, date and place on WhatsApp.</li><li><b>Plan together</b><br />We agree the package, timing and ideas.</li>
      <li><b>Shoot day</b><br />Relaxed, unhurried and led by your moments.</li><li><b>Receive your photos</b><br />Edited photographs delivered to you.</li>
    </ol></div></section>
  );
}

function Packages() {
  return (
    <section id="packages" className="pk"><div className="wrap"><h2>Packages</h2>
      <p style={{ maxWidth: "34em", marginTop: 14 }}>Every shoot is planned around your occasion. Message me for details and availability.</p>
      <div className="grid">{PACKAGES.map((p) => <div className="box" key={p}><h3>{p}</h3><p>Contact for Pricing</p><a className="btn light" href={enq(`the ${p} package`)}>Ask about this package</a></div>)}</div>
    </div></section>
  );
}

function Instagram() {
  const tiles = S.filter((s) => IMG[s[0]].length).slice(0, 6);
  return (
    <section><div className="wrap">
      <div className="ig"><h2>Follow along on Instagram</h2><a className="btn" target="_blank" rel="noopener noreferrer" href={INSTAGRAM}>Follow @nani_photography_clickz</a></div>
      <div className="tiles">{tiles.map((s) => <Box key={s[0]} s={s} i={IMG[s[0]].length > 1 ? 1 : 0} ar="1/1" />)}</div>
      {/* Add real client testimonials here when you have them */}
      <p style={{ fontSize: ".9rem", opacity: 0.7, marginTop: 22 }}>Client reviews will appear here soon.</p>
    </div></section>
  );
}

function Contact() {
  const [f, setF] = useState({ name: "", phone: "", type: S[0][1], date: "", place: "", msg: "" });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => { e.preventDefault(); window.open(wa(`Hello Nani Photography Clickz!\nName: ${f.name}\nPhone: ${f.phone}\nShoot type: ${f.type}\nPreferred date: ${f.date}\nLocation: ${f.place}\nMessage: ${f.msg}`), "_blank"); };
  return (
    <section id="contact" className="alt"><div className="wrap contact">
      <div><h2>Let's plan your shoot</h2><ul>
        <li><a href={wa(GEN)}>WhatsApp +91 77319 42566</a></li><li><a href="tel:+917731942566">Call +91 77319 42566</a></li>
        <li><a target="_blank" rel="noopener noreferrer" href={INSTAGRAM}>Instagram @nani_photography_clickz</a></li><li>Hyderabad, Telangana, India</li></ul></div>
      <form onSubmit={submit}>
        <label>Name<input required autoComplete="name" value={f.name} onChange={set("name")} /></label>
        <label>Phone<input required type="tel" autoComplete="tel" value={f.phone} onChange={set("phone")} /></label>
        <label>Shoot type<select value={f.type} onChange={set("type")}>{S.map((s) => <option key={s[0]}>{s[1]}</option>)}</select></label>
        <div className="two"><label>Preferred date<input type="date" value={f.date} onChange={set("date")} /></label><label>Location<input value={f.place} onChange={set("place")} /></label></div>
        <label>Message<textarea rows={4} value={f.msg} onChange={set("msg")} /></label>
        <button className="btn">Send enquiry on WhatsApp</button>
      </form>
    </div></section>
  );
}

function Footer() {
  return (
    <footer><div className="wrap">
      <div><div className="logo" style={{ fontSize: "1.6rem" }}>Nani Photography Clickz</div><div style={{ fontSize: ".9rem", color: "#D9C7A6" }}>Photographer in Hyderabad, Telangana</div></div>
      <div style={{ display: "flex", gap: 20 }}><a target="_blank" rel="noopener noreferrer" href={INSTAGRAM}>Instagram</a><a href={wa(GEN)}>WhatsApp</a><a href="tel:+917731942566">Call</a></div>
      <small>© {new Date().getFullYear()} Nani Photography Clickz</small>
    </div></footer>
  );
}

export default function Site() {
  const [cat, setCat] = useState("all");
  const pick = (id) => { setCat(id); location.hash = "portfolio"; };
  return (<>
    <Header />
    <main><Hero /><Stories pick={pick} /><About /><Best pick={pick} /><Portfolio cat={cat} setCat={setCat} /><Services /><Process /><Packages /><Instagram /><Contact /></main>
    <Footer />
    <a className="wafab" href={wa(GEN)} aria-label="Chat on WhatsApp"><MessageCircle /></a>
  </>);
}
