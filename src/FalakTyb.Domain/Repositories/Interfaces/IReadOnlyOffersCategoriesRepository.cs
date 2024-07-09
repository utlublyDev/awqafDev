using System.Collections.Generic;
using System.Threading.Tasks;
namespace awqaf.Domain.Repositories.Interfaces
{




    public interface IReadOnlyOffersCategoriesRepository : IReadOnlyGenericRepository<OffersCategories, long>
    {



            
            //get all offers categories by offer provider id
            Task<IEnumerable<OffersCategories>> GetAllOffersCategoriesByOfferProviderId(long offerProviderId);
    }

}
