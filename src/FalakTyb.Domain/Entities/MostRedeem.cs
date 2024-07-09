using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace awqaf.Domain
{


    public class MostRedeem
    {

public MostRedeem( string serviceProviderName, int count ,string serviceProviderImage)
{
    ServiceProviderName = serviceProviderName;
    Count = count;
    ServiceProviderImage=serviceProviderImage;
}


        public string ServiceProviderName { get; set; }
        public string ServiceProviderImage { get; set; }
        public int Count { get; set; }

      



    }
}