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
    public class ProvidersRepository : GenericRepository<Providers, long>, IProvidersRepository
    {
        public ProvidersRepository(IUnitOfWork context) : base(context)
        {
        }

        public override async Task<Providers> CreateOrUpdateAsync(Providers providers)
        {
            List<Type> entitiesToBeUpdated = new List<Type>();
            return await base.CreateOrUpdateAsync(providers, entitiesToBeUpdated);
        }
    }
}
