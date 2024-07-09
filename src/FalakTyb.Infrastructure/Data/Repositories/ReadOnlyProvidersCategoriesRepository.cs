using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using JHipsterNet.Core.Pagination;
using JHipsterNet.Core.Pagination.Extensions;
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using awqaf.Infrastructure.Data.Extensions;
using System.Collections.Generic;
namespace awqaf.Infrastructure.Data.Repositories
{
    public class ReadOnlyProvidersCategoriesRepository : ReadOnlyGenericRepository<ProvidersCategories, long>, IReadOnlyProvidersCategoriesRepository
    {
        public ReadOnlyProvidersCategoriesRepository(IUnitOfWork context) : base(context)
        {
        }

   public  async Task<IEnumerable<ProvidersCategories>> GetAllwithCount()
   {


    //return all  ProvidersCategories 
    var allProvidersCategories = await _context.Set<ProvidersCategories>().ToListAsync();


return  allProvidersCategories;

   }

    }
}
