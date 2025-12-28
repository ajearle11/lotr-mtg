import { use } from "react";

function grabCardData(id) {
  return fetch(`https://magicapi-r777.onrender.com/cards/id/${id}`)
    .then(r => r.json());
}

export default function IndividualCardPage() {
  const card = use(grabCardData(2));

  return <div>{card.name}</div>;
}
