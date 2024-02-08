import { ToggleButton, ToggleButtonGroup } from "@mui/material";

type FilterSelectProps = {
  filterOption: string;
  setFilterOption: (arg: string) => void;
};

export default function FilterSelect({ filterOption, setFilterOption }: FilterSelectProps) {

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setFilterOption(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={filterOption}
      exclusive
      onChange={handleAlignment}
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