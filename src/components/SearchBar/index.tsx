
import './styles.css';

type Props = {
    keyword:string | '',
    setKeyword:Function
}

const SearchBar = ({keyword, setKeyword}:Props) => {
    return (
      <input 
       className="search-box"
       key="random1"
       value={keyword}
       placeholder={"Search Pokemon"}
       onChange={(e) => setKeyword(e.target.value)}
      />
    );
  }
  
  export default SearchBar;