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
    public class ReadOnlyContractRepository : ReadOnlyGenericRepository<Contract, long>, IReadOnlyContractRepository
    {
        public ReadOnlyContractRepository(IUnitOfWork context) : base(context)
        {
        }
    }
}
