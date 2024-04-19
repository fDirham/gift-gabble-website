import styles from "./LandingContent.module.scss";
import HeroPerson from "@/components/content/LandingContent/HeroPerson";
import SearchForm from "@/components/content/LandingContent/SearchForm";
import { FormResponse } from "@/utilities/customTypes";

type LandingContentProps = {
  handleSearch: (val: FormResponse) => void;
  searchFormCache: FormResponse | null;
};

export default function LandingContent(props: LandingContentProps) {
  return (
    <div className={styles.centerContainer}>
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
        fill the form below to get free gift recommendations!
      </span>
      <SearchForm
        onGo={props.handleSearch}
        initialValues={props.searchFormCache}
      />
    </div>
  );
}
