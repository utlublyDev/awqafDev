using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using System.Collections.Generic;

using System.Text.RegularExpressions;
namespace awqaf.Infrastructure.Data.Repositories
{
    public class ReadOnlyProvidersRepository : ReadOnlyGenericRepository<Providers, long>, IReadOnlyProvidersRepository
    {

        //get all providers by main service id
        public async Task<IEnumerable<Providers>> GetAllByMainServiceId(long mainServiceId)
        {
            return await _dbSet.Where(providers => (providers.MainServiceProviderId == mainServiceId && providers.ItWillHaveSubProviders == false) && (providers.IsActive==true)).ToListAsync();
        }






        //get all providers by provider by holding company category id and enable it will have holding company
        public async Task<IEnumerable<Providers>> GetAllByProviderByHoldingCompany(long categoryId)
        {

            return await _dbSet.Where(providers => (providers.ProvidersCategoriesId == categoryId && providers.ProvidersCategories.ItWillHaveHoldingCompaniesb == true) && (providers.IsActive==true)).ToListAsync();
        }


        public async Task<IEnumerable<Providers>> getAllProviderVip()
        {

            return await _dbSet.Where(providers => (providers.IsVip == true) && (providers.IsActive==true)).ToListAsync();
        }


        public async Task<IEnumerable<Providers>> SearchProviderByWords(string words, long categoryId)
        {


            if (Regex.IsMatch(words, "^[\u0621-\u064A0-9]|[\u0621-\u064A\u0660-\u0669]+$") == true)// here to check if the words is arabic or english 
            {

                return await _dbSet.Where(provider => (provider.ProviderNameInArabic.StartsWith(words) || provider.AddressInArabic.StartsWith(words) || provider.KeyWordsInArabic.StartsWith(words) || provider.ProviderNameInArabic.Contains(words) || provider.AddressInArabic.Contains(words) || provider.KeyWordsInArabic.StartsWith(words)) && (provider.ProvidersCategoriesId == categoryId && provider.IsActive==true)).ToListAsync();


            }
            else if (Regex.IsMatch(words, "^[\u0621-\u064A0-9]|[\u0621-\u064A\u0660-\u0669]+$") == false)

            {

                return await _dbSet.Where(provider => (provider.ProviderNameInEnglish.StartsWith(words) || provider.Address.StartsWith(words) || provider.KeyWordsInEnglish.StartsWith(words) || provider.ProviderNameInEnglish.Contains(words) || provider.Address.Contains(words) || provider.KeyWordsInEnglish.Contains(words)) && provider.ProvidersCategoriesId == categoryId && provider.IsActive==true).ToListAsync();



            }

            return null;


        }







        public async Task<IEnumerable<Providers>> SearchProviderByWords(string words)
        {


            if (Regex.IsMatch(words, "^[\u0621-\u064A0-9]|[\u0621-\u064A\u0660-\u0669]+$") == true)// here to check if the words is arabic or english 
            {

                return await _dbSet.Where(provider => (provider.ProviderNameInArabic.StartsWith(words) || provider.AddressInArabic.StartsWith(words) || provider.KeyWordsInArabic.StartsWith(words) || provider.ProviderNameInArabic.Contains(words) || provider.AddressInArabic.Contains(words) || provider.KeyWordsInArabic.Contains(words))&& (provider.IsActive==true)).ToListAsync();


            }
            else if (Regex.IsMatch(words, "^[\u0621-\u064A0-9]|[\u0621-\u064A\u0660-\u0669]+$") == false)

            {

                return await _dbSet.Where(provider => (provider.ProviderNameInEnglish.StartsWith(words) || provider.Address.StartsWith(words) || provider.KeyWordsInEnglish.StartsWith(words) || provider.ProviderNameInEnglish.Contains(words) || provider.Address.Contains(words) || provider.KeyWordsInEnglish.Contains(words))&& (provider.IsActive==true)).ToListAsync();



            }

            return null;


        }


        public async Task<IEnumerable<Providers>> SearchProviderByMainProviderIdAndWords(string words, long MainId)

        {



            if (Regex.IsMatch(words, "^[\u0621-\u064A0-9]|[\u0621-\u064A\u0660-\u0669]+$") == true)// here to check if the words is arabic or english 
            {

                return await _dbSet.Where(provider => (provider.ProviderNameInArabic.StartsWith(words) || provider.AddressInArabic.StartsWith(words) || provider.KeyWordsInArabic.StartsWith(words) || provider.ProviderNameInArabic.Contains(words) || provider.AddressInArabic.Contains(words) || provider.KeyWordsInArabic.Contains(words)) && (provider.MainServiceProviderId.Equals(MainId))&& (provider.IsActive==true)).ToListAsync();


            }
            else if (Regex.IsMatch(words, "^[\u0621-\u064A0-9]|[\u0621-\u064A\u0660-\u0669]+$") == false)

            {

                return await _dbSet.Where(provider => (provider.ProviderNameInEnglish.StartsWith(words) || provider.Address.StartsWith(words) || provider.KeyWordsInEnglish.StartsWith(words) || provider.ProviderNameInEnglish.Contains(words) || provider.Address.Contains(words) || provider.KeyWordsInEnglish.Contains(words)) && (provider.MainServiceProviderId.Equals(MainId)&&(provider.IsActive==true))).ToListAsync();



            }

            return null;


        }







        public ReadOnlyProvidersRepository(IUnitOfWork context) : base(context)
        {
        }
    }
}
