import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";

function CityList({ cities, isLoading }) {
  const city = cities;

  return (
    <ul className={styles.cityList}>
      {city?.map((cit) => (
        <CityItem cit={cit} key={cit} />
      ))}
    </ul>
  );
}

export default CityList;
