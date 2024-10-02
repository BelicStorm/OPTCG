import { FaHeart } from "react-icons/fa";
import { CardModel } from "../models/card.models";
import MyImage from "./image.component";
import NormalBack from "/normal-back.jpg"

const TCGCard = ({ image, cardName, id, cardType }: CardModel) => {
    return (
        <div className="tcgCardSection">
            <div className="tcgCardContainer">
                <div className="tcgactionContainer">
                    <div className="likeContainer">
                        <FaHeart></FaHeart>
                    </div>
                    <div className="numberOfCardsContainer">x3</div>
                </div>
                <div className="tcgImageContainer">
                    <MyImage src={image} alt={id} className="img" loadingImg={NormalBack}/>
                    {/* <img src={image} loading="lazy" decoding="async"/> */}
                </div>
            </div>
            <div className="tcgCardMoreInfoContainer">
                <div className="cardInfoText">
                    <p className="cardName">{cardName}</p>
                    <p className="cardSerialNumber">{id}</p>
                </div>
                <div className="shopButtonsContainer">
                    <img src="./cmlogo.png" />
                </div>
            </div>
        </div>
    );
}

export default TCGCard;
