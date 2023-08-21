import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import _ from "lodash";

import { Button } from "./ui/button";

interface PaginationProps {
  datas: any;
  page: number;
  previousPage: (page: number) => void;
  nextPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  datas,
  page,
  previousPage,
  nextPage,
}) => {
  return (
    <div className="mt-8 px-4 mb-2 flex items-end justify-end">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            className="w-8 h-8 p-0"
            disabled={page === 0}
            onClick={() => previousPage(page)}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          <div className="p-0 flex items-center text-md font-medium">
            {page + 1}
          </div>
          <Button
            variant="ghost"
            className="w-8 h-8 p-0"
            disabled={_.isEmpty(datas)}
            onClick={() => nextPage(page)}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
