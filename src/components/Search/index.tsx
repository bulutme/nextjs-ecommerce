import styled from "styled-components";
import Input from "../Input";
import debounce from "lodash.debounce";
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
`;

const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  $fullwidth,
  initialValue,
}) => {
  const debouncedSearch = debounce(onSearch, 300);
  return (
    <InputWrapper $fullwidth={$fullwidth}>
      <Input
        name="search"
        type="text"
        placeholder="Search by product, brand and category"
        onChange={(e) => debouncedSearch(e.target.value)}
        defaultValue={initialValue}
      />
    </InputWrapper>
  );
};

export default SearchInput;
