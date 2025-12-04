type TCard = {
  title: string;
  number: string;
  collected: boolean;
  type?: string;
  imageSrc: string;
};

const Card = ({title, number, collected, type, imageSrc}: TCard) => {
  return (
    <div className="flex flex-col items-center justify-center card bg-base-100 w-96 shadow-sm border-1 pb-5">
      <div className="card-body">
        <h2 className="card-title">{title} - {type}</h2>
        <p>
          #{number} - {collected}
        </p>
      </div>
      <figure>
        <img
          src={imageSrc}
          alt={title}
        />
      </figure>
    </div>
  );
};

export default Card;
