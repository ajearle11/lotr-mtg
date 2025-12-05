import type { TButtonFilter } from "../types";

interface IButtonFilter {
  filters: Array<TButtonFilter>;
}

const ButtonFilter = ({ filters }: IButtonFilter) => {
  const mapSymbols = (filters: Array<TButtonFilter>) => {
    return filters.map((filter: TButtonFilter, i: number) => {
      return (
        <button key={i} onClick={filter.onClick} className="btn btn-circle">
          <img src={filter.src} />
        </button>
      );
    });
  };

  return (
    <div className="grid w-full grid-cols-4 sm:gap-5 p-2 justify-center items-center sm:flex sm:items-center sm:justify-center">
      {mapSymbols(filters)}
    </div>
  );
};

export default ButtonFilter;
