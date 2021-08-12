import {
  Checkbox,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import { i18ObjectPath } from "proxy-object-path";
import React, { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { OsEnum } from "../api/types";
import lang from "../translations/lang";
import {
  FilterContainer,
  FilterItem,
  TextFieldStyled,
  useStyles,
} from "./FilterBar.styles";

type FieldChangeEvent<T> = ChangeEvent<{
  name?: string | undefined;
  value: T;
}>;

export type FilterOnChangeEvent = (state: State) => void;

export type FilterType = {
  onlyAvailable: boolean;
  title: string | null;
  system: "" | OsEnum;
  vendor: string;
};

interface OwnProps {
  onChange: FilterOnChangeEvent;
  vendorList: string[];
}

type State = FilterType;

const FilterBar = ({ onChange, vendorList }: OwnProps) => {
  const classes = useStyles();
  const [state, setState] = React.useState<State>({
    onlyAvailable: false,
    system: "",
    title: null,
    vendor: "",
  });
  const { t } = useTranslation();

  const handleChangeAvailable = (
    _event: FieldChangeEvent<unknown>,
    checked: boolean
  ) => {
    setState((prevState) => {
      const state: State = {
        ...prevState,
        onlyAvailable: checked,
      };
      onChange(state);
      return state;
    });
  };

  const handleChangeOs = (event: FieldChangeEvent<unknown>) => {
    setState((prevState) => {
      const state: State = {
        ...prevState,
        system: event.target.value as OsEnum,
      };
      onChange(state);
      return state;
    });
  };

  const handleChangeVendor = (event: FieldChangeEvent<unknown>) => {
    setState((prevState) => {
      const state: State = {
        ...prevState,
        vendor: event.target.value as string,
      };
      onChange(state);
      return state;
    });
  };

  const handleSearch = (event: FieldChangeEvent<string>) => {
    const value = event.target.value.trim();

    if (!value) {
      setState((prevState) => {
        const state: State = {
          ...prevState,
          title: null,
        };
        onChange(state);
        return state;
      });
    } else if (value.length >= 2) {
      setState((prevState) => {
        const state: State = {
          ...prevState,
          title: value.toLowerCase(),
        };
        onChange(state);
        return state;
      });
    }
  };

  return (
    <FilterContainer>
      <FilterItem width={130}>
        <InputLabel shrink id="select-placeholder-os">
          {t(i18ObjectPath(lang.filter.os))}
        </InputLabel>
        <Select
          className={classes.selectEmpty}
          displayEmpty
          labelId="select-placeholder-os"
          onChange={handleChangeOs}
          value={state.system}
        >
          <MenuItem value="">
            <em>{t(i18ObjectPath(lang.filter.any))}</em>
          </MenuItem>
          {Object.keys(OsEnum).map((os) => (
            <MenuItem key={os} value={os}>
              {os}
            </MenuItem>
          ))}
        </Select>
      </FilterItem>
      <FilterItem width={130}>
        <InputLabel shrink id="select-placeholder-vendor">
          {t(i18ObjectPath(lang.filter.vendor))}
        </InputLabel>
        <Select
          className={classes.selectEmpty}
          displayEmpty
          labelId="select-placeholder-vendor"
          onChange={handleChangeVendor}
          value={state.vendor}
        >
          <MenuItem value="">
            <em>{t(i18ObjectPath(lang.filter.any))}</em>
          </MenuItem>
          {vendorList.map((vendor) => (
            <MenuItem key={vendor} value={vendor}>
              {vendor}
            </MenuItem>
          ))}
        </Select>
      </FilterItem>
      <FilterItem>
        <FormControlLabel
          control={
            <Checkbox
              checked={state.onlyAvailable}
              color="default"
              onChange={handleChangeAvailable}
            />
          }
          label={t(i18ObjectPath(lang.filter.onlyAvailable))}
        />
      </FilterItem>
      <TextFieldStyled
        onChange={handleSearch}
        placeholder={t(i18ObjectPath(lang.filter.search))}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlined />
            </InputAdornment>
          ),
        }}
      />
    </FilterContainer>
  );
};

export default FilterBar;
