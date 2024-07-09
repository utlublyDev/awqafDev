using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace awqaf.Domain
{


    public class ContractRespose
    {
        public ContractRespose(long contractId,long ProvidersId)
        {
            this.contractId = contractId;
          
            this.ProvidersId = ProvidersId;
        }
        public long contractId { get; set; }
          public long? ProvidersId { get; set; }
      
    }
}
