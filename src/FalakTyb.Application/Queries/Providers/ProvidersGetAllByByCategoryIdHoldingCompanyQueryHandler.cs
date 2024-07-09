
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;
//import IEnumerable 
using System.Collections.Generic;
namespace awqaf.Application.Queries

{
    public class ProvidersGetAllByByCategoryIdHoldingCompanyQueryHandler : IRequestHandler<ProvidersGetAllByByCategoryIdHoldingCompanyQuery, IEnumerable<HoldingCompanyInfo>>
    {
        private IReadOnlyProvidersRepository _providersRepository;

        public ProvidersGetAllByByCategoryIdHoldingCompanyQueryHandler(
            IReadOnlyProvidersRepository providersRepository)
        {
            _providersRepository = providersRepository;
        }

        public async Task<IEnumerable<HoldingCompanyInfo>> Handle(ProvidersGetAllByByCategoryIdHoldingCompanyQuery request, CancellationToken cancellationToken)
        {
            //list of HoldingCompanyInfo 

            var holdingCompanyInfos = new List<HoldingCompanyInfo>();


            var list = await _providersRepository.GetAllByProviderByHoldingCompany(request.CategoryId);


            //loop list of Providers
            foreach (var provider in list)
            {

                if (provider.ItWillHaveSubProviders == false && provider.IsActive==true)
                {
                    var listMain = await _providersRepository.GetAllByMainServiceId(provider.Id);
                    // here we will find the sub provider that belong to main provider to return it 

                    var holdingCompanyInfo = new HoldingCompanyInfo();


                    holdingCompanyInfo.providerHoldingCompaniesId = provider.Id;
                    holdingCompanyInfo.providerHoldingCompaniesNameEnglish = provider.ProviderNameInEnglish;
                    holdingCompanyInfo.providerHoldingCompaniesNameArabic = provider.ProviderNameInArabic;
                    holdingCompanyInfo.providerHoldingCompaniesImageUrl = provider.ProviderImageUrl;
                    holdingCompanyInfo.countOfproviderHoldingCompanies = listMain.Length();//bug need to fix it mst for each holding call the main provider and count the number of sub providers

                    

                    holdingCompanyInfos.Add(holdingCompanyInfo);


                }



            }



            return holdingCompanyInfos;
        }
    }
}
