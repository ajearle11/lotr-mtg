interface ICard {
  name: string;
  id: number;
  collected: boolean;
  type: string;
  imageSrc: string;
}

const Card = ({ name, id, collected, type, imageSrc }: ICard) => {
  return (
    <div className="flex flex-col items-center text-center justify-center card bg-base-100 h-110 w-80 shadow-sm border-1 pb-5">
      <div className="card-body">
        <h2 className="card-title flex flex-col justify-between flex-grow h-full">
          {name}
        </h2>
        <p>
          #{id} - {collected}
        </p>
      </div>
      <figure>
        <img className="w-[200px] rounded-[10px]" src={imageSrc} alt={name} />
      </figure>
    </div>
  );
};

export default Card;
