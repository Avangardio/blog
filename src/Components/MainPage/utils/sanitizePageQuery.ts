
export default function sanitizePageQuery(page: string | undefined, totalPosts: number, pageSize: number = 5): number {
    let currentPage: string | number;

    if (page === undefined) {
        currentPage = "1";
    } else if (Array.isArray(page)) {
        currentPage = page[0];
    } else {
        currentPage = page;
    }

    const parsedPage = parseInt(currentPage.toString(), 10);

    if (isNaN(parsedPage) || parsedPage < 1) {
        return 1;
    }

    return parsedPage;
}
