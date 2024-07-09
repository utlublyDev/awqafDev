using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using System.Collections.Generic;


namespace awqaf.Infrastructure.Data.Repositories
{
    public class ReadOnlyOffersCategoriesRepository : ReadOnlyGenericRepository<OffersCategories, long>, IReadOnlyOffersCategoriesRepository
    {

       public async Task<IEnumerable<OffersCategories>> GetAllOffersCategoriesByOfferProviderId (long providerId)
        {
        return await _dbSet.Where(offersCategories => offersCategories.OfferProviderId == providerId).ToListAsync();

           
        }



        public ReadOnlyOffersCategoriesRepository(IUnitOfWork context) : base(context)
        {

        }
    }
}
