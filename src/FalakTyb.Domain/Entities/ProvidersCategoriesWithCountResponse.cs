using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace awqaf.Domain
{


    public class ProvidersCategoriesWithCountResponse
    {
        public ProvidersCategoriesWithCountResponse(int count, ProvidersCategories providersCategories)
        {
            this.count = count;
            this.providersCategories = providersCategories;
         
        }
     
        public int count { get; set; }
        public ProvidersCategories providersCategories { get; set; }
    }
}