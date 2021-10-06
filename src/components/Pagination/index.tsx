import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeftRounded from '@material-ui/icons/KeyboardArrowLeftRounded';
import KeyboardArrowRightRounded from '@material-ui/icons/KeyboardArrowRightRounded';
import './styles.css';

type Props = {
  pageLimit:number,
  dataCount:number,
  dataLimit:number,
  pageNumber:number,
  onChange:Function,
};

function Pagination({ pageNumber, pageLimit, dataCount, dataLimit, onChange} : Props) {
	const pages = Math.round(dataCount / dataLimit);
	const [ currentPage, setCurrentPage ] = useState(pageNumber);

	function goToNextPage() {
		setCurrentPage((currentPage: number) => currentPage + 1);
    	onChange(currentPage + 1);
	}

	function goToPreviousPage() {
		setCurrentPage((currentPage: number) => currentPage - 1);
    	onChange(currentPage - 1);
	}

	function changePage(event:any) {
		const pageNumber = event ? Number(event?.target?.textContent) : 0;
		setCurrentPage(pageNumber);
    	onChange(pageNumber);
	}

	const getPaginationGroup = () => {
		let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
		start = (start + pageLimit) > pages ? pages - pageLimit : start;
		debugger; 
		return new Array(pageLimit).fill(1).map((_, idx) => start + idx + 1);
	};

	return (
		<div>
			<div className="pagination-container">
				<IconButton size={"small"} onClick={goToPreviousPage} className={`prev ${currentPage === 1 ? 'disabled' : ''}`}>
					<KeyboardArrowLeftRounded fontSize="large" />
				</IconButton>
				 {getPaginationGroup().map((item, index) => (
					<IconButton
						key={index}
            size={"medium"}
						onClick={(event) => changePage(event)}
						className={`paginationItem ${currentPage === item ? 'active' : null}`}
					>
						<span>{item}</span>
					</IconButton>
				))}
				<IconButton size={"small"} onClick={goToNextPage} className={`next ${currentPage === pages ? 'disabled' : ''}`}>
					<KeyboardArrowRightRounded fontSize="large" />
				</IconButton>
			</div>
		</div>
	);
}

export default Pagination;


