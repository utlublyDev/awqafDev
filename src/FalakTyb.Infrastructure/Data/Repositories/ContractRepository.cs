using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using JHipsterNet.Core.Pagination;
using JHipsterNet.Core.Pagination.Extensions;
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using awqaf.Infrastructure.Data.Extensions;

namespace awqaf.Infrastructure.Data.Repositories
{
    public class ContractRepository : GenericRepository<Contract, long>, IContractRepository
    {
        public ContractRepository(IUnitOfWork context) : base(context)
        {
        }

        public override async Task<Contract> CreateOrUpdateAsync(Contract contract)
        {
            List<Type> entitiesToBeUpdated = new List<Type>();
            return await base.CreateOrUpdateAsync(contract, entitiesToBeUpdated);
        }
    }
}
