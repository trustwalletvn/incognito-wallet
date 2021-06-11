class Bep20Token {
  constructor(data = {}) {
    this.symbol = data.Symbol;
    this.name = data.Name;
    this.address = data.Address;
    this.decimals = data.Decimals;
  }
}

export default Bep20Token;