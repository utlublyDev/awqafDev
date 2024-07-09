using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System;
namespace awqaf.Infrastructure.Data.Repositories
{
    public class ReadOnlyOffersRepository : ReadOnlyGenericRepository<Offers, long>, IReadOnlyOffersRepository
    {
        public ReadOnlyOffersRepository(IUnitOfWork context) : base(context)
        {


        }
        //get all offers by provider id

        public async Task<IEnumerable<Offers>> getAllOffersByProviderId(string ProviderId)
        {

            return await _dbSet.Where(offers => (offers.ProviderId == ProviderId)&&(offers.OfferIsValidate==true)).ToListAsync();
        }


        public async Task<IEnumerable<Offers>> getAllOffersByCategoryId(long categoryId, long providerId)
        {

            return await _dbSet.Where(offers => (offers.OffersCategoriesId == categoryId) && (Convert.ToInt64(offers.ProviderId) == providerId)&&(offers.OfferIsValidate==true)).ToListAsync();
        }



        public async Task<IEnumerable<Offers>> SearchOffersByName(string words)
        {


            if (Regex.IsMatch(words, "^[\u0621-\u064A0-9]|[\u0621-\u064A\u0660-\u0669]+$") == true)// here to check if the words is arabic or english 
            {

                return await _dbSet.Where(offers => (offers.OfferNameInArabic.StartsWith(words))||offers.OfferNameInArabic.Contains(words)&&(offers.OfferIsValidate==true)).ToListAsync();


            }
            else if (Regex.IsMatch(words, "^[\u0621-\u064A0-9]|[\u0621-\u064A\u0660-\u0669]+$") == false)

            {

                return await _dbSet.Where(offers => (offers.OfferDetailsInEnglish.StartsWith(words))||offers.OfferDetailsInEnglish.Contains(words)&&(offers.OfferIsValidate==true)).ToListAsync();



            }

            return null;





        }




        public async Task<IEnumerable<Offers>> SearchOffersRange(int minInput, int maxInput)

        {

            return await _dbSet.Where(offers =>( offers.OfferAmountPercentage) >= (minInput) &&( offers.OfferAmountPercentage <= maxInput)&&(offers.OfferIsValidate==true)).ToListAsync();
        }



    }
}
