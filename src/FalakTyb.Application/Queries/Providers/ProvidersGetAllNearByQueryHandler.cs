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
    public class ProvidersGetAllNearByQueryHandler : IRequestHandler<ProvidersGetAllNearByQuery, List<Providers>>
    {
        
        private IReadOnlyProvidersRepository _providersRepository;

        public ProvidersGetAllNearByQueryHandler(
            IReadOnlyProvidersRepository providersRepository)
        {
            _providersRepository = providersRepository;
        }

        public async Task<List<Providers>> Handle(ProvidersGetAllNearByQuery request, CancellationToken cancellationToken)
        {
            var page = await _providersRepository.QueryHelper().Filter(x => x.ProvidersCategoriesId == request.CategoryId).GetPageAsync(request.Page);
//loop through the providers and calculate the distance

var nearProvider = new List<Providers>();
//loop through all providers
            foreach (var provider in page.Content)
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
