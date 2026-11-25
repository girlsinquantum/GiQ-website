// Talks, panels and workshops where Girls in Quantum was represented.
// Newest first. `date` (YYYY-MM-DD) is optional; when it is in the future
// the card shows an "Upcoming" badge. `dateLabel` is what visitors see.

export type TalkKind = "Talk" | "Panel" | "Workshop" | "Summit" | "Working group";

export interface Talk {
  title: string;
  event: string;
  kind: TalkKind;
  dateLabel: string;
  date?: string;
  location?: string;
  speakers: string[];
  description: string;
  link?: string;
}

export const talks: Talk[] = [
  {
    title: "QuantumX Summit",
    event: "Qiskit Fall Fest 2026 × QuantumX",
    kind: "Summit",
    dateLabel: "28 Nov 2026",
    date: "2026-11-28",
    speakers: ["Dhruv Sachdeva"],
    description:
      "Closing out Qiskit Fall Fest 2026, Dhruv joins the QuantumX Summit speaker lineup to talk about quantum education and making dense technical ideas simple.",
  },
  {
    title: "Inside Willow + Beyond the Quantum Computer",
    event: "Quantum + AI Insiders Tech Show",
    kind: "Panel",
    dateLabel: "Nov 2026",
    location: "London, UK",
    speakers: ["Diya Nair", "Sophia Guertler"],
    description:
      "Diya was MC of the Quantum + AI Compute track and chaired the panel on where useful quantum arrives first. Sophia led a hands-on workshop on hybrid workflows.",
  },
  {
    title: "Foundations of Quantum Computing × Girls in Quantum",
    event: "Qiskit Fall Fest 2026 · QuantumX Foundation",
    kind: "Talk",
    dateLabel: "Fall 2026",
    location: "Online",
    speakers: ["Girls in Quantum speakers"],
    description:
      "A beginner-friendly expert talk on qubits, superposition, entanglement, gates and circuits, real-world applications and quantum careers, with nearly 300 attendees.",
    link: "https://luma.com/8jpgnkcg",
  },
  {
    title: "Women in Quantum: Who Gets to Shape the Future?",
    event: "FCDO UK Science & Technology Network",
    kind: "Working group",
    dateLabel: "2026",
    location: "UK",
    speakers: ["Diya Nair"],
    description:
      "Diya represented Girls in Quantum at the preliminary workshop for the Women in Quantum initiative launched during UK Quantum Week.",
  },
  {
    title: "Girls in Quantum",
    event: "Perspektywy Women in Tech Summit 2026",
    kind: "Talk",
    dateLabel: "10 Jun 2026",
    date: "2026-06-10",
    location: "Poland",
    speakers: ["Diya Nair"],
    description:
      "A talk for students and early-career attendees on how to enter quantum through community, mentorship, outreach and global collaboration.",
    link: "https://www.womenintechsummit.pl/agenda/event/girls-in-quantum",
  },
];
