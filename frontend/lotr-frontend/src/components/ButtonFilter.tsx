import { useFilterStore } from "../store/useAppStore";
import type { TButtonFilter } from "../types";

interface IButtonFilter {
  filters: Array<TButtonFilter>;
}

const ButtonFilter = ({ filters }: IButtonFilter) => {
  const setFilters = useFilterStore((state) => state.setFilters);

  const mapSymbols = (filters: Array<TButtonFilter>) => {
    return filters.map((filter: TButtonFilter, i: number) => {
      return (
        <button
          className={`btn btn-circle`}
          key={i}
          onClick={() => {
            setFilters(filter.value)
          }}
        >
          <img src={filter.src} />
        </button>
      );
    });
  };

  return (
    <div className="w-full bg-red gap-5 p-2 flex items-center justify-center flex-wrap">
      {mapSymbols(filters)}
    </div>
  );
};

export default ButtonFilter;
