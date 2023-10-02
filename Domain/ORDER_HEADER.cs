using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class ORDERHEADER
    {
        [Key]
        public Guid ORDER_ID { get; set; }
        public Guid KUNNR { get; set; }
        public string STATUS { get; set; }
        public DateTime ORDER_DATE { get; set; }
        public int QUANTITY { get; set; }
        public string COUNTRY { get; set; }
        public string CURRENCY { get; set; }
        public Decimal AMOUNT { get; set; }
        public DateTime MODIFIED_DATE { get; set; }

        public List<ORDERITEM> OrderItems {get; set;}
    }
}