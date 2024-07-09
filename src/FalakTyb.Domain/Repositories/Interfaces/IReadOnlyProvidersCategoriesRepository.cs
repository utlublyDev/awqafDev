using System.Collections.Generic;
using System.Threading.Tasks;
namespace awqaf.Domain.Repositories.Interfaces
{

    public interface IReadOnlyProvidersCategoriesRepository : IReadOnlyGenericRepository<ProvidersCategories, long>
    {
        
        public Task<IEnumerable<ProvidersCategories>> GetAllwithCount();


    }


}
