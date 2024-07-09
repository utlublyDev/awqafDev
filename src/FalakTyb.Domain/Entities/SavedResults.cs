using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace awqaf.Domain
{


    public class SavedResults
    {
public  SavedResults(List<Providers> savedProviders, List<Offers> savedOffers)
{
    this.savedProviders = savedProviders;
    this.savedOffers = savedOffers;
}
        public List<Providers>  savedProviders { get; set; }
        public  List<Offers>  savedOffers { get; set; }
    }
}

