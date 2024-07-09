
using System.Collections.Generic;
using System.Threading.Tasks;

namespace awqaf.Domain.Repositories.Interfaces
{

    public interface IReadOnlyFrequentlyAskedQuestionsRepository : IReadOnlyGenericRepository<FrequentlyAskedQuestions, long>
    {
               public Task<IEnumerable<FrequentlyAskedQuestions>> SearchFaqByWords(string words);

        
    }

}
