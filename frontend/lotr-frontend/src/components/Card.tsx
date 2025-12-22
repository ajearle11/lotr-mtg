interface ICard {
  name: string;
  id: number;
  collected: boolean;
  type: string;
  imageSrc: string;
}

const Card = ({ name, id, collected, type, imageSrc }: ICard) => {
  return (
    <div className="flex flex-col items-center justify-center card bg-base-100 h-125 w-80 shadow-sm border-1">
      <div className="card-body flex flex-col items-center justify-center text-center h-[35%]">
        <h2 className="card-title mb-2">
          {name} {collected}
        </h2>
        <p className="text-sm">
          #{id} - {type}
        </p>
      </div>
      <figure className="h-[65%]">
        <img className="w-[200px] rounded-[10px] mb-3" src={imageSrc} alt={name} />
      </figure>
    </div>
  );
};

export default Card;
