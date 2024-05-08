import { Text, View } from '@components/Themed';
import { useMountedAsynThunk } from '@hooks/useMountedAsyncThunk';
import { Alert, FlatList, TouchableOpacity } from 'react-native';

import { CategoryItem } from '../components/CategoryItem';
import { getAllCategories } from '../redux/categories.controller';
import {
  selectStatus,
  selectError,
  selectData,
} from '../redux/categories.selector';
import { setRequestStatus } from '../redux/categories.slice';

export const CategoriesContainer = () => {
  const { data, isError, isLoading, isSuccess, error, refetch } =
    useMountedAsynThunk(
      {
        callbackError: (tag: string) => {
          Alert.alert(`Respuesta fallida -> ${tag}`);
        },
        callbackSuccess(tag: string) {
          Alert.alert(`Respuesta obtenida correctamente -> ${tag}`);
        },
      },
      {
        selectStatus,
        selectError,
        selectData,
        getAsynFn: getAllCategories,
        statusSetter: setRequestStatus,
      },
    );

  // useEffect(() => {
  //   refetch();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return (
      <View>
        <Text>
          {error?.message} {error?.status}
        </Text>
        <TouchableOpacity onPress={refetch}>
          <Text>Reload</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (isSuccess) {
    return (
      <View style={{ height: '100%', padding: '5%' }}>
        {data?.length ? (
          <FlatList
            data={data}
            renderItem={({ item }) => <CategoryItem category={item} />}
            onRefresh={refetch}
            refreshing={isLoading}
          />
        ) : (
          <Text>We cannot retrieve any data</Text>
        )}
        <TouchableOpacity onPress={refetch}>
          <Text>Reload</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View>
      <Text>We cannot retrieve any data</Text>
    </View>
  );
};
