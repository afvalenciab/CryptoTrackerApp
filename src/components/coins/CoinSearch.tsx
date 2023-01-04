import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';

interface Props {
  onChange: (value: string) => void;
}

const CoinSearch = ({onChange}: Props) => {
  const [query, setQuery] = useState<string | undefined>();

  const handleChange = (value: string) => {
    setQuery(value);
    onChange(value);
  };

  return (
    <View style={style.container}>
      <TextInput
        style={style.searchInput}
        onChangeText={handleChange}
        value={query}
        placeholder="Search coin"
        placeholderTextColor="white"
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 10,
  },
  searchInput: {
    backgroundColor: colors.blackPearl,
    borderRadius: 5,
    padding: 14,
    color: 'white',
  },
});

export default CoinSearch;
