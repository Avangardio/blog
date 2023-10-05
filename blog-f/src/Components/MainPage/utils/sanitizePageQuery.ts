
export default function sanitizePageQuery(page: string | undefined, totalPosts: number, pageSize: number = 5): number {
    let currentPage: string;

    if (page === undefined) {
        currentPage = "page1";
    } else if (Array.isArray(page)) {
        currentPage = page[0];
    } else {
        currentPage = page;
    }

    const cleanedPage = currentPage.replace(/[^\d.-]+/g, '');

    const parsedPage = parseInt(cleanedPage, 10);

    if (isNaN(parsedPage) || parsedPage < 1) {
        return 1;
    }

    return parsedPage;
}
