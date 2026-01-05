import { formatMoney } from 'helpers/formarMonet';
import { Transaction } from 'interfaces/wallet';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTransactionStore } from 'store/store';

const MotionView = () => {
  const insets = useSafeAreaInsets();

  const { t } = useTranslation();
  const { transaction, getTransactionHistory } = useTransactionStore();
  const [searchText, setSearchText] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(transaction);

  useEffect(() => {
    getTransactionHistory();
  }, [getTransactionHistory]);

  useEffect(() => {
    setFilteredTransactions(transaction);
  }, [transaction]);

  const handleFilterChange = (text: string) => {
    setSearchText(text);
    if (text.trim() === '') {
      setFilteredTransactions(transaction);
      return;
    }

    const filtered = transaction.filter(
      (item) =>
        item.counterparty.toLowerCase().includes(text.toLowerCase()) ||
        item.amount.toString().includes(text)
    );
    setFilteredTransactions(filtered);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('es', { month: 'short' });
    const time = date.toLocaleTimeString('es', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    return `${day} ${month} - ${time}`;
  };

  return (
    <FlatList
      style={style.list}
      contentContainerStyle={{
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: insets.bottom,
      }}
      data={filteredTransactions}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={
        <TextInput
          placeholder={t('search_motion')}
          value={searchText}
          onChangeText={handleFilterChange}
          style={style.searchInput}
        />
      }
      renderItem={({ item }) => (
        <View style={style.transactionItem}>
          <View style={style.transactionInfo}>
            <Text style={style.transactionType}>
              {item.type === 'OUT' ? t('sent_to') : t('received_from')} {item.counterparty}
            </Text>
            <Text style={style.transactionDate}>{formatDate(item.created_at)}</Text>
          </View>
          <Text
            style={[
              style.transactionAmount,
              item.type === 'OUT' ? style.amountOut : style.amountIn,
            ]}>
            {item.type === 'OUT' ? '-' : '+'}
            {formatMoney(item.amount)}
          </Text>
        </View>
      )}
    />
  );
};
const style = StyleSheet.create({
  list: {
    flex: 1,
  },
  searchInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 14,
    color: '#666',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  amountOut: {
    color: '#000',
  },
  amountIn: {
    color: '#4CAF50',
  },
});
export default MotionView;
