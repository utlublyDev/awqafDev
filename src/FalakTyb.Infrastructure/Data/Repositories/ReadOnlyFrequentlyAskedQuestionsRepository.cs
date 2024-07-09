using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using JHipsterNet.Core.Pagination;
using JHipsterNet.Core.Pagination.Extensions;
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using awqaf.Infrastructure.Data.Extensions;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace awqaf.Infrastructure.Data.Repositories
{
    public class ReadOnlyFrequentlyAskedQuestionsRepository : ReadOnlyGenericRepository<FrequentlyAskedQuestions, long>, IReadOnlyFrequentlyAskedQuestionsRepository
    {
        //return all Faq with the keyword given
         public async Task<IEnumerable<FrequentlyAskedQuestions>> SearchFaqByWords(string words)
        {

             if (Regex.IsMatch(words, "^[\u0621-\u064A0-9]|[\u0621-\u064A\u0660-\u0669]+$") == false)// here to check if the words is arabic or english 
            {

            return await _dbSet.Where(faq => faq.QuestionInEnglish.StartsWith(words)==true ||faq.QuestionInEnglish.Contains(words)).ToListAsync();


            }
            else if (Regex.IsMatch(words, "^[\u0621-\u064A0-9]|[\u0621-\u064A\u0660-\u0669]+$") == true)

            {

            return await _dbSet.Where(faq => faq.QuestionInArabic.StartsWith(words)==true ||  faq.QuestionInArabic.Contains(words) ).ToListAsync();



            }

            return null;
        }

        public ReadOnlyFrequentlyAskedQuestionsRepository(IUnitOfWork context) : base(context)
        {
        }
    }
}
