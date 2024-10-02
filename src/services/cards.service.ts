import cardData from "./onePieceCards.json"
const cardsAPiService = {

    get: async ({page = "1",limit = "12", query}:{page?:string, limit?:string, query?:string}) => {

        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);

        // Calculate starting index
        const startIndex = (pageNum - 1) * limitNum;
        const endIndex = pageNum * limitNum;

        const allCardsFlatened = Object.values(cardData).flat()
        // Paginated results
        const results = allCardsFlatened.slice(startIndex, endIndex);

        // Total number of cards
        const totalCards = allCardsFlatened.length;

        // Pagination metadata
        const pagination = {
            totalItems: totalCards,
            currentPage: pageNum,
            totalPages: Math.ceil(totalCards / limitNum),
            hasNextPage: endIndex < totalCards,
            hasPreviousPage: startIndex > 0
        };

        // Return paginated cards and pagination metadata
       return { pagination, data: results };

    }

}

export default cardsAPiService