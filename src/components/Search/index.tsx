import React, { ChangeEvent, FC } from "react";
import styled from "styled-components";
import Input from "../Input";
import createDebouncedFunction from "@/helpers/utils";
interface SearchInputProps {
  onSearch: (query: string) => void;
  $fullwidth?: boolean;
  initialValue?: string;
}

const InputWrapper = styled.div<{ $fullwidth?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  width: ${(props) => (props.$fullwidth ? "100%" : "auto")};
  height: 42px;
  max-width: 650px;
`;

const SearchInput: FC<SearchInputProps> = ({
  onSearch,
  $fullwidth,
  initialValue,
}) => {
  // create a debounced version of the onSearch function
  const debouncedSearch = createDebouncedFunction(onSearch, 300);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  return (
    <InputWrapper $fullwidth={$fullwidth}>
      <Input
        name="search"
        type="text"
        placeholder="Search by product, brand and category"
        onChange={handleChange}
        defaultValue={initialValue}
      />
    </InputWrapper>
  );
};

export default SearchInput;
