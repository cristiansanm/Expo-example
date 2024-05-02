import { nanoid } from '@reduxjs/toolkit';

import { useGetAllCategories } from '../hooks';
import { Text, View } from '@components/Themed';
import { TabBarIcon } from '@components/IconBuilder';
import { useColorScheme } from '@components/useColorScheme';
import Colors from '@constants/Colors';
import { Link } from 'expo-router';

export const CategoriesContainer = () => {
  const { data, isError, isLoading, isSuccess } = useGetAllCategories();

  const currentScheme = useColorScheme();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (isError) {
    return <Text>An error has ocurred...</Text>;
  }

  if (isSuccess) {
    return (
      <View style={{ height: '100%', padding: '5%' }}>
        {data?.length ? (
          data.map(category => (
            <Link key={`${category}${nanoid(3)}`} href={'/(tabs)/two'}>
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
      </View>
    );
  }
};
