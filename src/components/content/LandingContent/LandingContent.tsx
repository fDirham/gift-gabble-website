import styles from "./LandingContent.module.scss";
import HeroPerson from "@/components/content/LandingContent/HeroPerson";
import SearchForm from "@/components/content/LandingContent/SearchForm";
import { SearchConfig } from "@/utilities/customTypes";

type LandingContentProps = {
  handleSearch: (val: SearchConfig) => void;
  searchFormCache: SearchConfig | null;
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

      <SearchForm
        onGo={props.handleSearch}
        initialValues={props.searchFormCache}
      />
    </div>
  );
}
