import { COLORS } from 'constants/Colors';
import { formatMoney } from 'helpers/formarMonet';
import { Transaction } from 'interfaces/wallet';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getBalance } from 'service/wallet/wallet.service';
import { useTransactionStore } from 'store/store';

const { WHITE, GRAY_COLOR, LIGHT_GRAY, DARK_BLACK, DARK_GREEN, LIGHT_GREEN } = COLORS;
const MotionView = () => {
  const insets = useSafeAreaInsets();

  const { t } = useTranslation();
  const { transaction, getTransactionHistory } = useTransactionStore();
  const [searchText, setSearchText] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(transaction);
  const [loading, setLoading] = useState<boolean>(false);
  const [balance, setBalance] = useState<number | null>(0);
  const getBalanceData = async (): Promise<void> => {
    try {
      setLoading(true);
      const { error, balance } = await getBalance();
      if (error) {
        setBalance(0);
        setLoading(false);
        return;
      }
      setBalance(balance);
    } catch (error: Error | any) {
      setLoading(false);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getBalanceData();
  }, []);
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

  const renderSearchInput = (
    <View>
      <View className="mb-10">
        <Text style={{ fontSize: 18, fontWeight: '400' }}>{t('available_balance')}</Text>
        <Text style={{ fontSize: 23, fontWeight: '700', marginTop: 4 }}>
          {loading ? 'Cargando...' : formatMoney(balance || 0)}
        </Text>
      </View>
      <Text style={{ fontSize: 24, fontWeight: '400', marginBottom: 20 }}>{t('motion_title')}</Text>
      <View style={[style.searchInputContainer, { marginBottom: 10 }]}>
        <Ionicons style={style.searchIcon} name="search" size={24} color={GRAY_COLOR} />
        <TextInput
          placeholder={t('search_motion')}
          value={searchText}
          onChangeText={handleFilterChange}
          style={style.searchInput}
        />
      </View>
    </View>
  );

  return (
    <FlatList
      style={style.list}
      contentContainerStyle={{
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: insets.bottom,
      }}
      data={filteredTransactions}
      maxToRenderPerBatch={10}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={renderSearchInput}
      renderItem={({ item }) => (
        <View style={style.transactionItem}>
          <View
            style={[
              style.transactionInfo,
              { flexDirection: 'row', alignItems: 'center', gap: 12 },
            ]}>
            <View>
              {item.direction === 'OUT' ? (
                <View style={{ padding: 10, borderRadius: 32, backgroundColor: LIGHT_GRAY }}>
                  <Ionicons name="cash-outline" size={24} color={DARK_BLACK} />
                </View>
              ) : (
                <View style={{ padding: 10, borderRadius: 32, backgroundColor: LIGHT_GREEN }}>
                  <Ionicons name="cash-outline" size={24} color={DARK_GREEN} />
                </View>
              )}
            </View>
            <View>
              <Text style={style.transactionType}>
                {item.direction === 'OUT' ? t('sent_to') : t('received_from')} {item.counterparty}
              </Text>
              <Text style={style.transactionDate}>{formatDate(item.created_at)}</Text>
            </View>
          </View>
          <Text
            style={[
              style.transactionAmount,
              item.direction === 'OUT' ? style.amountOut : style.amountIn,
            ]}>
            {item.direction === 'OUT' ? '-' : '+'}
            {formatMoney(item.amount)}
          </Text>
        </View>
      )}
    />
  );
};
const style = StyleSheet.create({
  list: {
    backgroundColor: WHITE,
    flex: 1,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: LIGHT_GRAY,
    borderRadius: 32,
    paddingHorizontal: 12,
    marginTop: 8,
  },
  searchIcon: {
    marginRight: 8,
    marginLeft: 4,
  },
  searchInput: {
    width: '100%',
    padding: 15,
    fontSize: 16,
    flex: 1,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: GRAY_COLOR,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 14,
    color: GRAY_COLOR,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  amountOut: {
    color: DARK_BLACK,
  },
  amountIn: {
    color: DARK_GREEN,
  },
});
export default MotionView;
