export class Page {
    currentPage: number;
    totalPages: number;
    totalEl: number;
    elements: [];
    pagesOfNav: number[];
    currentPageLot: number;
    hasNextPageLot: boolean = false;
    hasLastPageLot: boolean = false;
}