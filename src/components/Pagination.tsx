interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
	const handlePrevious = () => {
		if (currentPage > 1) onPageChange(currentPage - 1);
	};

	const handleNext = () => {
		if (currentPage < totalPages) onPageChange(currentPage + 1);
	};

	return (
		<div className="flex justify-between items-center mt-4">
			<button
				className={`bg-gray-300 p-2 rounded ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
				onClick={handlePrevious}
				disabled={currentPage === 1}
				type="button"
			>
				Previous
			</button>
			<span className="mx-2">
				Page
				{' '}
				{currentPage}
				{' '}
				of
				{' '}
				{totalPages}
			</span>
			<button
				className={`bg-gray-300 p-2 rounded ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
				onClick={handleNext}
				disabled={currentPage === totalPages}
				type="button"
			>
				Next
			</button>
		</div>
	);
}

export default Pagination;
