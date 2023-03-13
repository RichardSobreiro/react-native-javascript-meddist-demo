/** @format */

import { useState, useEffect } from "react";

import MedicinesList from "../components/SearchMedicines/MedicinesList";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import Loader from "../components/UI/Loader";
import Search from "../components/UI/Search";
import { fetchMedicines } from "../util/http/http";

const SearchMedicines = () => {
  const [medicinesList, setMedicinesList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState("LIGHT");

  useEffect(() => {
    async function getMedicines() {
      setIsFetching(true);
      try {
        const medicines = await fetchMedicines();
        setMedicinesList(medicines);
      } catch (error) {
        setError("Could not fetch medicines!");
      }
      setIsFetching(false);
    }

    getMedicines();
  }, []);

  const onChange = (e) => {
    setSearchTerm(e?.nativeEvent?.text);
    async function getMedicines() {
      setIsFetching(true);
      try {
        const medicines = await fetchMedicines(e?.nativeEvent?.text);
        setMedicinesList(medicines);
      } catch (error) {
        setError("Could not fetch medicines!");
      }
      setIsFetching(false);
    }

    getMedicines();
  };

  const onSearchClear = () => setSearchTerm("");

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <Loader />;
  }

  return (
    <>
      <Search
        isLoading={true}
        value={searchTerm}
        theme={theme}
        onChange={onChange}
        onSearchClear={onSearchClear}
      />

      <MedicinesList medicines={medicinesList} />
    </>
  );
};

export default SearchMedicines;
