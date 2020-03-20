import React from 'react'
type SearchResultsComProps = {
    searchTerm: string
}

const SearchResultsCom: React.FC<SearchResultsComProps> = (props) => {
        return(
            <div>
                SearchResultsCom
                {props.searchTerm}
            </div>
        )
    }
export default SearchResultsCom