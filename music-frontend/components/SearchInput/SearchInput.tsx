import { IconSearch } from "@tabler/icons-react";
import { TextInput, TextInputProps } from "@mantine/core";

export const SearchInput = (props: TextInputProps) => {
  return (
    <TextInput
      radius="xl"
      size="md"
      placeholder="Search"
      rightSectionWidth={42}
      leftSection={<IconSearch size={18} stroke={1.5} />}
      styles={{
        input: {
          background: "rgba(255,255,255,0.26)",
          color: "#fff",
          "::placeholder": {
            color: "#fff",
            opacity: 1,
          },
        },
      }}
      {...props}
    />
  );
};
