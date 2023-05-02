import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';

import { Text } from '@app/blueprints';

import { Icons } from '@src/assets';
import { BaseLayout } from '@src/components';
import type { NewsResult } from '@src/services';

import useNewslist from './useNewslist';

const NewslistScreen = () => {
  const {
    styles,
    data,
    getIcons,
    getImages,
    contents,
    onPressNetwork,
    onPressNewsItem,
  } = useNewslist();

  const ListHeaderComponent = () => {
    return (
      <View style={styles.headerContainer}>
        <Text preset="h1">{contents('common', 'Breaking_News')}</Text>
        <TouchableOpacity style={styles.networkButton} onPress={onPressNetwork}>
          {getIcons(Icons.SIDEMENU_ICONS, {
            resizeMode: 'contain',
          })}
        </TouchableOpacity>
      </View>
    );
  };

  const NewsListItem = ({ item }: { item: NewsResult }) => {
    return (
      <TouchableOpacity
        style={styles.newsItemContainer}
        onPress={onPressNewsItem(item)}>
        {getImages(item.urlToImage, {
          resizeMode: 'cover',
          style: styles.newsImage,
        })}
        <View style={styles.newsTextView}>
          <Text preset="h6">
            {item?.author ? item.author : contents('common', 'general')}
          </Text>
          <Text preset="title">{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }: { item: NewsResult }) => {
    return <NewsListItem item={item} />;
  };

  return (
    <BaseLayout>
      <FlatList
        bounces={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={data}
        style={styles.flatlistStyles}
        keyExtractor={(item, index) => {
          return `${item.publishedAt}${index}`;
        }}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
      />
    </BaseLayout>
  );
};

export default React.memo(NewslistScreen);
