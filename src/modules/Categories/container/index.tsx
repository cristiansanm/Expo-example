import Colors from '@assets/constants/Colors';
import { TabBarIcon } from '@components/IconBuilder';
import { Text, View } from '@components/Themed';
import { useColorScheme } from '@components/useColorScheme';
import { useGetQuery } from '@hooks/useGetQuery';
import { nanoid } from '@reduxjs/toolkit';
import { Link } from 'expo-router';
import { Alert, TouchableOpacity } from 'react-native';

import { getAllCategories } from '../redux/categories.controller';
import {
  selectStatus,
  selectError,
  selectData,
} from '../redux/categories.selector';
import { setRequestStatus } from '../redux/categories.slice';
export const CategoriesContainer = () => {
  const { data, isError, isLoading, isSuccess, error, refetch } = useGetQuery({
    selectStatus,
    selectError,
    selectData,
    getAsynFn: () =>
      getAllCategories({
        callbackError: tag => {
          Alert.alert(`Respuesta fallida -> ${tag}`);
        },
        callbackSuccess(tag) {
          Alert.alert(`Respuesta obtenida correctamente -> ${tag}`);
        },
      }),
    statusSetter: setRequestStatus,
  });

  const currentScheme = useColorScheme();

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
          data.map((category: string) => (
            <Link key={`${category}${nanoid(3)}`} href="/(tabs)/two">
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TabBarIcon
                  name="list"
                  color={Colors[currentScheme ?? 'light'].tint}
                />
                <Text key={category + nanoid(3)}>{category}</Text>
              </View>
            </Link>
          ))
        ) : (
          <Text>We cannot retrieve any data</Text>
        )}
        <TouchableOpacity onPress={refetch}>
          <Text>Reload</Text>
        </TouchableOpacity>
      </View>
    );
  }
};
