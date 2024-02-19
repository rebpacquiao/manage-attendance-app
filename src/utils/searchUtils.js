import store from "@/store";

export const SearchHelper = (data, query) => {
  const filteredData = data.filter((item) => {
    const fullName = item.firstName + " " + item.lastName;
    return fullName.toLowerCase().includes(query.toLowerCase());
  });

  store.dispatch("updateFilteredData", filteredData);

  return filteredData;
};
