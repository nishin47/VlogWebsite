using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    
    public class Error
    {

        public int Id { get; set; }
        public string Values { get; set; }
        public DateTimeOffset Created { get; set; }
        // Additional properties as needed
    }
    
}
