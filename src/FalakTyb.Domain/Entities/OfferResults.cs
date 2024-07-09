using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace awqaf.Domain
{


    public class OfferResults
    {



        public string offers { get; set; }

        public IEnumerable<Offers> offersList { get; set; }



    }
}
