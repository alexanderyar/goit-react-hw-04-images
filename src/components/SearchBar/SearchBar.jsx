import React from "react";
import { SearchbarStyle, SearchButton, SearchForm, SearchInput } from "./SearchBar.styled";


export  const SearchBar = ({ onSubmit }) => {
  // console.log(stringQuery)
    return (
    <SearchbarStyle>
  <SearchForm  onSubmit={onSubmit}>
    <SearchButton type="submit"  >
      <span className="button-label">Search</span>
    </SearchButton>

          <SearchInput
            name="imageString"
      className="input"
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
    />
  </SearchForm>
</SearchbarStyle>
)
}
