import { Activity } from "react";
import type { TCard } from "../types";
import {
  numberPrinter,
  switchHelperForColorImage,
  switchHelperForRarityImage,
} from "../utils/helpers";

interface IIndividualCard {
  card: TCard;
}

const IndividualCard = ({ card }: IIndividualCard) => {
  return (
    <div className="flex flex-col w-full justify-center items-center px-10 text-center">
      <h1 className="text-3xl pb-3">{card.name}</h1>
      <p className="pb-5">
        #{numberPrinter(card.id)} {card.type}
      </p>
      <img src={switchHelperForRarityImage(card.rarity)} />
      <div className="flex gap-3 mt-5 mb-8">
        {switchHelperForColorImage(card.color).map((c, i) => {
          return <img key={i} src={c} />;
        })}
      </div>
      <img
        className={`w-[400px] rounded-[10px] mb-10 mt-5 hover:scale-103 transition-transform duration-200 shadow-2xl shadow-[rgba(59,130,246,0.15)] cursor-pointer`}
        src={card.image}
        alt={card.name}
      />
      <p>Artist: {card.artist}</p>
      <p className="py-5  whitespace-pre-wrap">{card.text.substring(0, card.text.length -1)}</p>
      <Activity mode={card.flavorText ? "visible" : "hidden"}>
        <p className="italic">"{card.flavorText}"</p>
      </Activity>
    </div>
  );
};

export default IndividualCard;
