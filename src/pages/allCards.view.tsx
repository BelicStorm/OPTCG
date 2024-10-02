import { useEffect, useState } from "react";
import Modal from "../components/modal.component";
import Autocomplete from "../components/searchBar.component";
import useWindowSize from "../hooks/useWindowSize";
import { FaFilter } from "react-icons/fa";
import TCGCard from "../components/tcgCard.component";
import cardsAPiService from "../services/cards.service";
import useAsyncAction from "../hooks/useAsyncAction";
import { CardModel, CardResultModel } from "../models/card.models";
import { LoadingComponent, LoadingMoreComponent } from "../components/loading.component";
import InfiniteScroll from "react-infinite-scroll-component";
import { FilterSection } from "../components/filterSection.hoc";


const LeftSection = () => {
    return (
        <section className="leftSection">
            <div className="collectionInfo-container">
                <div className="titleSection">
                    Collection
                </div>
            </div>
            <div className="filter-container">
                <div className="titleSection">
                    Filters
                </div>
                <FilterSection />
            </div>
        </section>
    );
}

const CardListSection = ({ cards }: { cards?: CardModel[] }) => {
    return cards?.map((e) => <TCGCard {...e} key={e.id} />)

}
const AllCards = () => {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const { width } = useWindowSize()
    const [cards, setCards] = useState<CardResultModel | undefined>();

    const { execute: getCards, isExecuting } = useAsyncAction<CardResultModel>({
        onExecute: async () => {
            console.log("hola");
            
            const query = cards ? {page: `${ cards.pagination.currentPage + 1}`, limit:"12"} : {}
            return await cardsAPiService.get(query)
        },
        onSucceed: (result) => {
            // setTimeout(() => {
                setCards({pagination:result.pagination, data:[...(cards ? cards.data : []) , ...result.data]});
                console.log({pagination:result.pagination, data:[...(cards ? cards.data : []) , ...result.data]});
                
            // }, 2000);
        },
        onFailure: (_) => console.error("Ha ocurrido un error inesperado")
    })

    useEffect(() => {
        getCards()
    }, [])

    return (
        <div className="allCards-container">
            {
                width > 800
                    ? (
                        <LeftSection />
                    )
                    : <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} title="Filters">
                        <div className="filterModalContent">
                            <FilterSection />
                        </div>
                    </Modal>
            }

            <section className="listSection">
                <div className="search-container">
                    <Autocomplete options={["aa", "a", "ab", "abb"]} />
                    {width < 800 && <FaFilter onClick={() => setModalIsOpen(true)} />}
                </div>
                <div id="listContainer">
                    {
                        isExecuting || !cards
                            ? <LoadingComponent />
                            : <InfiniteScroll
                                className="listContainer"
                                dataLength={cards.data.length} //This is important field to render the next data
                                next={getCards}
                                hasMore={cards.pagination.hasNextPage}
                                scrollableTarget="listContainer"
                                // height={"80vh"}
                                loader={<LoadingMoreComponent />}
                                endMessage={
                                    <p style={{ textAlign: 'center' }}>
                                        <b>Yay! You have seen it all</b>
                                    </p>
                                }
                            >
                                <CardListSection cards={cards.data}/>
                            </InfiniteScroll>
                    }
                </div>
            </section>
        </div>
    );
}

export default AllCards;