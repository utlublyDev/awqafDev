
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
    public class SearchProviderHoldingCompanyByWordsQueryHandler : IRequestHandler<SearchProviderHoldingCompanyByWordsQuery, IEnumerable<HoldingCompanyInfo>>
    {
        private IReadOnlyProvidersRepository _providersRepository;

        public SearchProviderHoldingCompanyByWordsQueryHandler(
            IReadOnlyProvidersRepository providersRepository)
        {
            _providersRepository = providersRepository;
        }

        public async Task<IEnumerable<HoldingCompanyInfo>> Handle(SearchProviderHoldingCompanyByWordsQuery request, CancellationToken cancellationToken)
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

            
            var list = await _providersRepository.SearchProviderByWords(words);

            var holdingCompanyInfos = new List<HoldingCompanyInfo>();


            if (list != null)
            {
                foreach (var provider in list)
                {

                    if (provider.ItWillHaveSubProviders == false)
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
            }







            return holdingCompanyInfos;
        }
    }
}
