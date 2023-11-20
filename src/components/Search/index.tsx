"use client";

import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import styled from "styled-components";
import Input from "../Input";

interface SearchInputProps {
  onSearch?: (query: string) => void;
  fullWidth?: boolean;
}

const InputWrapper = styled.div<{ fullWidth?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  height: 42px;
`;

const SearchButton = styled.button`
  position: absolute;
  right: 0;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0 0.375rem 0.375rem 0;
  cursor: pointer;
  transition: background-color 0.3s;
  height: 100%;
`;

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, fullWidth }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch?.(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <InputWrapper fullWidth={fullWidth}>
      <Input
        type="text"
        placeholder="Search by product, brand and category"
        value={query}
        onKeyDown={handleKeyDown}
        onChange={(e) => setQuery(e.target.value)}
      />
      <SearchButton onClick={handleSearch}>
        <BsSearch size={20} />
      </SearchButton>
    </InputWrapper>
  );
};

export default SearchInput;
