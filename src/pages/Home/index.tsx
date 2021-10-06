import React from 'react';
import CardList from './../../components/CardList';
import Pagination from './../../components/Pagination';
import SearchBar from '../../components/SearchBar';
import './styles.css';

type Props = {};

type State = {
	loading: boolean;
	page: Array<any>;
	data: Array<any>;
	pageLimit: number;
	dataCount: number;
	pageNumber: number;
	searchKeyword: string;
};

export default class Home extends React.Component<Props, State> {
	state: State = {
		page: [],
		data: [],
		dataCount: 0,
		pageLimit: 20,
		pageNumber: 1,
		loading: false,
		searchKeyword: ""
	};

	componentDidMount = () => {
		this.fetchPageData(this.state.pageNumber);
	};

	onPageChanges = (nextPage: number) => {
		this.fetchPageData(nextPage);
	};

	fetchPageData = async (currentPage: number) => {
		this.setState({ loading: true,  searchKeyword: ""});
		const { pageLimit } = this.state;
		const pageOffset = (currentPage - 1) * pageLimit;
		const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${pageLimit}&offset=${pageOffset}`;
		const res = await fetch(apiUrl);
		const data = await res.json();
		const result = data.results;
		const dataCount = data.count;
		const pokemons = await Promise.all(
			result.map(async (item: any) => {
				const pokemon = await (await fetch(item.url)).json();
				return pokemon;
			})
		);
		this.setState({ loading: false, pageNumber: currentPage, page: pokemons, data: pokemons, dataCount: dataCount });
	};

	onPaginationChange = (value: number) => {
		this.fetchPageData(value);
	};

	onSearch = (value: string) => {
        const { data } = this.state;
        const searchKeyword = value === ' ' ? '' : value;
        const page = this.filter(searchKeyword, data);
		this.setState({ searchKeyword, page });
	};

	filter = (value: string, list: Array<any>) => {
		if (!value || String(value).trim() === '') return list;
		const _filter = list.filter((item) =>  
			String(item.name).includes(value) ||
				String(item.weight).includes(value) ||
				String(item.height).includes(value)
        );
		return _filter;
	};

	render() {
		const { page, searchKeyword, pageNumber, pageLimit, dataCount, loading } = this.state;

		if(loading) {
			return (<div className="loader_contatiner"><h4>Loading...</h4></div>)
		} 

		return (
				<div className="home-contatiner">
					<div className="header-container">
						<SearchBar keyword={searchKeyword} setKeyword={(value: string) => this.onSearch(value)} />
					</div>
					<Pagination
						onChange={(value: number) => this.onPaginationChange(value)}
						pageLimit={4}
						pageNumber={pageNumber}
						dataCount={dataCount}
						dataLimit={pageLimit}
					/>
					<CardList data={page} />
					<Pagination
						onChange={(value: number) => this.onPaginationChange(value)}
						pageLimit={4}
						pageNumber={pageNumber}
						dataCount={dataCount}
						dataLimit={pageLimit}
					/>
				</div>
		);
	}
}


