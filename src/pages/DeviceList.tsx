import { i18ObjectPath } from "proxy-object-path";
import React from "react";
import { useTranslation } from "react-i18next";
import { getPhonesRequest } from "../api/methods/phones";
import { BorrowedObj, Phone, Phones } from "../api/types";
import { Card } from "../components/Card";
import FilterBar, {
  FilterType,
  FilterOnChangeEvent,
} from "../components/FilterBar";
import { useRootStore } from "../providers/use-root-store";
import lang from "../translations/lang";
import { formatDate } from "../utils/utils";
import { CardContainer, FilterBarStyled, NoResults } from "./DeviceList.styles";

interface State {
  filter: Partial<FilterType>;
  items: Phones;
  pending: boolean;
  vendorList: string[];
}

const filterItems = (filter: Partial<FilterType>) => (value: Phone) => {
  let match = true;

  if (filter.onlyAvailable) match = match && !value.borrowed;
  if (filter.title)
    match =
      match && value.model?.toLowerCase()?.includes(filter.title) === true;
  if (filter.system) match = match && value.os === filter.system;
  if (filter.vendor) match = match && value.vendor === filter.vendor;

  return match;
};

const getBorrowedInfo = (borrowed?: BorrowedObj) => {
  if (borrowed && borrowed.user && borrowed.user.name) {
    borrowed.user.name = borrowed.user.name.trim();
  }

  if (
    !borrowed ||
    (!borrowed.date && (!borrowed.user || !borrowed.user.name))
  ) {
    return undefined;
  }

  const formattedDate = borrowed.date && formatDate(borrowed.date);

  if (borrowed.user?.name && formattedDate) {
    return `${borrowed.user.name}, ${formattedDate}`;
  } else if (borrowed.user?.name && !formattedDate) {
    return borrowed.user.name;
  } else if (!borrowed.user?.name && formattedDate) {
    return formattedDate;
  }

  return undefined;
};

const getItemOsInfo = (item: Phone) =>
  item.os && item.osVersion
    ? `${item.os} / ${item.osVersion}`
    : item.os
    ? item.os
    : undefined;

const getVendorList = (items?: Phones) =>
  items
    ? items
        .map((item) => item.vendor)
        .filter(
          (value, index, self): value is string =>
            value !== undefined && self.indexOf(value) === index
        )
        .sort()
    : [];

const DeviceList = () => {
  const [state, setState] = React.useState<State>({
    filter: {},
    items: [],
    pending: false,
    vendorList: [],
  });
  const store = useRootStore();
  const { t } = useTranslation();

  const handleOnChange: FilterOnChangeEvent = (filterState) => {
    setState((prevState) => ({ ...prevState, filter: filterState }));
  };

  React.useEffect(() => {
    store.showLoading();
    setState((prevState) => ({ ...prevState, items: [], pending: true }));

    getPhonesRequest({
      onFinally: () => {
        store.hideLoading();
      },
      onSuccess: (response) => {
        setState((prevState) => ({
          ...prevState,
          items: response || [],
          pending: false,
          vendorList: getVendorList(response),
        }));
      },
      store,
    });
  }, [setState, store]);

  const items = !state.pending
    ? state.items.filter(filterItems(state.filter))
    : [];

  return (
    <>
      <FilterBarStyled>
        <FilterBar onChange={handleOnChange} vendorList={state.vendorList} />
      </FilterBarStyled>

      {!state.pending &&
        (items.length ? (
          <CardContainer>
            {items.map(
              (item) =>
                item.model && (
                  <Card
                    description={item.vendor}
                    imageUrl={item.image}
                    key={item.id}
                    label={getItemOsInfo(item)}
                    notAvailableInfo={getBorrowedInfo(item.borrowed)}
                    title={item.model}
                  />
                )
            )}
          </CardContainer>
        ) : (
          <NoResults>{t(i18ObjectPath(lang.general.noResults))}</NoResults>
        ))}
    </>
  );
};

export default DeviceList;
