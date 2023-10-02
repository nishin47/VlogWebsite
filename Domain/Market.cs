using System;

namespace Domain
{
    public class Market
    {
        public Guid Id { get; set; }
        public string MarketName { get; set; }
        public string ImageId { get; set; }
        public string Currency { get; set; }
        public string CurrencyImage { get; set; }
        public string Symbol { get; set; }

    }
}