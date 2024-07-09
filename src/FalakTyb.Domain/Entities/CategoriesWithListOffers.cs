using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace awqaf.Domain
{


    public class CategoriesWithListOffers
    {
        public CategoriesWithListOffers(string CategoriesNameEnglish,string CategoriesNameArabic, IEnumerable<Offers> offersList)
        {
            this.CategoriesNameEnglish = CategoriesNameEnglish;
            this.offersList = offersList;
            this.CategoriesNameArabic = CategoriesNameArabic;
        }
        public string CategoriesNameEnglish { get; set; }
        public string CategoriesNameArabic { get; set; }
        public IEnumerable<Offers> offersList { get; set; }
    }
}
