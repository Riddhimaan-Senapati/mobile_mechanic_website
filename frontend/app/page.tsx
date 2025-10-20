import Image from "next/image";
import LoginPage from "./auth/login/page"; 

export default function Home() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const [zipcode, setZipcode] = useState("");
  const [message, setMessage] = useState("");

  const updateArrows = () => {
    // change arrows if reached end
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanLeft(el.scrollLeft > 1);
    setCanRight(el.scrollLeft < maxScroll - 1);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();
    const onScroll = () => updateArrows();
    el.addEventListener("scroll", onScroll, { passive: true });
    const onResize = () => updateArrows();
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const getChipStep = () => {
    // how much to move by each time arrow is pressed
    const el = trackRef.current;
    if (!el) return 120;
    const firstChip = el.querySelector(".chip") as HTMLElement | null;
    const gapStr =
      getComputedStyle(el).columnGap || getComputedStyle(el).gap || "0";
    const gap = parseFloat(gapStr) || 0;
    const chipW = firstChip?.getBoundingClientRect().width ?? 112;
    return chipW + gap;
  };

  const scrollByCards = (dir: -1 | 1) => {
    // left | right
    const el = trackRef.current;
    if (!el) return;
    const amount = dir * getChipStep() * 3; // goes 3 at a time
    el.scrollBy({ left: amount, behavior: "smooth" });
    requestAnimationFrame(() => setTimeout(updateArrows, 180));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollByCards(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollByCards(1);
    }
  };

  return (
    <LoginPage /> // Rendering the login page directly for now
  );
}
