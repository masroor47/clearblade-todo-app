import { ToggleButton, ToggleButtonGroup } from "@mui/material";

type FilterSelectProps = {
  filterOption: string;
  setFilterOption: (arg: string) => void;
};

export default function FilterSelect({ filterOption, setFilterOption }: FilterSelectProps) {

  const handleFilterOption = (
    event: React.MouseEvent<HTMLElement>,
    newFilterOption: string,
  ) => {
    if (newFilterOption !== null) {
      setFilterOption(newFilterOption);
    }
  };

  return (
    <ToggleButtonGroup
      value={filterOption}
      exclusive
      onChange={handleFilterOption}
      size="small"
    >
      <ToggleButton value="all">
        All
      </ToggleButton>
      <ToggleButton value="active">
        Active
      </ToggleButton>
      <ToggleButton value="completed">
        Completed
      </ToggleButton>
    </ToggleButtonGroup>
  )
}