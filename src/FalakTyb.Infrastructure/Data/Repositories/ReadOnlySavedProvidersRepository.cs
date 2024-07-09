using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using JHipsterNet.Core.Pagination;
using JHipsterNet.Core.Pagination.Extensions;
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using awqaf.Infrastructure.Data.Extensions;

namespace awqaf.Infrastructure.Data.Repositories
{
    public class ReadOnlySavedProvidersRepository : ReadOnlyGenericRepository<SavedProviders, long>, IReadOnlySavedProvidersRepository
    {
        public ReadOnlySavedProvidersRepository(IUnitOfWork context) : base(context)
        {
        }
    }
}
