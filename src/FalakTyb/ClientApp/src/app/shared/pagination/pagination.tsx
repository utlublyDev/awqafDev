import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }



    //selected page
    const [selectedPage, setSelectedPage] = useState(1);
    const handleClick = (page) => {
        setSelectedPage(page);
        paginate(page);
    }
    const handlePrevious = () => {
        if (selectedPage > 1) {
            setSelectedPage(selectedPage - 1);
            paginate(selectedPage - 1);
        }
    }

    const handleNext = () => {
        if (selectedPage < pageNumbers.length) {
            setSelectedPage(selectedPage + 1);
            paginate(selectedPage + 1);
        }
    }




    return (

        <div className="bg-white px-4 py-3 flex items-center justify-center rounded-md border border-transparent shadow-md sm:px-6 mt-7 mb-7">
            <div className="flex-1 flex  justify-between sm:hidden">
                <a
                 onClick={() => handlePrevious()}
                 
                    className="relative inline-flex items-center px-4 py-2  border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    السابق
                </a>
                <a
                    onClick={() => handleNext()}
                    className="ml-3 relative inline-flex items-center px-4 py-2  border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    التالي
                </a>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center justify-center ">

                <div>
                    <nav className="relative z-0 inline-flex rounded-md  -space-x-px" aria-label="Pagination">

                        {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-transparenttext-gray-500 hover:bg-gray-50" */}

                        {pageNumbers.map(number => (

                            <a key={number}
                                onClick={() => handleClick(number)}
                                aria-current="page"
                                className={`relative inline-flex items-center px-4 py-2 rounded-md ${number === selectedPage ? "bg-[#F7F7F7] border-[#F7F7F7] text-[#827349]" : "bg-white border-transparenttext-gray-500 hover:bg-gray-50"}`}
                            >
                                {number}
                            </a>

                        ))}


                        <span className="relative z-0 inline-flex items-center px-2 py-2 ">
                            الصفحات
                        </span>
                    </nav>
                </div>
            </div>
        </div>


    );
};






export default Pagination;