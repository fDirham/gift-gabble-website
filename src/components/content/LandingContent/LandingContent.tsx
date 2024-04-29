import styles from "./LandingContent.module.scss";
import HeroPerson from "@/components/content/LandingContent/HeroPerson";
import SearchForm from "@/components/content/LandingContent/SearchForm";

type LandingContentProps = {
  handleSearch: () => void;
};

export default function LandingContent(props: LandingContentProps) {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>
          FIND A <b>GIFT</b> FOR YOUR
        </h1>
        <HeroPerson />
        <h1 className={styles.heroTitle}>
          IN <b>SECONDS</b>
        </h1>
      </div>

      <span className={styles.explainText}>
        Fill the form below to get free gift ideas! <br />
        {"No sign ups required!"}
      </span>
      <SearchForm onGo={props.handleSearch} />
    </div>
  );
}
