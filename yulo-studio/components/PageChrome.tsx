import EmailChip from "./EmailChip";
import Navbar from "./Navbar";
import SmoothScroll from "./SmoothScroll";

/** Shared client-side furniture for every route except the home page. */
export default function PageChrome() {
  return (
    <>
      <SmoothScroll />
      <EmailChip />
      <Navbar />
    </>
  );
}
