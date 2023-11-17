// テストデータ
const test_data = [
  { name: "ノートPC", weight: 3, price: 2000 },
  { name: "ギター", weight: 1, price: 1500 },
  { name: "ステレオ", weight: 4, price: 3000 },
//  { name: "iPhone", weight: 1, price: 2000 },
//  { name: "MP3プレイヤー", weight: 1, price: 1000 },
];
type DATA_TYPE = typeof test_data;

// 重さに制限をした場合
function knapsack_limit_weight(data: DATA_TYPE, limitWeight: number) {
  // テーブルを作るための情報
  const keySize = Object.keys(data[0]).length;
  const dataSize = data.length;
  // DP用のテーブル
  // 0行目は何も選択しなかった場合のデータにする
  const dp = Array(dataSize+1).fill(0).map(() => Array(limitWeight+1).fill(0))
  const dpItem = Array(dataSize + 1).fill('').map(() => Array(limitWeight + 1).fill(''))
  /*
    この表を埋めたい
            重さ
            1  2  3  4
    ギター             
    ステレオ            
    ノートPC           
  */
  for (let row = 1; row <= dataSize; row++) {
    for (let col = 1; col <= limitWeight; col++) {
      // インデックス
      const [dpRow, dpCol] = [row, col];
      const [dataRow, dataCol] = [row - 1, col - 1];

      // このループで対象にするアイテム
      const currentItem = data[dataRow];
      const { name, weight, price } = currentItem;
      const targetWeight = dpCol;

      // 対象のアイテムの重さが現在対象としている重さ(col)の袋に入るならpriceを設定
      // 入らない場合は、1つ前の行のpriceを設定
      if (weight <= targetWeight) {

          // 以下のどちらかの大きい方を採用したい
          // - 前の（行）の最大値
          // - 現在のprice + まだ入る重さのアイテムのprice
          if (dp[dpRow-1][dpCol] > price + dp[dpRow][dpCol - weight]) {
            // - 前の（行）の最大値
            dp[dpRow][dpCol] = dp[dpRow-1][dpCol];
            dpItem[dpRow][dpCol] = dpItem[dpRow-1][dpCol];
          } else {
          // - 現在のprice + まだ入る重さのアイテムのprice
            dp[dpRow][dpCol] =  price + dp[dpRow-1][dpCol-weight];
            dpItem[dpRow][dpCol] = name + ' ' + dpItem[dpRow - 1][dpCol-weight];
          }

      } else {
        dp[dpRow][dpCol] = dp[dpRow - 1][dpCol];
          dpItem[dpRow][dpCol] = dpItem[dpRow - 1][dpCol];
      }
    }
  }
    console.log(dp)
  console.log(dpItem);
}


// メイン
function main() {
  knapsack_limit_weight(test_data, 4);
}
main();