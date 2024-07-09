
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;
using System.Collections.Generic;
namespace awqaf.Application.Queries
{
    public class ProvidersCategoriesGetAllwithCountQueryHandler : IRequestHandler<ProvidersCategoriesGetAllwithCountQuery, IEnumerable<ProvidersCategoriesWithCountResponse>>
    {
        private IReadOnlyProvidersCategoriesRepository _providersCategoriesRepository;
        private IReadOnlyProvidersRepository _providersRepository;
        public ProvidersCategoriesGetAllwithCountQueryHandler(
            IReadOnlyProvidersCategoriesRepository providersCategoriesRepository, IReadOnlyProvidersRepository providersRepository)
        {
            _providersCategoriesRepository = providersCategoriesRepository;
            _providersRepository = providersRepository;
        }

        public async Task<IEnumerable<ProvidersCategoriesWithCountResponse>> Handle(ProvidersCategoriesGetAllwithCountQuery request, CancellationToken cancellationToken)
        {

            var all = await _providersCategoriesRepository.GetAllwithCount();
            // create new List ProvidersCategoriesWithCountResponse object 
            List<ProvidersCategoriesWithCountResponse> providersCategoriesWithCountResponseList = new List<ProvidersCategoriesWithCountResponse>();

            // loop all provider categories and find the provder that belong to the category
            foreach (var item in all)
            {

if(item.Status==true){
                var page = await _providersRepository.QueryHelper().Filter(x =>(x.ProvidersCategoriesId == item.Id) &&(x.IsActive==true)).GetPageAsync(request.Page);
                //count the number of providers in the category
                var Count = page.TotalElements;
                ProvidersCategoriesWithCountResponse providersCategoriesWithCountResponseItem = new ProvidersCategoriesWithCountResponse(Count, item);
                providersCategoriesWithCountResponseList.Add(providersCategoriesWithCountResponseItem);

}

            }





            return providersCategoriesWithCountResponseList;


        }
    }
}
