
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;
//import IEnumerable 
using System.Collections.Generic;
namespace awqaf.Application.Queries
{
    public class SearchByWordsQueryHandler : IRequestHandler<SearchByWordsQuery, searchResults>
    {
        private IReadOnlyProvidersRepository _providersRepository;
        private IReadOnlyOffersRepository _offersRepository;

        public SearchByWordsQueryHandler(
            IReadOnlyProvidersRepository providersRepository, IReadOnlyOffersRepository offersRepository)
        {
            _providersRepository = providersRepository;
            _offersRepository = offersRepository;
        }

        public async Task<searchResults> Handle(SearchByWordsQuery request, CancellationToken cancellationToken)
        {


            //remove all spcail characters from the search string
            
            
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
                    Console.WriteLine(words);
                  
                }
                else if(request.Words.Length()==words.Length())
                {
                   words = request.Words;
                }
            }



 
                var listProviders = _providersRepository.SearchProviderByWords(words);
                ProvidersResults providerResults = new ProvidersResults();
                OfferResults offerResults = new OfferResults();
                providerResults.providerList = await listProviders;
                var listOffers = _offersRepository.SearchOffersByName(words);
                offerResults.offersList = await listOffers;
                await Task.WhenAll(listProviders, listOffers);

                searchResults search = new searchResults(providerResults, offerResults);
                return search;
          






        }
    }
}
