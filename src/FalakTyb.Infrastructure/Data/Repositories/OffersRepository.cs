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
    public class OffersRepository : GenericRepository<Offers, long>, IOffersRepository
    {
        public OffersRepository(IUnitOfWork context) : base(context)
        {
        }

        public override async Task<Offers> CreateOrUpdateAsync(Offers offers)
        {
            List<Type> entitiesToBeUpdated = new List<Type>();
            return await base.CreateOrUpdateAsync(offers, entitiesToBeUpdated);
        }
    }
}
