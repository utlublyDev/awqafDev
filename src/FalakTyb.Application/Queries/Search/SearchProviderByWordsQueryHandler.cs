
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
    public class SearchProviderByWordsQueryHandler : IRequestHandler<SearchProviderByWordsQuery, IEnumerable<Providers>>
    {
        private IReadOnlyProvidersRepository _providersRepository;

        public SearchProviderByWordsQueryHandler(
            IReadOnlyProvidersRepository providersRepository)
        {
            _providersRepository = providersRepository;
        }

        public async Task<IEnumerable<Providers>> Handle(SearchProviderByWordsQuery request, CancellationToken cancellationToken)
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
            return list;
        }
    }
}
