import axios from 'axios';
import Users from '../08_mock_api';

// 外部モジュール全体をモック化する場合、jest.mock()を使う。
// モジュール内の各関数にはjest.fn()が設定されるので
// mockImplementationOnceやmockResolvedValueを使うことができる。
jest.mock('axios');

test('should fetch users', async () => {
  const users = [{ name: 'Bob' }];
  const res = { data: users };
  // axios.getの返り値を上書き
  axios.get.mockResolvedValue(res);
  // 次のコードでも同じ処理が可能
  // axios.get.mockImplementation(() => Promise.resolve(res))

  await expect(Users.all()).resolves.toEqual(users);
});

describe('#reset mocks with spyOn', () => {
  const mockDate = new Date('2022-07-30');
  const originalDate = new Date('2022-07-25');
  let spy = null;

  beforeEach(() => {
    spy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
  });

  afterEach(() => {
    spy.mockRestore();
  });

  // mockをのプロパティがリセットされるテスト
  it('jest.clearAllMocks', () => {
    // Dateの引数に他の日を与えても、mockDateが返る
    expect(new Date('2022-09-01')).toEqual(mockDate);
    expect(spy.mock.calls).toEqual([['2022-09-01']]);
    expect(spy.mock.instances).toEqual([{}]);
    expect(spy.mock.results).toEqual([{ type: 'return', value: mockDate }]);

    jest.clearAllMocks();
    // mockプロパティがリセットされた状態を確認
    expect(spy.mock.calls).toEqual([]);
    expect(spy.mock.instances).toEqual([]);
    expect(spy.mock.results).toEqual([]);

    // mock関数は引き続き利用できる
    expect(new Date('2022-07-30')).toEqual(mockDate);
  });

  // resetAllMocksではmock関数もリセットされる
  it('jest resetAllMocks', () => {
    expect(new Date('2022-07-30')).toEqual(mockDate);
    expect(spy.mock.calls).toEqual([['2022-07-30']]);

    jest.resetAllMocks();
    // mockプロパティがリセットされた状態を確認
    expect(spy.mock.calls).toEqual([]);
    expect(spy.mock.instances).toEqual([]);
    expect(spy.mock.results).toEqual([]);

    // mock関数はリセットされ、デフォルトでは`{}`が返される
    expect(new Date('2022-07-30')).toEqual({});
  });

  it('jest.restoreAllMocks', () => {
    expect(new Date('2022-07-30')).toEqual(mockDate);
    expect(spy.mock.calls).toEqual([['2022-07-30']]);
    expect(spy.mock.instances).toEqual([{}]);
    expect(spy.mock.results).toEqual([{ type: 'return', value: mockDate }]);

    jest.restoreAllMocks();
    // mockのプロパティはリセットされない
    expect(spy.mock.calls).toEqual([['2022-07-30']]);
    expect(spy.mock.instances).toEqual([{}]);
    expect(spy.mock.results).toEqual([{ type: 'return', value: mockDate }]);

    // mock関数がリセットされ、オリジナルのDate関数が実⾏される
    expect(new Date('2022-07-25')).toEqual(originalDate);
  });
});

describe('#reset mocks with jest.fn', () => {
  const mockDate = new Date('2021-07-31');
  const originalDate = new Date('2022-07-25');
  let spy = null;

  beforeEach(() => {
    // Date関数を上書き
    Date = jest.fn(() => mockDate);
  });

  it('jest.restoreAllMocks', () => {
    expect(new Date('2022-07-31')).toEqual(mockDate);
    expect(Date.mock.calls).toEqual([['2022-07-31']]);
    expect(Date.mock.instances).toEqual([{}]);
    expect(Date.mock.results).toEqual([{ type: 'return', value: mockDate }]);

    jest.restoreAllMocks();
    // mockのプロパティはリセットされない
    expect(Date.mock.calls).toEqual([['2022-07-31']]);
    expect(Date.mock.instances).toEqual([{}]);
    expect(Date.mock.results).toEqual([{ type: 'return', value: mockDate }]);

    // spyOnの場合と異なり、jest.fnで関数にモック関数を上書きした場合は、
    // restoreAllMocksを利⽤してもオリジナルの関数へは元に戻らない
    expect(new Date('2022-07-31')).not.toEqual(originalDate);
    expect(new Date('2022-07-31')).toEqual(mockDate);
  });
});
