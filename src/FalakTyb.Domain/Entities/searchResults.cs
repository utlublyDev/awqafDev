using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace awqaf.Domain
{


    public class searchResults
    {
public  searchResults(ProvidersResults providerResults, OfferResults offerResults)
{
    this.providerResults = providerResults;
    this.offerResults = offerResults;
}
        public ProvidersResults providerResults { get; set; }
        public OfferResults offerResults { get; set; }
    }
}





