import { nanoid } from "@reduxjs/toolkit";
import { Text } from "react-native";

import { useGetAllCategories } from "../hooks";

export const CategoriesContainer = () => {
  const { data, isError, isLoading, isSuccess } = useGetAllCategories();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (isError) {
    return <Text>An error has ocurred...</Text>;
  }

  if (isSuccess) {
    return data?.length ? (
      data.map((category) => <Text key={category + nanoid(3)}>{category}</Text>)
    ) : (
      <Text>We cannot retrieve any data</Text>
    );
  }
};
