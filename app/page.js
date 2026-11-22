import Site from "../components/Site";
export default function Page() {
  const ld = { "@context": "https://schema.org", "@type": "Photographer", name: "Nani Photography Clickz", telephone: "+917731942566", sameAs: ["https://www.instagram.com/nani_photography_clickz/"], address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressRegion: "Telangana", addressCountry: "IN" } };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} /><Site /></>);
}
