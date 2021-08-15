import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const AutoCompleteInput = ({ options, label, value, onSelect }) => {
  return (
    <Autocomplete
      value={value}
      id={label}
      style={{ width: "100%" }}
      options={options}
      autoSelect
      onChange={(_, newValue) => {
        newValue ? onSelect(newValue) : onSelect(value);
      }}
      getOptionLabel={(option) => option.label}
      renderOption={(option) => <>{option.label}</>}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // no autofill
          }}
        />
      )}
    />
  );
};

export default AutoCompleteInput;
