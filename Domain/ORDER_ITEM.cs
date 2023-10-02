using System;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class ORDERITEM
    {
        [Key]
        public int ORDER_LINE_ID { get; set; }
        public Guid ORDER_ID { get; set; }
        public int  TICKET { get; set; }     
        public Decimal UNIT_PRICE { get; set; }
      
    }
}