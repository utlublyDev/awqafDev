using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;
using System;
using System.Collections.Generic;
namespace awqaf.Application.Queries

{
    public class searchProvidersNearbyAndWordsQueryHandler : IRequestHandler<searchProvidersNearbyAndWordsQuery, List<Providers>>
    {
        
        private IReadOnlyProvidersRepository _providersRepository;

        public searchProvidersNearbyAndWordsQueryHandler(
            IReadOnlyProvidersRepository providersRepository)
        {
            _providersRepository = providersRepository;
        }

        public async Task<List<Providers>> Handle(searchProvidersNearbyAndWordsQuery request, CancellationToken cancellationToken)
        {

   string words =request.Words;
            string[] chars = new string[] {
"21%",
"22%",
"23%",
"24%",
"25%",
"26%",
"27%",
"28%",
"29%",
"%2A",
"%2B",
"%2C",
"%2D",
"%2E",
"%2F",
"30%",
"31%",
"32%",
"33%",
"34%",
"35%",
"36%",
"37%",
"38%",
"39%",
"%3A",
"%3B",
"%3C",
"%3D",
"%3E",
"%3F",
"40%",",", ".", "/", "!", "@", "#", "$", "%", "^", "&", "*", "'", "\"", ";", "_", "(", ")", ":", "|","+","-","=", "[", "]"};
            for (int i = 0; i < chars.Length; i++)
            {
                if (request.Words.Contains(chars[i]))
                {
                     //remove spical char
                                        
            
      
           
                    words = request.Words.Replace(chars[i], "");
                   
                  
                }
                else if(request.Words.Length()==words.Length())
                {
                   words = request.Words;
                }
            }


            
            var list = await _providersRepository.SearchProviderByWords(words , request.CategoryId);



//loop through the providers and calculate the distance

var nearProvider = new List<Providers>();
//loop through all providers
            foreach (var provider in list)
            {
                 var Distance = Calculate(request.Latitude, request.Longitude, Convert.ToDouble(provider.Latitude), Convert.ToDouble(provider.Longitude));

//check if the distance is less than the radius
                if (Distance <= request.Radius)
                {
                 nearProvider.Add(provider);
                }

            }

    
            return nearProvider;
// return the list near providers

        
        }

//calculate the distance between two points
 public static double Calculate(double lat1, double lon1, double lat2, double lon2)
    {
        double rad(double angle) => angle * 0.017453292519943295769236907684886127d; // = angle * Math.Pi / 180.0d
        double havf(double diff) => Math.Pow(Math.Sin(rad(diff) / 2d), 2); // = sin²(diff / 2)
        return 12745.6 * Math.Asin(Math.Sqrt(havf(lat2 - lat1) + Math.Cos(rad(lat1)) * Math.Cos(rad(lat2)) * havf(lon2 - lon1))); // earth radius 6.372,8‬km x 2 = 12745.6
    }




    }
}
