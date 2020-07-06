/* 
*   Config this to trigger displayResponse() onOpen (page open, page reload)
*   from your account
*/

// binance coin/token list by ticker
var binanceCoins = [
  "BTC", "BUSD", "ETH", "USDC", "BNB", "EOS", "BCH", "XRP", "ADA", "ZIL", "LTC", "MATIC", "VET", "LINK", "ERD", "DOGE", "TUSD", "ETC", "XTZ", "TRX", 
  "KNC", "PAX", "ZEC", "XMR", "BAT", "RVN", "SC", "BTCUP", "XVG", "XLM", "IOST", "BTCDOWN", "MBL", "TNB", "TFUEL", "NEO", "USDT", "ANKR", "ONT", "DASH", 
  "OGN", "ZRX", "LEND", "FET", "REP", "ALGO", "QTUM", "ATOM", "CHZ", "PHB", "GNT", "OMG", "POE", "ENJ", "CELR", "IOTA", "STMX", "DREP", "TROY", "HBAR", 
  "THETA", "COTI", "WRX", "REN", "IOTX", "MCO", "MDA", "HIVE", "KAVA", "KMD", "BNT", "ONE", "TNT", "ICX", "BTT", "WAVES", "XEM", "COS", "BAND", "FTM", "CTSI", 
  "PERL", "SOL", "NANO", "BRD", "MANA", "BEAM", "LRC", "CHR", "LTO", "DATA", "WABI", "SNT", "NAS", "MTH", "XZC", "FUEL", "AION", "RDN", "MDT", "QKC", "TOMO", 
  "POLY", "LUN", "STORJ", "STX", "ELF", "ARPA", "GRS", "LOOM", "LSK", "WTC", "NKN", "GAS", "FUN", "ARK", "RLC", "WIN", "CVC", "STRAT", "CMT", "ZEN", "BLZ", 
  "WAN", "EVX", "DOCK", "BTG", "DUSK", "MTL", "AST", "STEEM", "GO", "POWR", "NULS", "SNGLS", "ARN", "ARDR", "BTS", "HOT", "HC", "VITE", "OAX", "BQX", "VIB", 
  "ADX", "ENG", "BCD", "SKY", "AE", "NAV", "AGI", "GXS", "REQ", "NPXS", "ONG", "TCT", "QSP", "COCOS", "MITH", "OST", "DCR", "USDS", "CTXC", "DLT", "AMB", "PPT",
  "PIVX", "APPC", "MFT", "DENT", "VIBE", "BCPT", "GTO" ,"STPT", "VIA", "CND", "GVT", "QLC", "SYS", "CDT", "IQ", "RCN", "DNT", "YOYO", "POA", "SNM", "WPR", "KEY",
  "NXS", "NCASH", "NEBL", "EDO", "BGBP", "FTT"
];

// create a get request to coincap's API and returns the response
function coinCapFetch() {
  var request = UrlFetchApp.fetch("https://api.coincap.io/v2/assets?limit=2000");
  var response = request.getContentText();
  var data = JSON.parse(response);
  return data.data;
}

// Process the API data and diplaying to specified cells and rows 
function displayResponse() {

  // reference spreadsheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();

  // call the API and store in a variable
  var fetchResult = coinCapFetch();

  // empty array that will get populated after processing the data
  var output = [];
  
  // get only the binace listed coins/token from the coincap's API response 
  fetchResult.forEach(function(item) {
    if(binanceCoins.includes(item.symbol)) {
      output.push([
        item.name, 
        item.symbol, 
        item.priceUsd, 
        item.marketCapUsd, 
        item.supply ? item.supply : "No data available", 
        item.maxSupply ? item.maxSupply : "No data available"
      ]);
    }
  });
 
 // sort the data by the lowest marketcap first
  var sortedOutput = output.sort(function(a, b) {
    return a[3] - b[3];  
  })
  
  // cleanup: clearing out the cells and rows first to make way for the updated data 
  sheet.getRange(2,1,output.length,6).clearContent();

  // assining the now sorted data to the sheet
  sheet.getRange(2,1,output.length,6).setValues(sortedOutput);
}
